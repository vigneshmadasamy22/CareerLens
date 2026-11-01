import urllib.request
import json

def test_endpoints():
    try:
        with urllib.request.urlopen("http://localhost:8000/api/templates") as resp:
            data = json.loads(resp.read().decode())
            print(f"Backend templates returned: {len(data)} items")
            for t in data[:5]:
                print(f" - {t['id']}: {t['name']} ({t['category']})")
    except Exception as e:
        print("Backend error on /api/templates:", e)

    try:
        with urllib.request.urlopen("http://localhost:8000/api/interviews/questions?role=Software%20Engineer&category=Technical") as resp:
            data = json.loads(resp.read().decode())
            print(f"Backend interview questions returned: {len(data)} items")
    except Exception as e:
        print("Backend error on /api/interviews/questions:", e)

if __name__ == "__main__":
    test_endpoints()
