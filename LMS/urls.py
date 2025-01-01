from django.urls import path, include
from rest_framework.routers import DefaultRouter
from library import views
from library.views import BookViewSet, BorrowerViewSet, BorrowReturnBookView, BookUpdate, BorrowerUpdate


router = DefaultRouter()
router.register(r'books', views.BookViewSet)
router.register(r'borrowers', views.BorrowerViewSet)

urlpatterns = [
    path('', include(router.urls)),
 
    path('', include(router.urls)), 
    path('borrow-return-book/', BorrowReturnBookView.as_view(), name='borrow-return-book'), 
    path('borrowers/<int:id>/edit/', BorrowerUpdate.as_view(), name='borrower-update'),
    path('books/<int:id>/', BookUpdate.as_view(), name='book_update_api'),
   
]


