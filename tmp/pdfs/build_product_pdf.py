from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.pagesizes import landscape
from reportlab.lib.utils import simpleSplit
from math import sin, cos, pi
import os

OUT = "/Users/mac/curiousDevs/output/pdf/CuriousDevs_Product_Overview_2026.pdf"
W, H = 960, 540
BG = HexColor("#070b12")
PANEL = HexColor("#0d1522")
PANEL2 = HexColor("#101b2b")
INK = HexColor("#f4f0e9")
MUTED = HexColor("#9ba4b0")
GRID = HexColor("#1d2a3b")
LINE = HexColor("#2d4057")
ORANGE = HexColor("#ff6b00")
BLUE = HexColor("#71b7ff")
GREEN = HexColor("#80d7b1")


def font(c, name="Helvetica", size=12, color=INK):
    c.setFont(name, size)
    c.setFillColor(color)


def text(c, x, y, value, size=12, color=INK, name="Helvetica"):
    font(c, name, size, color)
    c.drawString(x, y, value)


def mono(c, x, y, value, size=9, color=MUTED):
    text(c, x, y, value.upper(), size, color, "Courier")


def rule(c, x1, y, x2, color=LINE, width=0.7):
    c.setStrokeColor(color); c.setLineWidth(width); c.line(x1, y, x2, y)


def grid(c, step=48, opacity=0.45):
    c.setStrokeColor(Color(GRID.red, GRID.green, GRID.blue, alpha=opacity)); c.setLineWidth(0.35)
    for x in range(0, int(W) + step, step): c.line(x, 0, x, H)
    for y in range(0, int(H) + step, step): c.line(0, y, W, y)


def bg(c, dark=True):
    c.setFillColor(BG if dark else HexColor("#f5f0e7")); c.rect(0, 0, W, H, fill=1, stroke=0)
    if dark: grid(c)


def header(c, section, page):
    mono(c, 48, H - 38, section, 8, ORANGE)
    mono(c, W - 92, H - 38, f"{page:02d} / 06", 8, MUTED)
    rule(c, 48, H - 52, W - 48, LINE)


def footer(c, label="CURIOUSDEVS / PRODUCT SYSTEM"):
    rule(c, 48, 34, W - 48, LINE)
    mono(c, 48, 18, label, 7, MUTED)
    mono(c, W - 212, 18, "BUILD AI FOR PRODUCTION", 7, ORANGE)


def paragraph(c, x, y, value, width, size=13, leading=19, color=MUTED):
    font(c, "Helvetica", size, color)
    lines = simpleSplit(value, "Helvetica", size, width)
    for i, line in enumerate(lines): c.drawString(x, y - i * leading, line)
    return y - len(lines) * leading


def pill(c, x, y, label, color=ORANGE, fill=PANEL2):
    width = stringWidth(label.upper(), "Courier", 8) + 24
    c.setFillColor(fill); c.setStrokeColor(color); c.setLineWidth(0.8)
    c.roundRect(x, y, width, 22, 11, fill=1, stroke=1)
    mono(c, x + 12, y + 7, label, 8, color)
    return width


def arrow(c, x1, y1, x2, y2, color=ORANGE, width=1.5):
    c.setStrokeColor(color); c.setFillColor(color); c.setLineWidth(width); c.line(x1, y1, x2, y2)
    ang = __import__('math').atan2(y2-y1, x2-x1)
    for a in (ang + 2.65, ang - 2.65): c.line(x2, y2, x2 + 8*cos(a), y2 + 8*sin(a))


def node(c, x, y, w, h, title, subtitle, accent=ORANGE):
    c.setFillColor(PANEL); c.setStrokeColor(LINE); c.setLineWidth(0.8); c.roundRect(x, y, w, h, 8, fill=1, stroke=1)
    c.setFillColor(accent); c.circle(x + 18, y + h - 19, 4, fill=1, stroke=0)
    text(c, x + 32, y + h - 23, title, 10, INK, "Helvetica-Bold")
    paragraph(c, x + 16, y + h - 47, subtitle, w - 30, 8.5, 12, MUTED)


