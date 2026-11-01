from PIL import Image

def analyze():
    img_l = Image.open(r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793528751274_d94e9062.jpg")
    print("Light size:", img_l.size)
    # Let's save a grid of 6 crops so we can inspect exactly which part is which screen
    W, H = img_l.size
    # There are 3 columns, 2 rows typically or let's slice 3 cols x 2 rows
    for r in range(2):
        for c in range(3):
            box = (int(c * W / 3), int(r * H / 2), int((c + 1) * W / 3), int((r + 1) * H / 2))
            crop = img_l.crop(box)
            crop.save(rf"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images\grid_r{r}_c{c}.png")
            print(f"Saved grid_r{r}_c{c}.png")

if __name__ == "__main__":
    analyze()
