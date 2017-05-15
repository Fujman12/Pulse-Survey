from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string
from django.http import JsonResponse
from django.core.urlresolvers import reverse

from .models import Topic, Group, Question, Answer
from .forms import TopicForm, AnswerForm
# Create your views here.
def index(request):

    return redirect('topic', pk=1)

def topic(request,pk):
    topic = Topic.objects.filter(pk = pk).first()
    if topic == None:
        topic = Topic(name = "Initial")

    topics = Topic.objects.all()
    groups = topic.groups.all()

    context = dict()
    context['groups'] = groups
    context['topics'] = topics
    context['current_topic'] = topic

    return render(request, 'faq_app/index.html', context)


def create_topic(request):
    data = dict()

    if request.method == "POST":
        form = TopicForm(request.POST)
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True

            topics = Topic.objects.all()
            data['html_topics_list'] = render_to_string('faq_app/partial/topics_list_options.html', {
                'topics': topics
            })
        else:
            data['form_is_valid'] = False
    else:
        form = TopicForm()

    context = {'form': form}
    data['html_form'] = render_to_string('faq_app/partial/create_topic_form.html',
        context,
        request=request,
    )
    return JsonResponse(data)

def create_group(request, pk):
    topic = Topic.objects.filter(pk=pk).first()

    group = Group(topic = topic)
    group.save()

    return redirect('topic', pk=pk)

def delete_group(request, pk):
    group = get_object_or_404(Group, pk=pk)
    group.delete()

    return redirect('topic', pk=group.topic.pk)

def update_group(request, pk, action):
    group = get_object_or_404(Group, pk=pk)

    if action == "activate":
        group.status = Group.ACTIVE
    elif action == "deactivate":
        group.status = Group.INACTIVE
    else:
        pass

    group.save()

    return redirect('topic', pk=group.topic.pk)

def group_questions(request, pk):
    group = get_object_or_404(Group, pk=pk)

    data = dict()

    questions = group.questions.all()
    questions_list = []
    for question in questions:
        data['value'] = question.text
        data['id'] = question.pk
        questions_list.append(data.copy())

    return JsonResponse(questions_list, safe=False)

def create_question(request, pk):
    group = get_object_or_404(Group, pk=pk)
    q = Question(group=group, text = request.POST["text"])
    q.save()

    data = dict()
    data["pk"] = q.pk

    return JsonResponse(data)

def delete_question(request, pk):
    q = get_object_or_404(Question, pk=pk)

    q.delete()

    return JsonResponse({'none':'none'})

def create_answer(request,pk):
    data = dict()

    if request.method == "POST":
        form = AnswerForm(request.POST)
        if form.is_valid():
            answ = form.save(commit=False)
            group = get_object_or_404(Group, pk=pk)
            answ.group = group
            answ.save()

            answers = group.answers.all()
            data['html_answers_list'] = render_to_string('faq_app/partial/answer_list.html', {
                'answers': answers
            })

            data['group_id'] = group.pk

            data['form_is_valid'] = True

        else:
            data['form_is_valid'] = False
    else:
        form = AnswerForm()

    context = {'form': form, 'pk':pk }

    data['html_form'] = render_to_string('faq_app/partial/create_answer_form.html',
        context,
        request=request,
    )

    return JsonResponse(data)

def update_answer(request,pk):
    answer = get_object_or_404(Answer, pk=pk)

    data = dict()

    if request.method =="POST":
        form = AnswerForm(request.POST, instance=answer)
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True

            answers = answer.group.answers.all()
            data['html_answers_list'] = render_to_string('faq_app/partial/answer_list.html', {
                'answers': answers
            })

            data['group_id'] = answer.group.pk

        else:
            data['form_is_valid'] = False
    else:
        form = AnswerForm(instance=answer)

    context = {'form':form, 'pk':pk}

    data['html_form'] = render_to_string('faq_app/partial/update_answer_form.html',
        context,
        request=request,
    )

    return JsonResponse(data)

def delete_answer(request, pk):
    answer = get_object_or_404(Answer, pk=pk)
    answer.delete()

    data = dict()

    answers = answer.group.answers.all()
    data['html_answers_list'] = render_to_string('faq_app/partial/answer_list.html', {
        'answers': answers
    })
    data['group_id'] = answer.group.pk

    return JsonResponse(data)

def get_answer_string(group):
    line = ''
    for answer in group.answers.all():
        if answer.image_name == None:
            line += answer.text + " | "
        else:
            line += answer.text + " || " + answer.image_name + " | "

    line = line[:-2]

    return line

def create_json(request, pk):
    topic = get_object_or_404(Topic, pk=pk)

    data = dict()

    groups = topic.groups.active()

    for group in groups:
        answers_string = get_answer_string(group)
        for question in group.questions.all():
            data.update({question.text: answers_string})

    return JsonResponse(data)