def noema_diagram(c, x, y, scale=1.0):
    # Inputs, central intelligence core, and outputs; intentionally technical rather than decorative.
    s = scale
    labels = [("TEXT", BLUE), ("IMAGE", GREEN), ("AUDIO", ORANGE), ("SENSOR", HexColor("#b8a6ff"))]
    for i, (lab, col) in enumerate(labels):
        yy = y + 130*s - i*32*s
        c.setFillColor(PANEL); c.setStrokeColor(LINE); c.roundRect(x, yy, 86*s, 24*s, 4*s, fill=1, stroke=1)
        c.setFillColor(col); c.circle(x + 12*s, yy + 12*s, 3*s, fill=1, stroke=0); mono(c, x + 22*s, yy + 8*s, lab, 7*s, MUTED)
        arrow(c, x + 90*s, yy + 12*s, x + 155*s, y + 70*s, col, 0.8)
    cx, cy = x + 195*s, y + 70*s
    c.setFillColor(HexColor("#15263a")); c.setStrokeColor(ORANGE); c.setLineWidth(1.3); c.roundRect(cx-42*s, cy-42*s, 84*s, 84*s, 10*s, fill=1, stroke=1)
    c.setStrokeColor(BLUE); c.setLineWidth(0.8); c.roundRect(cx-29*s, cy-29*s, 58*s, 58*s, 7*s, fill=0, stroke=1)
    for yy in (cy-12*s, cy, cy+12*s): rule(c, cx-18*s, yy, cx+18*s, BLUE, 0.7)
    c.setFillColor(ORANGE); c.circle(cx, cy+24*s, 4*s, fill=1, stroke=0); mono(c, cx-32*s, cy-62*s, "NOEMA CORE", 8*s, INK)
    outs = [("PERCEIVE", BLUE), ("REASON", GREEN), ("PLAN", ORANGE), ("ACT", HexColor("#b8a6ff"))]
    for i, (lab, col) in enumerate(outs):
        yy = y + 130*s - i*32*s
        arrow(c, cx + 46*s, cy, x + 280*s, yy + 12*s, col, 0.8)
        c.setFillColor(PANEL); c.setStrokeColor(LINE); c.roundRect(x + 285*s, yy, 88*s, 24*s, 4*s, fill=1, stroke=1)
        c.setFillColor(col); c.circle(x + 297*s, yy + 12*s, 3*s, fill=1, stroke=0); mono(c, x + 307*s, yy + 8*s, lab, 7*s, MUTED)


