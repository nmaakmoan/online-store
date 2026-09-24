# AI-GENERATED: ChatGPT
from django.db import transaction
from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "quantity", "price", "subtotal"]

    def get_subtotal(self, obj):
        return obj.price * obj.quantity

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "name", "phone", "address", "status",
            "total_price", "created_at", "items"
        ]
        read_only_fields = ["status", "total_price", "created_at", "items"]

class OrderCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=120)
    phone = serializers.CharField(max_length=30)
    address = serializers.CharField()
    items = serializers.ListField(child=serializers.DictField())

    @transaction.atomic
    def create(self, validated_data):
        user = self.context["request"].user
        order = Order.objects.create(
            user=user,
            name=validated_data["name"],
            phone=validated_data["phone"],
            address=validated_data["address"],
        )

        total = 0
        for row in validated_data["items"]:
            product_id = row.get("product")
            quantity = int(row.get("quantity", 0))
            product = Product.objects.select_for_update().get(id=product_id)

            if quantity < 1:
                raise serializers.ValidationError("Количество должно быть больше 0.")
            if quantity > product.stock:
                raise serializers.ValidationError(
                    f"Недостаточно товара: {product.name}"
                )

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price,
            )
            product.stock -= quantity
            product.save(update_fields=["stock"])
            total += product.price * quantity

        order.total_price = total
        order.save(update_fields=["total_price"])
        return order
