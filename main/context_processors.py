def menu_context(request):
    """Context processor for menu data"""
    menu_items = [
        {'name': 'Главная', 'url': '#home', 'anchor': True},
        {'name': 'О нас', 'url': '#about', 'anchor': True},
        {'name': 'Услуги', 'url': '#services', 'anchor': True},
        {'name': 'Мастера', 'url': '#masters', 'anchor': True},
        {'name': 'Запись', 'url': '#booking', 'anchor': True},
    ]
    
    # Add staff-only menu items
    if request.user.is_authenticated and request.user.is_staff:
        menu_items.append({'name': 'Заявки', 'url': 'orders_list', 'anchor': False})
    
    return {
        'menu_items': menu_items,
        'site_name': 'Барбершоп "Стальная Борода"'
    }
