import urllib.request

try:
    resp = urllib.request.urlopen("http://localhost:3000")
    print(f"Frontend responds with HTTP {resp.status} OK!")
except Exception as e:
    print("Error connecting to frontend:", e)
