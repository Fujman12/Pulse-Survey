from django.db import models
from django.db.models.query import QuerySet

#class GroupQuerySet(QuerySet):
#    def active(self):
#        # Return only active groups"
#        return self.filter(status__exact = self.model.ACTIVE)

class GroupManager(models.Manager):
    use_for_related_fields = True
    #def get_query_set(self):
    #    return GroupQuerySet(self.model, using=self._db)

    def active(self):
        return super(GroupManager, self).filter(status__exact = self.model.ACTIVE)
