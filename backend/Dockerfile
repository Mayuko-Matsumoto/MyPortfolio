FROM python:3.12-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# uv.lock はまだ生成されていないかもしれないので、まずは pyproject.toml をコピーしてロックファイルを生成
COPY pyproject.toml ./

# 仮想環境を作らずに直接グローバルにインストールする設定
ENV UV_PROJECT_ENVIRONMENT=/usr/local

# 依存関係をインストール
RUN uv pip install --system -r pyproject.toml

COPY . .

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
