
from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from django.http import Http404

# Test data for orders
ORDERS_DATA = [
    {
        'id': 1,
        'client_name': 'Иван Петров',
        'phone': '+7 (999) 123-45-67',
        'email': 'ivan@example.com',
        'date': '2024-01-15',
        'time': '14:00',
        'services': ['Стрижка', 'Борода'],
        'master': 'Алексей Смирнов',
        'status': 'new',
        'comment': 'Хочу модную стрижку'
    },
    {
        'id': 2,
        'client_name': 'Михаил Сидоров',
        'phone': '+7 (999) 987-65-43',
        'email': 'mikhail@example.com',
        'date': '2024-01-16',
        'time': '16:30',
        'services': ['Стрижка', 'Укладка'],
        'master': 'Дмитрий Козлов',
        'status': 'confirmed',
        'comment': 'Подготовка к важной встрече'
    },
    {
        'id': 3,
        'client_name': 'Андрей Волков',
        'phone': '+7 (999) 555-12-34',
        'email': 'andrey@example.com',
        'date': '2024-01-17',
        'time': '12:00',
        'services': ['Борода', 'Усы'],
        'master': 'Алексей Смирнов',
        'status': 'completed',
        'comment': 'Регулярный клиент'
    }
]

def landing(request):
    """Landing page view"""
    context = {
        'page_title': 'Главная',
        'services': [
            {'name': 'Мужская стрижка', 'price': '1500', 'duration': '45 мин'},
            {'name': 'Борода', 'price': '1200', 'duration': '30 мин'},
            {'name': 'Усы', 'price': '800', 'duration': '20 мин'},
            {'name': 'Укладка', 'price': '600', 'duration': '15 мин'},
        ],
        'masters': [
            {'name': 'Алексей Смирнов', 'experience': '8 лет', 'specialty': 'Классические стрижки'},
            {'name': 'Дмитрий Козлов', 'experience': '5 лет', 'specialty': 'Современные стили'},
            {'name': 'Сергей Петров', 'experience': '12 лет', 'specialty': 'Борода и усы'},
        ]
    }
    return render(request, 'landing.html', context)

def thanks(request):
    """Thank you page view"""
    context = {
        'page_title': 'Спасибо за заявку',
    }
    return render(request, 'thanks.html', context)

def is_staff_user(user):
    """Check if user is staff"""
    return user.is_authenticated and user.is_staff

@user_passes_test(is_staff_user)
def orders_list(request):
    """Orders list view - staff only"""
    context = {
        'page_title': 'Список заявок',
        'orders': ORDERS_DATA,
    }
    return render(request, 'orders_list.html', context)

@user_passes_test(is_staff_user)
def order_detail(request, order_id):
    """Order detail view - staff only"""
    # Правильный способ поиска в списке
    order = None
    for o in ORDERS_DATA:
        if o['id'] == order_id:
            order = o
            break
    
    # Если заявка не найдена, возвращаем 404
    if not order:
        raise Http404("Заявка не найдена")
    
    context = {
        'page_title': f'Заявка №{order_id}',
        'order': order,
    }
    return render(request, 'order_detail.html', context)
