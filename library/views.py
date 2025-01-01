from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Borrower
from .serializers import BookSerializer, BorrowerSerializer
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.db import transaction

# APIView to update book details by ID
class BookUpdate(APIView):
    def get(self, request, id):
        try:
            book = Book.objects.get(id=id)  # Fetch book by ID
            serializer = BookSerializer(book)  # Serialize book data
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            book = Book.objects.get(id=id)  # Fetch book by ID
            serializer = BookSerializer(book, data=request.data, partial=True)  # Update book data
            if serializer.is_valid():
                serializer.save()  # Save updated book
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

# APIView to update borrower details by ID
class BorrowerUpdate(APIView):
    def get(self, request, id):
        try:
            borrower = Borrower.objects.get(id=id)  # Fetch borrower by ID
            serializer = BorrowerSerializer(borrower)  # Serialize borrower data
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Borrower.DoesNotExist:
            return Response({"error": "Borrower not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            borrower = Borrower.objects.get(id=id)  # Fetch borrower by ID
            serializer = BorrowerSerializer(borrower, data=request.data, partial=True)  # Update borrower data
            if serializer.is_valid():
                serializer.save()  # Save updated borrower
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Borrower.DoesNotExist:
            return Response({"error": "Borrower not found"}, status=status.HTTP_404_NOT_FOUND)

# ViewSet for CRUD operations on Book
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()  # Fetch all books
    serializer_class = BookSerializer

    @action(detail=False, methods=['get'])
    def retrieve_by_name(self, request, name=None):
        try:
            book = Book.objects.get(title__iexact=name.strip())  # Find book by case-insensitive name
            serializer = self.get_serializer(book)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)

# ViewSet for CRUD operations on Borrower
class BorrowerViewSet(viewsets.ModelViewSet):
    queryset = Borrower.objects.all()  # Fetch all borrowers
    serializer_class = BorrowerSerializer

    def create(self, request, *args, **kwargs):
        borrowed_books = request.data.get('borrowed_books', [])  # List of borrowed book titles
        books = []
        for title in borrowed_books:
            try:
                book = Book.objects.get(title=title)  # Fetch book by title
                if book.availability_status:  # Check book availability
                    books.append(book)
                else:
                    return Response({'error': f'{title} is not available'}, status=status.HTTP_400_BAD_REQUEST)
            except Book.DoesNotExist:
                return Response({'error': f'Book with title {title} does not exist'}, status=status.HTTP_404_NOT_FOUND)

        borrower_data = {  # Create borrower data
            'name': request.data.get('name'),
            'email': request.data.get('email')
        }
        borrower = Borrower.objects.create(**borrower_data)  # Save borrower
        borrower.borrowed_books.set(books)  # Associate books with borrower
        borrower.save()
        return Response(BorrowerSerializer(borrower).data, status=status.HTTP_201_CREATED)

# APIView for borrowing and returning books
class BorrowReturnBookView(APIView):
    def post(self, request, *args, **kwargs):
        borrower_id = request.data.get('borrower_id')  # Get borrower ID from request
        book_id = request.data.get('book_id')  # Get book ID from request
        action_type = request.data.get('action_type')  # Determine action (borrow/return)

        try:
            borrower = Borrower.objects.get(id=borrower_id)  # Fetch borrower
            book = Book.objects.get(id=book_id)  # Fetch book
        except Borrower.DoesNotExist:
            return Response({'error': 'Borrower not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found.'}, status=status.HTTP_404_NOT_FOUND)

        if action_type == 'borrow':
            if not book.availability_status:  # Check if book is available
                return Response({'error': 'Book is not available for borrowing.'}, status=status.HTTP_400_BAD_REQUEST)
            with transaction.atomic():  # Atomic transaction for consistency
                borrower.borrowed_books.add(book)  # Add book to borrower's list
                book.availability_status = False  # Mark book as unavailable
                book.save()
            return Response({'message': f'Book "{book.title}" borrowed successfully.'}, status=status.HTTP_200_OK)

        elif action_type == 'return':
            if book not in borrower.borrowed_books.all():  # Check if book was borrowed by the borrower
                return Response({'error': 'This book was not borrowed by the borrower.'}, status=status.HTTP_400_BAD_REQUEST)
            with transaction.atomic():
                borrower.borrowed_books.remove(book)  # Remove book from borrower's list
                book.availability_status = True  # Mark book as available
                book.save()
            return Response({'message': f'Book "{book.title}" returned successfully.'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid action type.'}, status=status.HTTP_400_BAD_REQUEST)
