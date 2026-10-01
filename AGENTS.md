# AGENTS.md - MyPortfolio 開発・デプロイガイド

## 🚀 本番デプロイフロー (EC2)
本プロジェクトの本番環境デプロイを行う際は、以下の手順に従ってください。

1. **環境変数の参照**:
   ルート直下の `.env` ファイルに定義された以下のSSH接続設定を参照して実行すること。秘密情報（IPアドレスや鍵パス）はリポジトリ（このファイル）には直接書き込まず、`.env` から取得する。
   - `EC2_HOST`: EC2のパブリックIPまたはドメイン
   - `EC2_USER`: SSHログインユーザー名
   - `EC2_KEY_PATH`: SSH秘密鍵のローカルパス
   - `EC2_DIR`: EC2上のリポジトリディレクトリ

2. **デプロイ手順**:
   - ローカルの変更を `main` ブランチにコミット＆プッシュ:
     ```bash
     git add . && git commit -m "..." && git push origin main
     ```
   - SSH経由でEC2上のコード同期およびコンテナ再構築・起動:
     ```bash
     ssh -i <EC2_KEY_PATH> -o StrictHostKeyChecking=no <EC2_USER>@<EC2_HOST> "cd <EC2_DIR> && git pull origin main && docker compose build frontend backend && docker compose up -d"
     ```
   - （必要に応じて）データベースの初期データ・シード更新:
     ```bash
     ssh -i <EC2_KEY_PATH> -o StrictHostKeyChecking=no <EC2_USER>@<EC2_HOST> "cd <EC2_DIR> && docker compose exec -T backend python -m src.seed"
     ```

## 🛠️ 技術スタック & 構成
- **フロントエンド**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **バックエンド**: FastAPI, Python 3.12, SQLAlchemy, Alembic
- **AIエージェント**: Mastra, OpenAI API (`prof.md` をインプット)
- **データベース**: PostgreSQL 16
