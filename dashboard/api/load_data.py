import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dashboard.settings")
django.setup()

from api.models import DataEntry

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json_file_path = os.path.join(BASE_DIR, "jsondata.json")

def clean_int(value, default=0):
    if isinstance(value, int):
        return value
    if isinstance(value, str) and value.strip().isdigit():
        return int(value)
    return default  

with open(json_file_path, encoding="utf-8") as file:
    data = json.load(file)
    for entry in data:
        DataEntry.objects.create(
            end_year=clean_int(entry.get("end_year"), default=None),  # Allow NULL for optional fields
            intensity=clean_int(entry.get("intensity"), default=1),  # Ensure a valid value
            sector=entry.get("sector") or None,
            topic=entry.get("topic"),
            insight=entry.get("insight"),
            region=entry.get("region") or None,
            country=entry.get("country") or None,
            relevance=clean_int(entry.get("relevance"), default=0),
            pestle=entry.get("pestle") or None,
            source=entry.get("source") or None,
            likelihood=clean_int(entry.get("likelihood"), default=0),
        )

print("db is loded.")

