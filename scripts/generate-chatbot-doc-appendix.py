#!/usr/bin/env python3
"""Append AI Chatbot appendix to Portfolio-V1-Documentation.pdf"""

from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "Portfolio-V1-Documentation.pdf"
APPENDIX_PATH = ROOT / ".chatbot-doc-appendix.pdf"


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

    writeln("Appendix — AI Chatbot Update (July 8, 2026)", bold=True)
    writeln("Implements (with changes) roadmap item 9, 'AI Chatbot About Me', from Section 5 (page 18).")
    writeln("That roadmap entry suggested the Anthropic API; the shipped version uses OpenAI instead.")
    y -= 6

    writeln("Overview", bold=True)
    writeln("A floating 'ask-ai' button in the bottom-right corner opens a terminal-styled chat panel")
    writeln("(same macOS title bar, JetBrains Mono, and prompt styling as the Terminal section). Visitors")
    writeln("can hold a real conversation with an assistant grounded in the site's own content: it answers")
    writeln("questions about Raghav's bio, skills, projects, experience, education, certifications,")
    writeln("achievements and stats, handles reasonable general questions, politely declines anything")
    writeln("inappropriate for a portfolio, and never invents facts — unknowns are redirected to the")
    writeln("Contact section. Message history lives only in component state (nothing is persisted).")
    y -= 6

    writeln("New Files", bold=True)
    writeln("app/api/chat/route.js    Server-side Route Handler. Builds a context string from every", mono=True)
    writeln("                         export in data/portfolio.js (full-content injection into the", mono=True)
    writeln("                         system prompt — no embeddings/RAG; the site is small enough),", mono=True)
    writeln("                         then calls OpenAI (model gpt-4o-mini) with the API key read", mono=True)
    writeln("                         from process.env.OPENAI_API_KEY. The key never leaves the server.", mono=True)
    writeln("components/ChatWidget.jsx  Client widget: launcher button + chat panel, message list,", mono=True)
    writeln("                         loading indicator ('thinking' + blinking cursor), and visible", mono=True)
    writeln("                         error lines when a request fails. Lazy-loaded in app/page.js via", mono=True)
    writeln("                         dynamic(..., { ssr: false }), like Terminal and CommandPalette.", mono=True)
    writeln(".env.example             Committed template listing OPENAI_API_KEY= (empty).", mono=True)
    writeln(".env.local               NOT committed (gitignored) — holds the real key locally.", mono=True)
    y -= 6

    writeln("Environment Variable — Required Setup", bold=True)
    writeln("Anyone cloning the repo must create .env.local before the chatbot works:")
    writeln("  cp .env.example .env.local   # then paste your OpenAI key after OPENAI_API_KEY=", mono=True)
    writeln("Without the key the site still builds and runs; the chat endpoint returns a friendly")
    writeln("'not configured' message (HTTP 503). When deploying to Vercel (Section 6, item 5), add")
    writeln("OPENAI_API_KEY under Project Settings > Environment Variables.")
    writeln(".gitignore keeps ignoring every .env* file but now explicitly un-ignores .env.example.")
    y -= 6

    writeln("Abuse Guards & Error Handling", bold=True)
    writeln("Client: input capped at 500 characters, minimum 1.2s between sends, send disabled while a")
    writeln("reply is pending, only the last 12 turns are sent per request.")
    writeln("Server: message shape and length validated (max 1000 chars), per-IP in-memory rate limit")
    writeln("(10 requests/minute, HTTP 429), replies capped at 400 tokens, OpenAI errors mapped to")
    writeln("friendly JSON messages — nothing fails silently or leaks provider error details.")
    y -= 6

    writeln("Placement & Site Conventions", bold=True)
    writeln("Fixed bottom-right at z-index 45: under the mobile menu (50), Command Palette (60) and")
    writeln("custom cursor (100), so nothing is blocked; Ctrl+K still opens the palette above the chat.")
    writeln("Esc closes the panel like other overlays. Open/close animation is skipped when")
    writeln("prefers-reduced-motion is set (framer-motion useReducedMotion); remaining chrome uses")
    writeln("color-only hover transitions, safe on touch devices. Both themes use the existing CSS")
    writeln("variable tokens. No new npm dependencies were added — Section 1 (Tech Stack) is unchanged.")
    y -= 6

    writeln("Known Limitation", bold=True)
    writeln("data/portfolio.js still contains [PLACEHOLDER] content (see Section 3). The grounding is")
    writeln("injected as-is, but the system prompt instructs the assistant to treat placeholder-marked")
    writeln("fields as unpublished rather than repeat them. Filling in real content (Section 3 checklist)")
    writeln("automatically improves the chatbot's answers — no code changes needed.")
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
