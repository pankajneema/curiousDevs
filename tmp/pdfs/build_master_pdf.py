from pathlib import Path
from html import escape
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Table,
    TableStyle,
    KeepTogether,
    ListFlowable,
    ListItem,
    Preformatted,
    NextPageTemplate,
)
from reportlab.pdfgen import canvas

ROOT = Path("/Users/mac/curiousDevs")
SOURCE = ROOT / "docs/CURIOUSDEVS_MASTER_DOCUMENT.md"
OUTPUT = ROOT / "output/pdf/CuriousDevs_Master_Document_2026.pdf"

NAVY = colors.HexColor("#07101b")
PAPER = colors.HexColor("#f5f0e7")
INK = colors.HexColor("#111b2b")
MUTED = colors.HexColor("#66717e")
ORANGE = colors.HexColor("#c65a08")
BLUE = colors.HexColor("#286b9b")
HAIR = colors.HexColor("#dcd4c8")
PALE = colors.HexColor("#ece5da")


def ascii_text(value):
    replacements = {
        "→": "->",
        "×": "x",
        "—": "-",
        "–": "-",
        "‑": "-",
        "·": " / ",
        "’": "'",
        "“": '"',
        "”": '"',
    }
    for source, target in replacements.items():
        value = value.replace(source, target)
    return value


def inline_markup(value):
    value = ascii_text(value)
    # Escape first, then restore a small, safe subset of Markdown formatting.
    value = escape(value, quote=False)
    value = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", value)
    value = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", value)
    value = re.sub(r"\[([^]]+)\]\(([^)]+)\)", r"<link href='\2' color='#286b9b'>\1</link>", value)
    return value


class MasterDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, pagesize=A4, **kwargs)
        width, height = A4
        frame = Frame(22 * mm, 22 * mm, width - 44 * mm, height - 43 * mm, id="normal")
        self.addPageTemplates([
            PageTemplate(id="cover", frames=frame, onPage=self.draw_cover_page),
            PageTemplate(id="body", frames=frame, onPage=self.draw_body_page),
        ])

    def draw_cover_page(self, c, doc):
        width, height = A4
        c.saveState()
        c.setFillColor(NAVY); c.rect(0, 0, width, height, fill=1, stroke=0)
        c.setStrokeColor(colors.HexColor("#1d2e42")); c.setLineWidth(0.35)
        for x in range(0, int(width) + 25, 25): c.line(x, 0, x, height)
        for y in range(0, int(height) + 25, 25): c.line(0, y, width, y)
        c.setStrokeColor(ORANGE); c.setLineWidth(1.4); c.line(22 * mm, height - 31 * mm, 54 * mm, height - 31 * mm)
        c.setFont("Courier", 8); c.setFillColor(ORANGE); c.drawString(22 * mm, height - 28 * mm, "CURIOUSDEVS / MASTER DOCUMENT")
        c.setFont("Helvetica-Bold", 36); c.setFillColor(colors.HexColor("#f4f0e9")); c.drawString(22 * mm, height - 88 * mm, "CuriousDevs")
        c.setFont("Helvetica", 23); c.setFillColor(ORANGE); c.drawString(22 * mm, height - 105 * mm, "From intelligence to action.")
        c.setFont("Helvetica", 13); c.setFillColor(colors.HexColor("#aab4c0"))
        lines = [
            "Company, product, technology, brand, and operating system.",
            "A single source of truth for the CuriousDevs direction.",
        ]
        for i, line in enumerate(lines): c.drawString(22 * mm, height - (125 + i * 8) * mm, line)
        # Compact system mark.
        cx, cy = width - 64 * mm, height - 102 * mm
        c.setStrokeColor(colors.HexColor("#3b5873")); c.setLineWidth(0.8)
        c.circle(cx, cy, 45 * mm, fill=0, stroke=1); c.circle(cx, cy, 31 * mm, fill=0, stroke=1)
        c.setStrokeColor(BLUE); c.arc(cx - 45 * mm, cy - 45 * mm, cx + 45 * mm, cy + 45 * mm, 20, 145)
        c.setStrokeColor(ORANGE); c.arc(cx - 45 * mm, cy - 45 * mm, cx + 45 * mm, cy + 45 * mm, 200, 120)
        c.setFillColor(BLUE); c.circle(cx - 15 * mm, cy, 10 * mm, fill=1, stroke=0)
        c.setFillColor(ORANGE); c.circle(cx + 15 * mm, cy, 10 * mm, fill=1, stroke=0)
        c.setStrokeColor(colors.white); c.setLineWidth(0.9); c.line(cx - 5 * mm, cy, cx + 5 * mm, cy)
        c.setFont("Courier", 8); c.setFillColor(colors.HexColor("#9ba4b0")); c.drawString(22 * mm, 31 * mm, "VERSION 1.0  /  SEPTEMBER 2026  /  CURRENT WORKING SYSTEM")
        c.restoreState()

    def draw_body_page(self, c, doc):
        width, height = A4
        c.saveState()
        c.setFillColor(PAPER); c.rect(0, 0, width, height, fill=1, stroke=0)
        c.setStrokeColor(HAIR); c.setLineWidth(0.5); c.line(22 * mm, height - 17 * mm, width - 22 * mm, height - 17 * mm)
        c.setFont("Courier", 7); c.setFillColor(ORANGE); c.drawString(22 * mm, height - 13 * mm, "CURIOUSDEVS / MASTER DOCUMENT")
        c.setFillColor(MUTED); c.drawRightString(width - 22 * mm, height - 13 * mm, f"{doc.page:02d}")
        c.setStrokeColor(HAIR); c.line(22 * mm, 15 * mm, width - 22 * mm, 15 * mm)
        c.setFont("Courier", 7); c.setFillColor(MUTED); c.drawString(22 * mm, 9 * mm, "BUILD AI FOR PRODUCTION")
        c.drawRightString(width - 22 * mm, 9 * mm, "CURIOUSDEVS")
        c.restoreState()


