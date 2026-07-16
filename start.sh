#!/bin/bash

# エラーが発生したら即座にスクリプトを終了する
set -e

echo "🚀 ポートフォリオ開発環境を起動中..."

# 1. コンテナを起動
docker compose up -d

echo "⏳ データベースの起動を待っています..."
# postgresのhealthcheckがhealthyになるまで待つ
until [ "$(docker inspect -f '{{.State.Health.Status}}' portfolio_db 2>/dev/null)" == "healthy" ]; do
    printf "."
    sleep 1
done
echo " [OK]"

echo "⚙️  データベースマイグレーション（テーブル作成）を実行中..."
docker compose exec backend alembic upgrade head

echo "🌱 初期データ（シード）を投入中..."
docker compose exec backend python -m src.seed

echo "✨ 起動完了しました！以下のURLにアクセスしてください。"
echo "  - フロントエンド: http://localhost:3000"
echo "  - バックエンド (API Docs): http://localhost:8000/docs"
echo "  - Mastra Studio (AI Debug): http://localhost:5678"