def humanoid(c, cx, cy, scale=1.0):
    s = scale
    # A clean engineering schematic of a humanoid platform.
    c.setStrokeColor(LINE); c.setLineWidth(0.7)
    c.ellipse(cx-78*s, cy-120*s, cx+78*s, cy-92*s, fill=0, stroke=1)
    c.setStrokeColor(BLUE); c.setLineWidth(1.2); c.arc(cx-142*s, cy+80*s, cx+142*s, cy+220*s, 190, 160)
    # head
    c.setFillColor(HexColor("#1a2634")); c.setStrokeColor(BLUE); c.roundRect(cx-28*s, cy+86*s, 56*s, 54*s, 15*s, fill=1, stroke=1)
    c.setFillColor(HexColor("#091019")); c.roundRect(cx-21*s, cy+103*s, 42*s, 13*s, 5*s, fill=1, stroke=1)
    c.setFillColor(BLUE); c.circle(cx-10*s, cy+110*s, 2.5*s, fill=1, stroke=0); c.circle(cx+10*s, cy+110*s, 2.5*s, fill=1, stroke=0)
    # neck and torso
    c.setFillColor(HexColor("#172434")); c.setStrokeColor(LINE); c.rect(cx-10*s, cy+75*s, 20*s, 14*s, fill=1, stroke=1)
    c.setFillColor(HexColor("#203248")); c.setStrokeColor(BLUE); c.roundRect(cx-43*s, cy-5*s, 86*s, 84*s, 16*s, fill=1, stroke=1)
    c.setFillColor(HexColor("#0b1520")); c.setStrokeColor(ORANGE); c.roundRect(cx-25*s, cy+25*s, 50*s, 31*s, 5*s, fill=1, stroke=1)
    c.setFillColor(ORANGE); c.circle(cx, cy+10*s, 4*s, fill=1, stroke=0)
    # arms / joints
    for side in (-1, 1):
        pts = [(cx+side*38*s, cy+62*s), (cx+side*82*s, cy+26*s), (cx+side*111*s, cy-32*s), (cx+side*130*s, cy-17*s)]
        c.setStrokeColor(HexColor("#5d6c7b")); c.setLineWidth(13*s); c.setLineCap(1); c.line(*pts[0], *pts[1]); c.line(*pts[1], *pts[2]); c.line(*pts[2], *pts[3])
        c.setStrokeColor(BLUE); c.setLineWidth(1.1); c.setLineCap(0); c.line(*pts[0], *pts[1]); c.line(*pts[1], *pts[2]); c.line(*pts[2], *pts[3])
        for px, py in pts[1:3]: c.setFillColor(HexColor("#101b28")); c.setStrokeColor(ORANGE); c.circle(px, py, 7*s, fill=1, stroke=1)
        c.setStrokeColor(ORANGE); c.setLineWidth(1); c.line(pts[3][0], pts[3][1], pts[3][0]+side*12*s, pts[3][1]-7*s); c.line(pts[3][0], pts[3][1], pts[3][0]+side*11*s, pts[3][1]+6*s)
    # legs
    for side in (-1, 1):
        hip=(cx+side*24*s, cy-8*s); knee=(cx+side*34*s, cy-70*s); ankle=(cx+side*42*s, cy-123*s)
        c.setStrokeColor(HexColor("#5d6c7b")); c.setLineWidth(17*s); c.setLineCap(1); c.line(*hip,*knee); c.line(*knee,*ankle)
        c.setStrokeColor(BLUE); c.setLineWidth(1.1); c.setLineCap(0); c.line(*hip,*knee); c.line(*knee,*ankle)
        c.setFillColor(HexColor("#101b28")); c.setStrokeColor(ORANGE); c.circle(*knee, 8*s, fill=1, stroke=1)
        c.setFillColor(HexColor("#172434")); c.setStrokeColor(LINE); c.roundRect(ankle[0]-13*s, ankle[1]-9*s, 29*s, 12*s, 3*s, fill=1, stroke=1)
    # callout lines
    labels=[("VISION + DEPTH", cx-196*s, cy+116*s, cx-31*s, cy+116*s, BLUE), ("EDGE COMPUTE", cx+60*s, cy+50*s, cx+40*s, cy+50*s, GREEN), ("DEXTEROUS CONTROL", cx+68*s, cy-38*s, cx+103*s, cy-30*s, ORANGE), ("SAFETY + TELEMETRY", cx-203*s, cy-74*s, cx-34*s, cy-75*s, HexColor("#b8a6ff"))]
    for lab, tx, ty, x1, y1, col in labels:
        c.setStrokeColor(col); c.setLineWidth(0.7); c.line(x1,y1,tx+(-8 if tx<cx else 8)*s,ty); mono(c, tx, ty+4*s, lab, 7*s, col)


def page_cover(c):
    bg(c); mono(c, 48, H-38, "CURIOUSDEVS / PRODUCT OVERVIEW", 8, ORANGE); mono(c, W-92, H-38, "2026", 8, MUTED)
    text(c, 48, 370, "From intelligence", 45, INK, "Helvetica-Bold")
    text(c, 48, 316, "to action.", 45, ORANGE, "Helvetica-Bold")
    paragraph(c, 50, 275, "A product system for building grounded intelligence and carrying it into the physical world.", 390, 16, 23, MUTED)
    pill(c, 50, 203, "Noema / understands", BLUE)
    pill(c, 50, 169, "Soma / embodies", ORANGE)
    # orbit / relationship diagram
    c.setStrokeColor(LINE); c.setLineWidth(1); c.ellipse(530, 92, 890, 430, fill=0, stroke=1); c.ellipse(580, 145, 840, 377, fill=0, stroke=1)
    c.setStrokeColor(BLUE); c.setLineWidth(1.3); c.arc(530, 92, 890, 430, 20, 150); c.setStrokeColor(ORANGE); c.arc(530, 92, 890, 430, 195, 125)
    c.setFillColor(BLUE); c.circle(650, 270, 34, fill=1, stroke=0); text(c, 622, 265, "NOEMA", 12, BG, "Helvetica-Bold")
    c.setFillColor(ORANGE); c.circle(777, 270, 34, fill=1, stroke=0); text(c, 754, 265, "SOMA", 12, BG, "Helvetica-Bold")
    arrow(c, 687, 270, 740, 270, INK, 1.1)
    mono(c, 611, 205, "GROUND · REASON · PLAN", 8, MUTED); mono(c, 742, 205, "SENSE · MOVE · ADAPT", 8, MUTED)
    rule(c, 48, 108, W-48, LINE); mono(c, 48, 82, "CURIOUSDEVS", 9, INK); mono(c, 48, 64, "BUILD AI FOR PRODUCTION", 8, MUTED)
    mono(c, W-310, 82, "PRODUCT DIRECTION / RESEARCH PREVIEW", 8, MUTED)


