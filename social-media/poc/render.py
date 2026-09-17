"""Renderiza um conteúdo de teste como imagem de feed no padrão visual da Valandro (PoC — Fase A).

Não reaproveita o runtime dos exemplos `.dc.html` do Design System (feito para preview
interativo dentro da ferramenta de design) — consome só os tokens normativos
(`design-system/tokens/*.css`, `design-system/styles.css`, `design-system/assets/*`)
com um template HTML próprio, renderizado headless via Playwright.

Uso:
    python3 render.py [content.json] [output.png]
"""
import json
import sys
from pathlib import Path

from jinja2 import Environment, FileSystemLoader
from playwright.sync_api import sync_playwright

POC_DIR = Path(__file__).resolve().parent
DESIGN_SYSTEM_DIR = POC_DIR.parent.parent / "design-system"
CANVAS_SIZE = 1080


def render_html(content: dict) -> str:
    env = Environment(loader=FileSystemLoader(str(POC_DIR / "templates")))
    template = env.get_template("feed_post.html.jinja")
    return template.render(
        kicker=content.get("kicker", ""),
        headline=content["headline"],
        body=content["body"],
        styles_css=(DESIGN_SYSTEM_DIR / "styles.css").as_uri(),
        logo_white=(DESIGN_SYSTEM_DIR / "assets" / "logo-valandro-white.png").as_uri(),
        hex_pattern=(DESIGN_SYSTEM_DIR / "assets" / "hex-pattern.svg").as_uri(),
    )


def render_image(content_path: Path, output_path: Path) -> Path:
    content = json.loads(content_path.read_text(encoding="utf-8"))
    html = render_html(content)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    html_path = output_path.with_suffix(".html")
    html_path.write_text(html, encoding="utf-8")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": CANVAS_SIZE, "height": CANVAS_SIZE})
        page.goto(html_path.as_uri())
        page.wait_for_load_state("networkidle")
        page.screenshot(path=str(output_path))
        browser.close()

    return output_path


if __name__ == "__main__":
    content_arg = Path(sys.argv[1]) if len(sys.argv) > 1 else POC_DIR / "content" / "exemplo.json"
    output_arg = Path(sys.argv[2]) if len(sys.argv) > 2 else POC_DIR / "output" / "feed_post.png"
    result = render_image(content_arg, output_arg)
    print(f"Imagem renderizada em: {result}")
    print(f"HTML intermediário em: {result.with_suffix('.html')}")
