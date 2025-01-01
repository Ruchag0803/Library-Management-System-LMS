from rest_framework import serializers
from .models import Book, Borrower

# Serializer for the Book model
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'isbn', 'publication_date', 'availability_status']

# Serializer for the Borrower model
class BorrowerSerializer(serializers.ModelSerializer):
    borrowed_books = BookSerializer(many=True)  # Nested serializer for borrowed_books

    class Meta:
        model = Borrower
        fields = ['id', 'name', 'email', 'borrowed_books']
