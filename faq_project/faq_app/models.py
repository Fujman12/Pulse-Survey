from datetime import datetime
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from .managers import GroupManager
# Create your models here.


class Topic(models.Model):
    name = models.CharField("Topic name", max_length = 150)
    datetime = models.DateTimeField('Survey\'s datetime', default = datetime.now())
    def __str__(self):
        return self.name

class Group(models.Model):
    ACTIVE = 1
    INACTIVE = 0
    STATUS_CHOICES = (
        (ACTIVE,    _('Active')),
        (INACTIVE,  _('Inactive')),
    )

    name = models.CharField("Group name", max_length = 150, blank =  True, null = True)
    topic = models.ForeignKey(Topic, verbose_name = "Topic", related_name = 'groups')
    status = models.IntegerField(choices = STATUS_CHOICES, default = ACTIVE)

    objects = GroupManager()

    def has_button(self):
        has_button = False
        for answer in self.answers.all():
            if answer.kind == str(Answer.BUTTON):
                has_button = True

        return has_button

    def btn(self):
        btn = self.answers.filter(kind='4').first()

        return btn

    def __str__(self):
        return self.name

    def is_active(self):
        return self.status == Group.ACTIVE

#Remove this later
class Question(models.Model):
    text = models.CharField("Question text", max_length = 150)
    group = models.ForeignKey(Group, verbose_name = "Group", related_name = 'questions')

    def __str__(self):
        #q_str = "{} {}".format(str(self.group), str(self.text))

        return str(self.text)


class Answer(models.Model):
    TEXT = 0
    IMG = 1
    VIDEO = 2
    MAP = 3
    BUTTON = 4

    KIND_CHOICES = (
        (TEXT,  _('Text')),
        (IMG, _('Image')),
        (VIDEO, _('Videos')),
        (MAP, _('Map')),

    )

    text = models.CharField("Answer text", max_length = 150)
    group = models.ForeignKey(Group, verbose_name = "Group", related_name = 'answers')
    kind = models.CharField(max_length = 1, default = TEXT)

    ###  only for pictures
    image_name = models.CharField('Image name', max_length = 150, blank = True, null = True)

    def __str__(self):
        #a_str = "{} {}".format(str(self.group), str(self.text))
        return str(self.text)

class Button(models.Model):
    text = models.CharField("Button text", max_length = 150)
    answer = models.ForeignKey(Answer, verbose_name = "Answer", related_name = 'buttons')
