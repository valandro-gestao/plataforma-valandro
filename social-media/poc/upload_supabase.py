"""Sobe a imagem renderizada para o Supabase Storage e devolve uma signed URL pública.

A API do Instagram exige que a imagem esteja em uma URL pública no momento da
publicação (não aceita upload direto de arquivo local para fotos) — ver
docs/VALIDACAO_TECNICA.md §1. Uma signed URL de curta duração atende esse requisito
sem deixar o arquivo público permanentemente.

Uso:
    python3 upload_supabase.py [caminho/para/imagem.png]
"""
import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

SIGNED_URL_EXPIRY_SECONDS = 600  # suficiente para a Meta buscar a imagem


def upload_and_sign(file_path: Path, object_name: str) -> str:
    supabase_url = os.environ.get("SUPABASE_URL", "").rstrip("/")
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    bucket = os.environ.get("SUPABASE_STORAGE_BUCKET", "social-media-poc")

    if not supabase_url or not service_key:
        sys.exit(
            "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configurados em social-media/.env "
            "— crie o projeto Supabase (ver gap em docs/POC.md) antes deste passo."
        )

    upload_resp = requests.post(
        f"{supabase_url}/storage/v1/object/{bucket}/{object_name}",
        headers={
            "Authorization": f"Bearer {service_key}",
            "Content-Type": "image/png",
            "x-upsert": "true",
        },
        data=file_path.read_bytes(),
        timeout=30,
    )
    upload_resp.raise_for_status()

    sign_resp = requests.post(
        f"{supabase_url}/storage/v1/object/sign/{bucket}/{object_name}",
        headers={"Authorization": f"Bearer {service_key}"},
        json={"expiresIn": SIGNED_URL_EXPIRY_SECONDS},
        timeout=15,
    )
    sign_resp.raise_for_status()
    signed_path = sign_resp.json()["signedURL"]
    return f"{supabase_url}/storage/v1{signed_path}"


if __name__ == "__main__":
    default_path = Path(__file__).resolve().parent / "output" / "feed_post.png"
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else default_path
    if not path.exists():
        sys.exit(f"Arquivo não encontrado: {path} — rode render.py primeiro.")
    url = upload_and_sign(path, path.name)
    print(url)
