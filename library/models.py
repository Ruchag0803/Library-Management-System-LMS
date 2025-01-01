from django.db import models

# Model representing a Book
class Book(models.Model):
    title = models.CharField(max_length=255)  # Title of the book
    author = models.CharField(max_length=255)  # Author of the book
    isbn = models.CharField(max_length=13, unique=True)  # ISBN number (unique)
    publication_date = models.DateField()  # Publication date of the book
    availability_status = models.BooleanField(default=True)  # True if the book is available, False if borrowed

    def __str__(self):
        return self.title

# Model representing a Borrower
class Borrower(models.Model):
    name = models.CharField(max_length=255)  # Name of the borrower
    email = models.EmailField(unique=True)  # Email of the borrower (unique)
    borrowed_books = models.ManyToManyField(Book, blank=True)  # Many-to-many relationship to track borrowed books

    def __str__(self):
        return self.name
