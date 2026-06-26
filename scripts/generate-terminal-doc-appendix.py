#!/usr/bin/env python3
"""Append Terminal Update appendix to Portfolio-V1-Documentation.pdf"""

from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "Portfolio-V1-Documentation.pdf"
APPENDIX_PATH = ROOT / ".terminal-doc-appendix.pdf"


def build_appendix(path: Path) -> None:
    c = canvas.Canvas(str(path), pagesize=letter)
    width, height = letter
    left = 0.75 * inch
    y = height - 0.75 * inch
    line = 14

    def writeln(text: str, bold: bool = False, mono: bool = False) -> None:
        nonlocal y
        if y < 0.75 * inch:
            c.showPage()
            y = height - 0.75 * inch
        font = "Courier" if mono else ("Helvetica-Bold" if bold else "Helvetica")
        size = 9 if mono else 10
        c.setFont(font, size)
        c.drawString(left, y, text[:105])
        y -= line

    writeln("Appendix — Terminal Update (June 27, 2026)", bold=True)
    writeln("Supersedes the Interactive Terminal sections on pages 6, 11, and 12.")
    y -= 6
    writeln("Overview", bold=True)
    writeln("The terminal now behaves like a fake Unix filesystem. Commands are defined")
    writeln("as exact-match keys in data/portfolio.js → terminal.responses. The boot")
    writeln("sequence is unchanged: whoami, ls projects/, cat about.txt.")
    y -= 6
    writeln("Available Commands (type help)", bold=True)
    for cmd in [
        "help                show available commands",
        "whoami              who is this guy?",
        "pwd                 print working directory  →  /home/raghav/portfolio",
        "ls                  list directory contents (one entry per line)",
        "ls projects/        list project directories (one folder per line)",
        "tree                display directory tree (includes projects/ subtree)",
        "cat about.txt       display about information",
        "cat skills.txt      display technical skills",
        "cat experience.txt  display work experience",
        "cat contact.txt     display contact information",
        "cat projects.txt    display project summaries",
        "clear               clear the terminal",
        "exit                exit terminal",
    ]:
        writeln(cmd, mono=True)
    y -= 6
    writeln("Removed Commands", bold=True)
    writeln("These no longer work (return: bash: <cmd>: command not found):")
    for cmd in ["skills", "projects", "experience", "contact"]:
        writeln(f"  {cmd}", mono=True)
    y -= 6
    writeln("Fake Filesystem", bold=True)
    writeln("ls lists: about.txt, skills.txt, experience.txt, contact.txt,")
    writeln("projects.txt, projects/")
    writeln("tree expands projects/ with project-alpha/ … project-delta/")
    writeln("cat projects.txt shows detailed project lines; ls projects/ shows")
    writeln("folder names only — same split as a real shell.")
    y -= 6
    writeln("Implementation", bold=True)
    writeln("Files: data/portfolio.js (commands + output), components/Terminal.jsx")
    writeln("(runCommand lookup; unknown commands → bash: <cmd>: command not found)")
    writeln("No autocomplete, command history, or filesystem navigation logic.")
    c.save()


def merge_appendix() -> None:
    reader = PdfReader(str(PDF_PATH))
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    appendix = PdfReader(str(APPENDIX_PATH))
    for page in appendix.pages:
        writer.add_page(page)
    with PDF_PATH.open("wb") as f:
        writer.write(f)
    APPENDIX_PATH.unlink(missing_ok=True)


if __name__ == "__main__":
    build_appendix(APPENDIX_PATH)
    merge_appendix()
    print(f"Updated {PDF_PATH}")
