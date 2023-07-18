from django.db import models

# Create your models here.
from django.contrib.auth.models import User

# Définition des constantes pour les niveaux de difficulté et les catégories
EASY = 'E'
MEDIUM = 'M'
HARD = 'H'
WEB = 'category_web'
REVERSE = 'category_reversing'
STEG = 'category_steg'
PWNING = 'category_pwning'
OSINT = 'category_osint'
CRYPT = 'category_crypt'

# Liste des choix de difficulté
difficulty = [(EASY, 'easy'), (MEDIUM, 'medium'), (HARD, 'hard')]
# Liste des choix de catégorie
category = [(WEB, 'category_web'), (REVERSE, 'category_reversing'), (STEG, 'category_steg'),
            (PWNING, 'category_pwning'), (OSINT, 'category_osint'), (CRYPT, 'category_crypt')]

# Profil des utilisateurs
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Rid = models.CharField(max_length=100, default="EINC-5e5a")  # registration ID
    score = models.IntegerField(default=0)
    totlesub = models.IntegerField(default=0)
    latest_sub_time = models.CharField(default="00:00", max_length=10)
    time = models.TimeField(default="00:00")

    def __str__(self):
        return self.user.username

# Modèle pour les questions/challenges
class Questions(models.Model):
    Qid = models.IntegerField(default='0')
    Qtitle = models.CharField(max_length=70)
    Qdes = models.CharField(max_length=1000)
    Hint = models.CharField(max_length=500, default="hint is ----")
    level = models.CharField(max_length=2, choices=difficulty, default=HARD)
    Easy = models.IntegerField(default=1)
    Med = models.IntegerField(default=1)
    Hard = models.IntegerField(default=1)
    flag = models.CharField(max_length=100, default='INSEC_CTF{}')
    points = models.IntegerField(default=0)
    solved_by = models.IntegerField(default=0)
    file = models.FileField(blank=True)
    category = models.CharField(max_length=50, choices=category, default=STEG)

# Modèle pour les soumissions
class Submission(models.Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    curr_score = models.IntegerField(default=0)
    solved = models.IntegerField(default=0)
    sub_time = models.CharField(default="00:00", max_length=10)