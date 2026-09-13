from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

OUT = Path("/Users/mac/curiousDevs/public/brand/curiousdevs-linkedin-cover-1584x396.png")
W, H = 1584, 396
BG = (6, 11, 18)
GRID = (24, 38, 55)
PANEL = (13, 27, 43)
BLUE = (105, 181, 255)
ORANGE = (255, 107, 0)
PAPER = (245, 240, 233)
MUTED = (145, 157, 171)


def font(size, mono=False):
    paths = [
        "/System/Library/Fonts/Menlo.ttc" if mono else "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNS.ttf",
    ]
    for path in paths:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                pass
    return ImageFont.load_default()


def line(draw, points, fill, width=1):
    draw.line(points, fill=fill, width=width, joint="curve")


def main():
    image = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(image)

    # Technical grid and a restrained orange light field.
    for x in range(0, W, 48): line(draw, [(x, 0), (x, H)], GRID, 1)
    for y in range(0, H, 48): line(draw, [(0, y), (W, y)], GRID, 1)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((930, -230, 1510, 430), fill=(*ORANGE, 46))
    glow = glow.filter(ImageFilter.GaussianBlur(70))
    image = Image.alpha_composite(image.convert("RGBA"), glow)
    draw = ImageDraw.Draw(image)

    # Left-side signal system: stacked layers connecting research to reality.
    cx, base = 355, 244
    layers = [
        (170, 30, (17, 37, 57), (56, 89, 120)),
        (130, 25, (14, 31, 49), (63, 103, 140)),
        (92, 20, (23, 48, 68), (75, 129, 169)),
    ]
    for width, height, fill, edge in layers:
        top = [(cx, base - height), (cx + width, base - height - 32), (cx + width * 2, base - height), (cx + width, base + 32 - height)]
        draw.polygon(top, fill=fill, outline=edge)
        draw.line([(top[0][0], top[0][1]), (top[0][0], base)], fill=edge, width=1)
        draw.line([(top[2][0], top[2][1]), (top[2][0], base)], fill=edge, width=1)
        draw.line([(top[1][0], top[1][1]), (top[1][0], base + 32)], fill=edge, width=1)
        base += 48

    # Orange core and orbit.
    core = [(cx, 67), (cx + 56, 46), (cx + 112, 67), (cx + 56, 88)]
    draw.polygon(core, fill=ORANGE, outline=(255, 180, 105))
    inner = [(cx, 67), (cx + 56, 48), (cx + 112, 67), (cx + 56, 86)]
    draw.polygon(inner, fill=(8, 17, 27), outline=PAPER)
    draw.polygon([(cx + 35, 67), (cx + 56, 59), (cx + 77, 67), (cx + 56, 75)], fill=ORANGE)
    draw.arc((120, -28, 575, 245), 200, 345, fill=ORANGE, width=2)
    draw.arc((168, 13, 525, 285), 20, 168, fill=BLUE, width=2)
    draw.ellipse((545, 96, 555, 106), fill=ORANGE)
    draw.ellipse((146, 132, 154, 140), fill=BLUE)
    for x, y in [(82, 78), (610, 213), (132, 305), (594, 301)]:
        draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=MUTED)

    mono = font(12, True)
    small = font(10, True)
    title = font(48, False)
    body = font(18, False)
    draw.text((725, 68), "CURIOUSDEVS", fill=ORANGE, font=mono)
    draw.text((725, 104), "Build AI for production.", fill=PAPER, font=title)
    draw.text((728, 176), "Research  /  Engineering  /  Systems", fill=MUTED, font=body)
    draw.text((728, 207), "From intelligence to real-world technology.", fill=BLUE, font=body)
    line(draw, [(728, 264), (1450, 264)], (45, 64, 84), 1)
    draw.text((728, 286), "AI ENGINEERING   ·   INTELLIGENT SYSTEMS   ·   ROBOTICS   ·   DEEPTECH", fill=MUTED, font=small)
    draw.text((728, 338), "curiousdevs.com", fill=PAPER, font=small)

    image.convert("RGB").save(OUT, "PNG", optimize=True)
    print(OUT)


if __name__ == "__main__":
    main()
