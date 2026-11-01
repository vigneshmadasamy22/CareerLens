import os
import zipfile

def create_project_zip():
    source_dir = r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens"
    output_zip = r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens.zip"

    # Exclude directories and extensions that shouldn't be in the distribution zip
    exclude_dirs = {
        "node_modules",
        ".next",
        "venv",
        "__pycache__",
        ".git",
        ".pytest_cache",
        ".vscode",
        ".idea"
    }
    
    exclude_exts = {
        ".pyc",
        ".pyo",
        ".pyd"
    }

    print(f"Creating zip archive at: {output_zip}...")
    file_count = 0
    total_uncompressed_bytes = 0

    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Modify dirs in-place to prune excluded directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in exclude_exts:
                    continue
                
                full_path = os.path.join(root, file)
                # Compute relative path inside the zip (prefixed with careerlens/)
                rel_path = os.path.relpath(full_path, os.path.dirname(source_dir))
                
                zipf.write(full_path, arcname=rel_path)
                file_count += 1
                total_uncompressed_bytes += os.path.getsize(full_path)

    zip_size_bytes = os.path.getsize(output_zip)
    zip_size_mb = zip_size_bytes / (1024 * 1024)
    print(f"SUCCESS! Added {file_count} files.")
    print(f"Uncompressed size: {total_uncompressed_bytes / (1024 * 1024):.2f} MB")
    print(f"Compressed zip size: {zip_size_mb:.2f} MB ({zip_size_bytes} bytes)")
    print(f"Saved at: {output_zip}")

    # Copy to all target destinations
    import shutil
    destinations = [
        r"C:\Users\Vignesh\Downloads\careerlens.zip",
        r"C:\Users\Vignesh\OneDrive\Desktop\careerlens.zip",
        r"C:\Users\Vignesh\.gemini\antigravity\scratch\careerlens\frontend\public\careerlens.zip",
        r"C:\Users\Vignesh\.gemini\antigravity\brain\9daa2ec8-779b-4569-bb14-f78f6a12da9a\careerlens.zip"
    ]
    for dest in destinations:
        try:
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            shutil.copy2(output_zip, dest)
            print(f"Copied {os.path.getsize(dest)} bytes -> {dest}")
        except Exception as e:
            print(f"Failed to copy to {dest}: {e}")

if __name__ == "__main__":
    create_project_zip()
