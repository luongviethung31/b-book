from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args: str, **options: str) -> str:
        print("Test")
        return "ok"