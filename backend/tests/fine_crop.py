from PIL import Image

def fine_crop():
    img_l = Image.open(r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793528751274_d94e9062.jpg")
    img_d = Image.open(r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793516808026_223b31ab.jpg")
    W, H = img_l.size

    # In grid_r0_c1:
    # Character in Light mode:
    # Let's inspect pixel ranges
    # Top is around y=58 (0.10 * 576 = 57.6)
    # Bottom of card is around y=235 (0.408 * 576 = 235)
    # Left of character illustration is around x=525 (0.512 * 1024 = 524)
    # Right of card is around x=649 (0.634 * 1024 = 649)

    # Let's test a couple coordinate sets and save
    # Clean crop without any input boxes on left or buttons on bottom
    crop_l = img_l.crop((525, 52, 648, 198))
    crop_l.save(r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images\login-character-light.png")

    crop_d = img_d.crop((525, 52, 648, 186))
    crop_d.save(r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images\login-character-dark.png")

    # Clean crop of the 3D laptop illustration for hero
    hero_l = img_l.crop((205, 48, 332, 175))
    hero_l.save(r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images\hero_3d_light.png")

    hero_d = img_d.crop((205, 48, 332, 175))
    hero_d.save(r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images\hero_3d_dark.png")

    print("Refined crops saved!")

if __name__ == "__main__":
    fine_crop()
