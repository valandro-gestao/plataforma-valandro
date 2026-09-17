"""Publica uma imagem já aprovada no feed do Instagram (@valandrogestao).

Só deve ser executado depois de aprovação humana explícita da peça e da legenda
exatas — por isso a flag --confirm é obrigatória e não tem valor padrão. Este
script não decide nada sozinho: ele só executa uma publicação já decidida.

Uso:
    python3 publish_instagram.py <image_url> <caption_file> --confirm
"""
import argparse
import os
import sys
import time
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

GRAPH_HOST = "https://graph.instagram.com"
API_VERSION = "v21.0"


def get_ig_user_id(token: str) -> str:
    resp = requests.get(
        f"{GRAPH_HOST}/{API_VERSION}/me", params={"fields": "id", "access_token": token}, timeout=15
    )
    resp.raise_for_status()
    return resp.json()["id"]


def create_container(ig_id: str, token: str, image_url: str, caption: str) -> str:
    resp = requests.post(
        f"{GRAPH_HOST}/{API_VERSION}/{ig_id}/media",
        data={"image_url": image_url, "caption": caption, "access_token": token},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["id"]


def wait_until_ready(container_id: str, token: str, timeout_s: int = 60) -> None:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        resp = requests.get(
            f"{GRAPH_HOST}/{API_VERSION}/{container_id}",
            params={"fields": "status_code", "access_token": token},
            timeout=15,
        )
        resp.raise_for_status()
        status = resp.json().get("status_code")
        if status == "FINISHED":
            return
        if status == "ERROR":
            sys.exit("A Meta reportou erro ao processar o container de mídia.")
        time.sleep(2)
    sys.exit("Tempo esgotado esperando o container ficar pronto para publicar.")


def publish(ig_id: str, token: str, container_id: str) -> dict:
    resp = requests.post(
        f"{GRAPH_HOST}/{API_VERSION}/{ig_id}/media_publish",
        data={"creation_id": container_id, "access_token": token},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("image_url", help="URL pública (signed URL do Supabase) da imagem já aprovada")
    parser.add_argument("caption_file", help="Arquivo de texto com a legenda exata já aprovada")
    parser.add_argument(
        "--confirm",
        action="store_true",
        help="Obrigatório: confirma que a peça e a legenda foram aprovadas por um humano antes desta chamada",
    )
    args = parser.parse_args()

    if not args.confirm:
        sys.exit(
            "Publicação abortada: passe --confirm só depois de aprovação humana explícita "
            "da peça e da legenda exibidas."
        )

    token = os.environ.get("INSTAGRAM_ACCESS_TOKEN")
    if not token:
        sys.exit("INSTAGRAM_ACCESS_TOKEN não encontrado em social-media/.env")

    caption = Path(args.caption_file).read_text(encoding="utf-8").strip()

    ig_id = get_ig_user_id(token)
    container_id = create_container(ig_id, token, args.image_url, caption)
    wait_until_ready(container_id, token)
    result = publish(ig_id, token, container_id)
    print(f"Publicado com sucesso. ID da mídia: {result.get('id')}")


if __name__ == "__main__":
    main()
