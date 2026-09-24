# AI-GENERATED: ChatGPT
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("categories.urls")),
    path("api/", include("products.urls")),
    path("api/", include("orders.urls")),
    path("api/auth/", include("users.urls")),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
