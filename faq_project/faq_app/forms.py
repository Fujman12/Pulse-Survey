from django import forms
from .models import Topic, Answer

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ('name',)

class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ('text','kind','image_name')
        widgets = {'kind':forms.HiddenInput()}
