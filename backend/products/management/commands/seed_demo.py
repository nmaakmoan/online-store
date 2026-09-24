# AI-GENERATED: Qoder
from django.core.management.base import BaseCommand
from categories.models import Category
from products.models import Product

CATEGORIES = [
    ("Ноутбуки", "Портативные компьютеры"),
    ("Смартфоны", "Мобильные телефоны"),
    ("Аксессуары", "Клавиатуры, мыши и прочее"),
]

PRODUCTS = [
    ("Ноутбук Pro 14", "Лёгкий ноутбук с экраном 14 дюймов и 16 ГБ памяти.", 749990, "Ноутбуки", 7),
    ("Ноутбук Air 13", "Тонкий ноутбук для учёбы и работы, 8 ГБ памяти.", 429990, "Ноутбуки", 12),
    ("Игровой ноутбук Titan", "Мощная видеокарта, 32 ГБ памяти, 165 Гц экран.", 1299990, "Ноутбуки", 3),
    ("Смартфон Galaxy 5", "Экран 6.5 дюйма, камера 64 Мп, батарея 5000 мАч.", 349990, "Смартфоны", 20),
    ("Смартфон Pixel Mini", "Компактный смартфон с чистой системой.", 279990, "Смартфоны", 0),
    ("Смартфон Ultra Max", "Флагман с камерой 200 Мп и зарядкой 120 Вт.", 899990, "Смартфоны", 5),
    ("Беспроводная мышь", "Тихие клики, подключение по Bluetooth.", 12990, "Аксессуары", 50),
    ("Механическая клавиатура", "Подсветка, съёмный кабель, red-свитчи.", 45990, "Аксессуары", 15),
    ("USB-C хаб", "7 портов: HDMI, USB 3.0, SD-карта.", 19990, "Аксессуары", 30),
]


class Command(BaseCommand):
    help = "Создаёт демо-категории и демо-товары, если база пустая"

    def handle(self, *args, **options):
        if Product.objects.exists():
            self.stdout.write("Товары уже есть — пропуск (сначала очисти базу, если нужен новый сид).")
            return

        categories = {}
        for name, description in CATEGORIES:
            categories[name] = Category.objects.create(name=name, description=description)
            self.stdout.write(f"Категория: {name}")

        for name, description, price, category, stock in PRODUCTS:
            Product.objects.create(
                name=name,
                description=description,
                price=price,
                category=categories[category],
                stock=stock,
            )
            self.stdout.write(f"Товар: {name}")

        self.stdout.write(self.style.SUCCESS(f"Готово: {len(CATEGORIES)} категорий, {len(PRODUCTS)} товаров."))
