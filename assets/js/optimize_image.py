from PIL import Image
import os

image_path = "c:/Users/LENOVO/Music/OneDrive/Pictures/profile/assets/images/technologybuilding.jpeg"
output_path = "c:/Users/LENOVO/Music/OneDrive/Pictures/profile/assets/images/technologybuilding_optimized.jpeg"

try:
    with Image.open(image_path) as img:
        # Resize if width or height > 800
        max_size = (800, 800)
        img.thumbnail(max_size)
        
        # Save with optimization and quality reduction
        img.save(output_path, "JPEG", optimize=True, quality=60)
        
        original_size = os.path.getsize(image_path)
        new_size = os.path.getsize(output_path)
        
        print(f"Original size: {original_size} bytes")
        print(f"New size: {new_size} bytes")
        
        # Replace original
        os.replace(output_path, image_path)
        print("Image optimized and replaced.")
        
except Exception as e:
    print(f"Error: {e}")
