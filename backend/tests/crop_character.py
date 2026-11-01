import os
from PIL import Image

def main():
    light_path = r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793528751274_d94e9062.jpg"
    dark_path = r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\.user_uploaded\media_1793516808026_223b31ab.jpg"

    dest_dir = r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images"
    os.makedirs(dest_dir, exist_ok=True)

    img_light = Image.open(light_path)
    w_l, h_l = img_light.size
    print(f"Light dimensions: {w_l} x {h_l}")

    # In media_1793528751274_d94e9062.jpg:
    # Top row has 3 screens:
    # Screen 1: Landing Page (approx x: 0 to 1/3)
    # Screen 2: Sign Up / Login (approx x: 1/3 to 2/3)
    # Screen 3: Dashboard (approx x: 2/3 to 1)
    # In Screen 2, the right side is the 3D character with laptop!
    # Let's crop the character from Screen 2 in both light and dark!
    
    # Screen 2 is roughly x: 0.33 * w_l to 0.67 * w_l, y: 0.05 * h_l to 0.36 * h_l
    # The character inside Screen 2 is on the right half:
    # x: ~0.50 * w_l to ~0.64 * w_l, y: ~0.10 * h_l to ~0.35 * h_l
    
    # Let's crop screen 2 first to check exact bounds
    screen2_box_l = (int(0.33 * w_l), int(0.04 * h_l), int(0.66 * w_l), int(0.36 * h_l))
    screen2_l = img_light.crop(screen2_box_l)
    screen2_l.save(os.path.join(dest_dir, "screen2_light.png"))

    # Character inside screen 2 is right side:
    w_s2, h_s2 = screen2_l.size
    char_box_l = (int(0.42 * w_s2), int(0.12 * h_s2), int(0.98 * w_s2), int(0.98 * h_s2))
    char_light = screen2_l.crop(char_box_l)
    char_light.save(os.path.join(dest_dir, "login-character-light.png"))
    print("Saved login-character-light.png")

    # Now for Dark mode
    img_dark = Image.open(dark_path)
    w_d, h_d = img_dark.size
    print(f"Dark dimensions: {w_d} x {h_d}")

    screen2_box_d = (int(0.33 * w_d), int(0.04 * h_d), int(0.66 * w_d), int(0.36 * h_d))
    screen2_d = img_dark.crop(screen2_box_d)
    screen2_d.save(os.path.join(dest_dir, "screen2_dark.png"))

    w_s2_d, h_s2_d = screen2_d.size
    char_box_d = (int(0.42 * w_s2_d), int(0.12 * h_s2_d), int(0.98 * w_s2_d), int(0.98 * h_s2_d))
    char_dark = screen2_d.crop(char_box_d)
    char_dark.save(os.path.join(dest_dir, "login-character-dark.png"))
    print("Saved login-character-dark.png")

    # Let's also crop Screen 1's 3D hero illustration for landing page if needed!
    hero_box_l = (int(0.15 * w_l), int(0.08 * h_l), int(0.33 * w_l), int(0.33 * h_l))
    hero_l = img_light.crop(hero_box_l)
    hero_l.save(os.path.join(dest_dir, "hero_3d_light.png"))

    hero_box_d = (int(0.15 * w_d), int(0.08 * h_d), int(0.33 * w_d), int(0.33 * h_d))
    hero_d = img_dark.crop(hero_box_d)
    hero_d.save(os.path.join(dest_dir, "hero_3d_dark.png"))
    print("Saved hero_3d illustrations")

if __name__ == "__main__":
    main()
