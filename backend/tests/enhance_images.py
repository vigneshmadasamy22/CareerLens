from PIL import Image, ImageEnhance, ImageFilter

def upscale():
    for mode in ["light", "dark"]:
        path = rf"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\images\login-character-{mode}.png"
        img = Image.open(path)
        w, h = img.size
        # Upscale 3x using high quality Lanczos filter
        upscaled = img.resize((w * 3, h * 3), resample=Image.Resampling.LANCZOS)
        # Apply subtle unsharp mask for crystal crisp lines
        sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=2))
        sharpened.save(path, format="PNG", optimize=True)
        print(f"Upscaled and sharpened login-character-{mode}.png to {w*3}x{h*3}")

if __name__ == "__main__":
    upscale()
