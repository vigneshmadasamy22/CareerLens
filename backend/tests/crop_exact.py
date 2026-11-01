from PIL import Image
import os

def crop_exact():
    dest_dir = r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images"
    os.makedirs(dest_dir, exist_ok=True)

    img_l = Image.open(r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793528751274_d94e9062.jpg")
    img_d = Image.open(r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793516808026_223b31ab.jpg")

    W, H = img_l.size
    print(f"Dimensions: {W} x {H}")

    # Let's crop the login card from light and dark
    # In grid_r0_c1 (x from W/3 to 2W/3, y from 0 to H/2):
    # Notice the card starts around y=0.08 to 0.46, and x around 0.35 to 0.65.
    # Inside the card, the right half has the character:
    # Character in light mode:
    # x approx: 0.49 * W to 0.65 * W
    # y approx: 0.10 * H to 0.43 * H

    # Let's crop both the entire right side of the card (character + floating 3D widgets)
    # AND just the character
    # Light:
    card_right_l = img_l.crop((int(0.485 * W), int(0.085 * H), int(0.655 * W), int(0.435 * H)))
    card_right_l.save(os.path.join(dest_dir, "login-character-light.png"))

    # Dark:
    card_right_d = img_d.crop((int(0.485 * W), int(0.085 * H), int(0.655 * W), int(0.435 * H)))
    card_right_d.save(os.path.join(dest_dir, "login-character-dark.png"))

    # Also save the full login preview card for both
    login_card_l = img_l.crop((int(0.345 * W), int(0.080 * H), int(0.655 * W), int(0.440 * H)))
    login_card_l.save(os.path.join(dest_dir, "login-card-full-light.png"))

    login_card_d = img_d.crop((int(0.345 * W), int(0.080 * H), int(0.655 * W), int(0.440 * H)))
    login_card_d.save(os.path.join(dest_dir, "login-card-full-dark.png"))

    # Also crop Screen 1 (Landing page hero 3D artwork if any)
    # In grid_r0_c0:
    screen1_l = img_l.crop((int(0.01 * W), int(0.080 * H), int(0.325 * W), int(0.440 * H)))
    screen1_l.save(os.path.join(dest_dir, "screen1-landing-light.png"))
    screen1_d = img_d.crop((int(0.01 * W), int(0.080 * H), int(0.325 * W), int(0.440 * H)))
    screen1_d.save(os.path.join(dest_dir, "screen1-landing-dark.png"))

    print("Crops saved successfully!")

if __name__ == "__main__":
    crop_exact()
