from django import forms
from .models import Topic, Answer, Button

class TopicForm(forms.ModelForm):
    class Meta:
        model = Topic
        fields = ('name',)

class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ('text','kind','image_name')
        widgets = {'kind':forms.HiddenInput()}

class ButtonForm(forms.ModelForm):
    class Meta:
        model = Button
        fields = ('text',)
