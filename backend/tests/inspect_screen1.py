from PIL import Image

img = Image.open(r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793516808026_223b31ab.jpg")
W, H = img.size
# Screen 1 is top-left
screen1 = img.crop((0, 0, int(W / 3), int(H / 2)))
screen1.save(r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images\screen1_dark_full.png")
print("Saved screen1_dark_full.png")
