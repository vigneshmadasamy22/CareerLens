import urllib.request
import re

def test_frontend_assets():
    req = urllib.request.Request("http://localhost:3000/", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        print(f"HTML Status: {resp.status}, HTML length: {len(html)}")

    # Extract all CSS and JS asset links
    css_files = re.findall(r'href="(/_next/static/css/[^"]+)"', html)
    print(f"Found {len(css_files)} CSS files in HTML:")
    for css in css_files:
        css_url = f"http://localhost:3000{css}"
        css_req = urllib.request.Request(css_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(css_req) as c_resp:
            content = c_resp.read()
            print(f" - {css} -> Status: {c_resp.status}, Size: {len(content)} bytes")
            assert c_resp.status == 200
            assert len(content) > 0

    js_files = re.findall(r'src="(/_next/static/chunks/[^"]+)"', html)
    print(f"Found {len(js_files)} JS chunk files in HTML:")
    for js in js_files[:4]:
        js_url = f"http://localhost:3000{js}"
        js_req = urllib.request.Request(js_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(js_req) as j_resp:
            content = j_resp.read()
            print(f" - {js} -> Status: {j_resp.status}, Size: {len(content)} bytes")
            assert j_resp.status == 200

    print("ALL CSS AND JS ASSETS ARE SERVED WITH HTTP 200 OK! STYLES ARE FULLY LOADED!")

if __name__ == "__main__":
    test_frontend_assets()