def page_noema(c):
    bg(c); header(c, "01 / NOEMA", 1)
    text(c, 48, 426, "Noema", 42, INK, "Helvetica-Bold"); text(c, 48, 389, "Intelligence that understands.", 24, BLUE)
    paragraph(c, 48, 348, "A multimodal intelligence layer for perception, representation, reasoning, planning and action. Noema turns language, images, audio and sensor context into decisions that can be evaluated in the real world.", 410, 13, 19, MUTED)
    mono(c, 48, 245, "THE LOOP", 8, ORANGE); noema_diagram(c, 80, 82, 1.13)
    node(c, 550, 328, 320, 76, "Grounded context", "Build a structured view of the situation before a model decides what to do.", BLUE)
    node(c, 550, 225, 320, 76, "Auditable reasoning", "Keep tools, permissions, uncertainty and decisions inside a measurable loop.", GREEN)
    node(c, 550, 122, 320, 76, "Evaluation as a control surface", "Measure task completion and failure modes, not just polished responses.", ORANGE)
    footer(c)


def page_soma(c):
    bg(c); header(c, "02 / SOMA", 2)
    text(c, 48, 426, "Soma", 42, INK, "Helvetica-Bold"); text(c, 48, 389, "Intelligence, embodied.", 24, ORANGE)
    paragraph(c, 48, 348, "A humanoid robotics platform designed to sense, understand, plan, move, act and adapt in real environments. Product direction spans perception, edge intelligence, safe control, dexterous manipulation and telemetry.", 410, 13, 19, MUTED)
    mono(c, 48, 245, "THE EMBODIED LOOP", 8, ORANGE); humanoid(c, 285, 132, 0.92)
    node(c, 550, 328, 320, 76, "Perception + depth", "Vision, audio, inertial and environmental sensing create a live state estimate.", BLUE)
    node(c, 550, 225, 320, 76, "Edge compute + control", "Low-latency inference and hard safety limits keep decisions close to the machine.", GREEN)
    node(c, 550, 122, 320, 76, "Action + learning", "Motion, manipulation and deployment telemetry turn episodes into better skills.", ORANGE)
    footer(c)


def page_stack(c):
    bg(c); header(c, "03 / SYSTEM ARCHITECTURE", 3)
    text(c, 48, 426, "One intelligence stack.", 34, INK, "Helvetica-Bold"); text(c, 48, 388, "Two product layers. One measured loop.", 20, MUTED)
    stages=[("WORLD", "People, objects, language, images, audio, sensors"), ("NOEMA", "Perception · representation · reasoning · planning"), ("SOMA", "Edge compute · control · manipulation · locomotion"), ("OUTCOME", "A decision, a movement, a result, an episode")]
    xs=[70, 300, 530, 760]
    for i,(title,sub) in enumerate(stages):
        accent=[BLUE, BLUE, ORANGE, GREEN][i]
        node(c,xs[i],260,155,92,title,sub,accent)
        if i<3: arrow(c,xs[i]+160,306,xs[i+1]-8,306,accent,1.2)
    rule(c, 110, 210, 850, LINE); mono(c, 110, 184, "THE SAFETY BOUNDARY", 8, ORANGE)
    paragraph(c, 110, 156, "Noema can propose. Soma can execute. Hard constraints, permissions, fallbacks and human override remain explicit at the boundary between decision and actuation.", 735, 15, 22, INK)
    for i, (lab, desc) in enumerate([("1", "observe"), ("2", "represent"), ("3", "decide"), ("4", "act"), ("5", "measure")]):
        x=150+i*160; c.setFillColor(PANEL); c.setStrokeColor(LINE); c.circle(x,80,25,fill=1,stroke=1); c.setFillColor(ORANGE if i in (2,3) else BLUE); c.circle(x,80,6,fill=1,stroke=0); mono(c,x-7,45,lab,8,MUTED); mono(c,x-26,19,desc,7,MUTED)
        if i<4: arrow(c,x+30,80,x+130,80,LINE,0.8)
    footer(c)


