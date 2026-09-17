# PoC — Fase A (Instagram)

Escopo e checklist completos em [`../docs/POC.md`](../docs/POC.md). Este diretório é
deliberadamente descartável — não é a estrutura da aplicação final (ver
[`../docs/ARQUITETURA.md`](../docs/ARQUITETURA.md)).

## Passo a passo

```bash
cd social-media/poc
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
```

1. **Renderizar** (não precisa de nenhuma credencial):
   ```bash
   python3 render.py
   ```
   Gera `output/feed_post.png` a partir de `content/exemplo.json`.

2. **Validar o token do Instagram** (lê `../.env`, nunca imprime o token):
   ```bash
   python3 check_setup.py
   ```

3. **Hospedar a imagem** (precisa de um projeto Supabase — ver gap em `docs/POC.md`):
   ```bash
   python3 upload_supabase.py output/feed_post.png
   ```
   Imprime a signed URL pública.

4. **Aprovação humana** — obrigatória antes do passo 5. Não pule esta etapa.

5. **Publicar de verdade** (só depois de aprovação explícita):
   ```bash
   python3 publish_instagram.py "<signed_url_do_passo_3>" <(printf '%s' "<legenda aprovada>") --confirm
   ```
   Sem `--confirm`, o script recusa publicar.

## Segurança

Nenhum script aqui imprime, loga ou grava o token de acesso em lugar nenhum além de
lê-lo de `../.env` (que está no `.gitignore`). Nunca cole o token em um commit, em um
JSON de conteúdo, ou nesta conversa.
