from django.db import models
from django.utils import timezone
from users.models import NewUser
from django.urls import reverse
from django.utils.translation import gettext_lazy as _


def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)


class Categories(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class DemoPost(models.Model):
    title = models.CharField(max_length=250)
    excerpt = models.TextField(null=True)
    content = models.TextField()
    slug = models.SlugField(
        max_length=250, unique_for_date='date_posted')
    date_posted = models.DateTimeField(default=timezone.now)
    review_positive = models.FloatField(default=0.0)
    author = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    image = models.ImageField(
        _("Image"), upload_to=upload_to, default='posts/default.jpg')
    categories = models.ManyToManyField(Categories)

    def __str__(self):
        return self.title