def page_workflow(c):
    bg(c); header(c, "04 / FROM RESEARCH TO PRODUCT", 4)
    text(c, 48, 426, "Research to product.", 34, INK, "Helvetica-Bold"); text(c, 48, 388, "Without the gaps.", 34, ORANGE, "Helvetica-Bold")
    paragraph(c, 48, 343, "CuriousDevs connects ambitious research to systems that can be tested, deployed and operated. Every stage leaves behind evidence for the next.", 430, 14, 21, MUTED)
    stages=[("01", "Research", "Explore the possible"), ("02", "Prototype", "Validate the loop"), ("03", "Engineer", "Make it reliable"), ("04", "Deploy", "Put it in context"), ("05", "Evolve", "Learn from operation")]
    y=205
    rule(c,90,y,870,LINE,1.2)
    for i,(num,title,desc) in enumerate(stages):
        x=100+i*190; c.setFillColor(BG); c.setStrokeColor(ORANGE if i>=2 else BLUE); c.setLineWidth(1.1); c.circle(x,y,12,fill=1,stroke=1); c.setFillColor(ORANGE if i>=2 else BLUE); c.circle(x,y,4,fill=1,stroke=0); mono(c,x-12,y+31,num,8,MUTED); text(c,x-22,y-42,title,13,INK,"Helvetica-Bold"); paragraph(c,x-22,y-58,desc,130,8.5,12,MUTED)
        if i==1: mono(c,x-38,y+55,"MEASURE",8,ORANGE)
    c.setFillColor(PANEL); c.setStrokeColor(LINE); c.roundRect(650, 330, 230, 78, 8, fill=1, stroke=1); mono(c,670,384,"OPERATING PRINCIPLE",8,ORANGE); paragraph(c,670,360,"Baseline before intervention. Comparable evidence before claims.",190,10.5,15,INK)
    footer(c)


def page_close(c):
    bg(c); header(c, "05 / PRODUCT MAP", 5)
    text(c, 48, 426, "Built for the real world.", 34, INK, "Helvetica-Bold")
    paragraph(c, 48, 380, "Noema helps systems understand. Soma helps them act. Together they form a path from data to meaning, and from meaning to movement.", 570, 15, 22, MUTED)
    node(c, 48, 166, 380, 145, "Noema / the intelligence layer", "Multimodal understanding\nGrounded reasoning\nAgentic planning\nEvaluated decisions", BLUE)
    node(c, 532, 166, 380, 145, "Soma / the embodiment layer", "Vision, depth and touch\nEdge intelligence\nSafe control\nHumanoid action", ORANGE)
    arrow(c, 430, 239, 532, 239, INK, 1.4)
    mono(c, 438, 258, "UNDERSTAND", 8, BLUE); mono(c, 470, 214, "EMBODY", 8, ORANGE)
    text(c, 48, 102, "Build AI for production.", 25, INK, "Helvetica-Bold"); text(c, 48, 70, "Explore the product direction at curiousdevs.com", 12, MUTED)
    pill(c, 728, 70, "Start a conversation", ORANGE)
    footer(c, "CURIOUSDEVS / PRODUCT OVERVIEW")


def build():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    c = canvas.Canvas(OUT, pagesize=(W,H), pageCompression=1)
    c.setTitle("CuriousDevs Product Overview 2026")
    c.setAuthor("CuriousDevs")
    for fn in (page_cover, page_noema, page_soma, page_stack, page_workflow, page_close):
        fn(c); c.showPage()
    c.save()
    print(OUT)


if __name__ == "__main__": build()
