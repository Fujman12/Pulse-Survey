from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    url(r'^(?P<pk>[0-9]+)$', views.topic, name = 'topic'),
    url(r'create_topic', views.create_topic, name='create_topic'),

    url(r'^(?P<pk>[0-9]+)/create_group/', views.create_group, name ='create_group'),
    url(r'delete_group/(?P<pk>[0-9]+)', views.delete_group, name ='delete_group'),
    url(r'update_group/(?P<pk>[0-9]+)/(?P<action>[a-z]+)', views.update_group, name ='update_group'),
    url(r'group_questions/(?P<pk>[0-9]+)', views.group_questions, name = "group_questions"),

    url(r'create_question/(?P<pk>[0-9]+)', views.create_question, name="create_question"),
    url(r'delete_question/(?P<pk>[0-9]+)', views.delete_question, name="delete_question"),

    url(r'create_answer/(?P<pk>[0-9]+)', views.create_answer, name="create_answer"),
    url(r'update_answer/(?P<pk>[0-9]+)', views.update_answer, name="update_answer"),
    url(r'delete_answer/(?P<pk>[0-9]+)', views.delete_answer, name="delete_answer"),

    url(r'create_json/(?P<pk>[0-9]+)', views.create_json, name="create_json"),
]
