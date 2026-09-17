"""Valida o token do Instagram e resolve a conta conectada — sem nunca imprimir o token.

Uso:
    python3 check_setup.py
"""
import os
import sys
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

GRAPH_HOST = "https://graph.instagram.com"
API_VERSION = "v21.0"


def main() -> None:
    token = os.environ.get("INSTAGRAM_ACCESS_TOKEN")
    if not token:
        sys.exit(
            "INSTAGRAM_ACCESS_TOKEN não encontrado em social-media/.env — "
            "veja docs/POC.md para como gerar e colar o token localmente."
        )

    resp = requests.get(
        f"{GRAPH_HOST}/{API_VERSION}/me",
        params={"fields": "id,username,account_type", "access_token": token},
        timeout=15,
    )
    if resp.status_code != 200:
        detail = resp.json().get("error", {}).get("message", resp.text)
        sys.exit(f"Token inválido ou sem permissão (HTTP {resp.status_code}): {detail}")

    data = resp.json()
    print("Token válido. Conta resolvida:")
    print(f"  id: {data.get('id')}")
    print(f"  username: {data.get('username')}")
    print(f"  account_type: {data.get('account_type')}")

    limit_resp = requests.get(
        f"{GRAPH_HOST}/{API_VERSION}/{data['id']}/content_publishing_limit",
        params={"access_token": token},
        timeout=15,
    )
    if limit_resp.status_code == 200:
        print(f"  limite de publicação (24h): {limit_resp.json()}")
    else:
        print("  (não foi possível checar o limite de publicação agora — não é bloqueante)")


if __name__ == "__main__":
    main()
