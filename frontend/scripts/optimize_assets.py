import os
from PIL import Image

BRAIN_DIR = r"C:\Users\abuba\.gemini\antigravity-cli\brain\4f264f41-e6b3-4bd6-a7cd-24b0e28eb2d9"
ASSETS_DIR = r"C:\Users\abuba\Aftabandsons\frontend\public\assets"

IMAGES_TO_PROCESS = [
    {
        "src": "hero_bdouble_convoy_1790098028654.jpg",
        "dest_base": "hero-bdouble-convoy",
        "max_size": (1920, 1080),
    },
    {
        "src": "service_prime_mover_1790098051256.jpg",
        "dest_base": "service-truck-transport",
        "max_size": (1200, 900),
    },
    {
        "src": "service_bdouble_clean_1790098109088.jpg",
        "dest_base": "service-b-double",
        "max_size": (1200, 900),
    },
    {
        "src": "service_local_delivery_1790098141177.jpg",
        "dest_base": "service-local-deliveries",
        "max_size": (1200, 900),
    },
    {
        "src": "service_interstate_hauler_1790098181161.jpg",
        "dest_base": "service-interstate-freight",
        "max_size": (1200, 900),
    },
    {
        "src": "fleet_chassis_engineering_1790098225289.jpg",
        "dest_base": "fleet-chassis-engineering",
        "max_size": (1600, 900),
    },
    {
        "src": "safety_road_inspection_1790098274449.jpg",
        "dest_base": "safety-road-inspection",
        "max_size": (1200, 675),
    },
    {
        "src": "contact_highway_dusk_1790098326236.jpg",
        "dest_base": "contact-highway-dusk",
        "max_size": (1600, 900),
    },
]

for item in IMAGES_TO_PROCESS:
    src_path = os.path.join(BRAIN_DIR, item["src"])
    if not os.path.exists(src_path):
        print(f"Warning: {src_path} not found")
        continue

    img = Image.open(src_path)
    img.thumbnail(item["max_size"], Image.Resampling.LANCZOS)
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Save as optimized WebP
    webp_path = os.path.join(ASSETS_DIR, f"{item['dest_base']}.webp")
    img.save(webp_path, "WEBP", quality=82, method=6)
    webp_size_kb = os.path.getsize(webp_path) / 1024

    # Save as optimized JPEG fallback
    jpg_path = os.path.join(ASSETS_DIR, f"{item['dest_base']}.jpg")
    img.save(jpg_path, "JPEG", quality=82, optimize=True)
    jpg_size_kb = os.path.getsize(jpg_path) / 1024

    print(f"Optimized {item['dest_base']}: WebP={webp_size_kb:.1f}KB, JPG={jpg_size_kb:.1f}KB ({img.width}x{img.height})")

print("Asset optimization complete!")