def styles():
    base = getSampleStyleSheet()
    return {
        "h1": ParagraphStyle("h1", parent=base["Heading1"], fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=INK, spaceBefore=16, spaceAfter=9, keepWithNext=True),
        "h2": ParagraphStyle("h2", parent=base["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=ORANGE, spaceBefore=13, spaceAfter=6, keepWithNext=True),
        "body": ParagraphStyle("body", parent=base["BodyText"], fontName="Helvetica", fontSize=9.7, leading=14, textColor=INK, spaceAfter=7),
        "lead": ParagraphStyle("lead", parent=base["BodyText"], fontName="Helvetica", fontSize=11.5, leading=17, textColor=INK, spaceAfter=12),
        "bullet": ParagraphStyle("bullet", parent=base["BodyText"], fontName="Helvetica", fontSize=9.4, leading=13.5, textColor=INK, leftIndent=5, firstLineIndent=0, spaceAfter=3),
        "small": ParagraphStyle("small", parent=base["BodyText"], fontName="Courier", fontSize=7.5, leading=10, textColor=MUTED),
        "table": ParagraphStyle("table", parent=base["BodyText"], fontName="Helvetica", fontSize=8.2, leading=11, textColor=INK),
        "table_head": ParagraphStyle("table_head", parent=base["BodyText"], fontName="Helvetica-Bold", fontSize=8.2, leading=11, textColor=INK),
        "code": ParagraphStyle("code", parent=base["Code"], fontName="Courier", fontSize=7.8, leading=10.5, textColor=INK, backColor=PALE, borderColor=HAIR, borderWidth=0.5, borderPadding=7),
    }


def parse_markdown(path, st):
    lines = path.read_text().splitlines()
    flow = []
    sections = []
    paragraph_lines = []
    bullets = []
    code_lines = []
    in_code = False
    i = 0

    def flush_paragraph():
        nonlocal paragraph_lines
        if paragraph_lines:
            value = " ".join(x.strip() for x in paragraph_lines).strip()
            if value:
                flow.append(Paragraph(inline_markup(value), st["lead"] if len(flow) < 2 else st["body"]))
            paragraph_lines = []

    def flush_bullets():
        nonlocal bullets
        if bullets:
            items = [ListItem(Paragraph(inline_markup(item), st["bullet"]), bulletColor=ORANGE) for item in bullets]
            flow.append(ListFlowable(items, bulletType="bullet", start="circle", leftIndent=12, bulletFontName="Helvetica", bulletFontSize=5, bulletOffsetY=2))
            flow.append(Spacer(1, 3))
            bullets = []

    def flush_code():
        nonlocal code_lines
        if code_lines:
            flow.append(Preformatted(ascii_text("\n".join(code_lines)), st["code"]))
            flow.append(Spacer(1, 6))
            code_lines = []

    while i < len(lines):
        raw = lines[i]
        line = raw.strip()
        if line.startswith("```"):
            flush_paragraph(); flush_bullets()
            if in_code: flush_code()
            in_code = not in_code; i += 1; continue
        if in_code:
            code_lines.append(raw); i += 1; continue
        if not line or line == "---":
            flush_paragraph(); flush_bullets(); i += 1; continue
        if line.startswith("|") and i + 1 < len(lines) and lines[i + 1].strip().startswith("|"):
            flush_paragraph(); flush_bullets()
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip()); i += 1
            if len(table_lines) >= 2:
                rows = []
                for row in table_lines:
                    cells = [cell.strip() for cell in row.strip("|").split("|")]
                    if all(set(cell) <= {"-", ":", " "} for cell in cells): continue
                    rows.append(cells)
                if rows:
                    data = [[Paragraph(inline_markup(cell), st["table_head"] if r == 0 else st["table"]) for cell in row] for r, row in enumerate(rows)]
                    widths = [None] * len(data[0])
                    total = 166 * mm
                    each = total / len(widths)
                    table = Table(data, colWidths=[each] * len(widths), repeatRows=1, hAlign="LEFT")
                    table.setStyle(TableStyle([
                        ("BACKGROUND", (0, 0), (-1, 0), PALE),
                        ("TEXTCOLOR", (0, 0), (-1, 0), INK),
                        ("GRID", (0, 0), (-1, -1), 0.35, HAIR),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 6),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                        ("TOPPADDING", (0, 0), (-1, -1), 6),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ]))
                    flow.append(table); flow.append(Spacer(1, 8))
            continue
        if line.startswith("# "):
            flush_paragraph(); flush_bullets(); i += 1; continue
        if line.startswith("## "):
            flush_paragraph(); flush_bullets(); title = line[3:].strip(); sections.append(title)
            flow.append(Paragraph(inline_markup(title), st["h1"])); i += 1; continue
        if line.startswith("### "):
            flush_paragraph(); flush_bullets(); flow.append(Paragraph(inline_markup(line[4:].strip()), st["h2"])); i += 1; continue
        if line.startswith("- "):
            flush_paragraph(); bullets.append(line[2:].strip()); i += 1; continue
        paragraph_lines.append(line); i += 1
    flush_paragraph(); flush_bullets(); flush_code()
    return sections, flow


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = MasterDocTemplate(str(OUTPUT), leftMargin=22 * mm, rightMargin=22 * mm, topMargin=22 * mm, bottomMargin=22 * mm, title="CuriousDevs Master Document 2026", author="CuriousDevs")
    st = styles()
    sections, body = parse_markdown(SOURCE, st)
    story = [NextPageTemplate("body"), PageBreak(), Paragraph("Contents", st["h1"])]
    story.append(Paragraph("A single reference for the CuriousDevs company story, services, technology areas, product directions, brand system, website, and operating rules.", st["lead"]))
    for idx, section in enumerate(sections, 1):
        story.append(Paragraph(f"{idx:02d}  {inline_markup(section)}", st["body"]))
    story.append(PageBreak())
    story.extend(body)
    doc.build(story)
    # Switch the first generated body page to the body template after the cover.
    print(OUTPUT)


if __name__ == "__main__":
    build()
