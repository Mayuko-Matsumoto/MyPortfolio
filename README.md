# 🎟️ 認証機能付きポートフォリオサイト (松本 麻由子)

> **本番公開URL**: [https://mayuko-matsumoto.com](https://mayuko-matsumoto.com)  
> Next.js 16, FastAPI, Mastra (AI Agent), PostgreSQL を使用した、フルスタックでモダンなモノレポ構成のポートフォリオWebサイトです。  
> ビジュアルには **Y2K チケット風** のデザインシステムを独自に組み込み、遊び心と実用性を兼ね備えた体験を提供します。

---

## 🏗️ システムアーキテクチャ

本プロジェクトは Docker Compose を用いて各サービスを独立してコンテナ化しており、実務におけるマイクロサービスやモノレポ開発に近い設計思想で構築・AWS EC2 上で本番運用されています。

```mermaid
flowchart TD
    User([訪問者 / 採用担当者]) -->|HTTPS (443)| Nginx[Nginx Reverse Proxy / SSL]
    
    subgraph AWS EC2 [AWS EC2 Production Server]
        Nginx -->|リバースプロキシ| FE[Next.js 16 App Router\nポートフォリオ / 詳細LP]
        Nginx -->|/api/* 転送| BE[FastAPI Backend\nREST API]
        
        FE -->|クライアント対話| BE
        FE -->|認証・管理操作| Firebase[Firebase Authentication]
        
        BE -->|データ永続化 / 画像バイナリ| DB[(PostgreSQL 16)]
        BE -->|チャット転送| Mastra[Mastra AI Server\nAgent Framework]
        
        Mastra -->|コンテキスト読み込み| MD[prof.md\n自己紹介 & 就職希望条件]
        Mastra -->|推論| OpenAI[OpenAI API / gpt-5-mini]
    end
    
    classDef default fill:#fff,stroke:#1B2A5E,stroke-width:2px;
    classDef main fill:#FFF8E7,stroke:#FF9900,stroke-width:2px;
    class FE,BE,Mastra main;
```

---

## ⚡ 技術スタック

| レイヤー | 使用技術 / ライブラリ | 役割・選定理由 |
| :--- | :--- | :--- |
| **フロントエンド** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 | 最新スタックによる高速レンダリングと型安全性、統一感あるコンポーネント設計。 |
| **バックエンド** | Python 3.12, FastAPI, SQLAlchemy, Alembic | 高速な非同期 API 設計と、厳格な Pydantic バリデーション、安全なマイグレーション管理。 |
| **AI エージェント** | Mastra 1.16+, OpenAI SDK (`gpt-5-mini`), Node.js | エージェント駆動型ワークフロー。`prof.md` の動的インプットによる RAG 構造。 |
| **データベース** | PostgreSQL 16 | ACID トランザクションの信頼性、画像バイナリデータの安全な保持。 |
| **認証・認可** | Firebase Authentication, Firebase Admin SDK | セキュアなログイン認証と、環境変数 `ADMIN_UIDS` に基づく厳格な管理者認可ガード。 |
| **インフラ / 運用** | AWS EC2 (Ubuntu), Nginx (Let's Encrypt SSL), Docker, Docker Compose | 本番環境の完全コンテナ化による再現性担保と、セキュアなリバースプロキシ運用。 |

---

## 🌟 主な機能

### 1. Y2K チケット風トップページ
*   プロフィール、保有スキル一覧、制作実績一覧、お問い合わせフォームをシームレスに配置。
*   チケットの最終更新日時（`updated_at`）から自動でシリアルナンバー（`No. YYYY-MMDD`）を発行する遊び心のある UI。
*   各実績カードには使用技術バッジや GitHub / デモサイトへの外部リンクを完備。

### 2. ContextSwitch（コッチー）詳細LP (`/contextswitch`)
*   自身が企画・要件定義から実装、21名規模のユーザーテスト運用まで一気通貫で行った思考整理チャット「ContextSwitch」の特設技術詳細ページ。
*   **プレゼンスライド全11枚ビューア**: 画面上でスライド資料を快適に閲覧できるカルーセルUI。
*   **実機デモ動画プレイヤー**: iPhone フレームに埋め込んだ実機操作デモ動画（MP4）をスムーズに自動再生・確認可能。
*   **深掘り技術ドキュメント**: 「SimpleMem」客観記憶抽出と「Hindsight (pgvector)」連想検索のハイブリッド記憶構造、API コスト試算や B2B 展開を見据えた事業性検証データを網羅。

### 3. 専属 AI ギャルアシスタント「こゅまちゃむ」 (チャットボット)
*   Mastra AI を活用した対話型チャットウィジェットを画面右下に常設。
*   **ワンタップ質問ボタン**: 「経歴を教えて！」「得意なスキルは？」「希望の働き方は？」などのクイック質問チップを配置し、訪問者が迷わず対話可能。
*   **就職希望条件・キャリア観への回答**: ルート直下の `prof.md`（自己紹介シート）を同期読み込み。上京ハイブリッド勤務、自社開発/受託への志向、モダン技術へのこだわり、自立できる給与目安などを、愛嬌ある関西ギャル風の口調で的確にプレゼン。
*   **プロンプト安全制御**: 他の雇用形態を否定せず、前向きな意欲とチーム貢献姿勢を伝える厳格な振る舞いルールを適用。

### 4. セキュアなコンテンツ管理画面 (`/admin`)
*   **404 ステルスガード**: 未認証ユーザーが `/admin` にアクセスした場合、存在自体を秘匿するため `404 Not Found` を応答。
*   **二重の管理者認可 (UID 検証)**: バックエンド側で Firebase Admin SDK を用い、`ADMIN_UIDS` に登録された正規の管理者 UID のみ更新権限を許可。
*   **Partial Update (部分更新)**: プロフィール、実績、スキルの各情報を個別編集可能。未変更のフィールドは既存値を維持。
*   **バイナリ画像管理**: 画像を PostgreSQL 内に安全に格納し、アップロード時は即座にプレビュー表示。

---

## 📂 ディレクトリ構造

```
.
├── backend/                  # FastAPI バックエンド
│   ├── src/
│   │   ├── main.py           # アプリ初期化、CORS設定、ルーター統合
│   │   ├── routers/          # 機能別 API ルーターモジュール
│   │   │   ├── images.py     # 画像アップロード・取得
│   │   │   ├── profile.py    # プロフィール取得・更新
│   │   │   ├── achievements.py # 制作実績 CRUD
│   │   │   ├── skills.py       # スキル CRUD
│   │   │   ├── inquiries.py    # お問い合わせ送信
│   │   │   └── chat.py         # Mastra AI チャット中継
│   │   ├── crud.py           # DB 操作ロジック（Partial Update 実装）
│   │   ├── schemas.py        # Pydantic 入出力スキーマ
│   │   ├── models.py         # SQLAlchemy モデル定義
│   │   └── firebase_auth.py  # Firebase Token / UID 検証モジュール
│   └── pyproject.toml        # 依存パッケージ管理 (uv)
│
├── frontend/                 # Next.js 16 フロントエンド
│   ├── public/               # 静的アセット（スライド画像、デモ動画など）
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx      # メインポートフォリオページ
│   │   │   ├── contextswitch/ # ContextSwitch 詳細LP（スライド・動画）
│   │   │   ├── admin/        # 管理画面（タブ別コンポーネント構成）
│   │   │   └── login/        # 管理者ログイン画面
│   │   ├── components/       # 共通 UI・フィーチャーコンポーネント
│   │   │   ├── features/     # ChatWidget, AchievementsSection など
│   │   │   └── ui/           # チケット風共通コンポーネント
│   │   ├── hooks/            # カスタムフック (useChat, useAdminApi など)
│   │   └── services/         # API クライアント (api.ts)
│   └── package.json
│
├── mastra/                   # Mastra AI エージェントサーバー
│   └── src/mastra/agents/    # エージェント定義（portfolio-agent.ts）
│
├── prof.md                   # AIが読み込む自己紹介シート（経歴・実績・希望条件）
├── docker-compose.yml        # Docker コンテナ定義（DB, BE, FE, Mastra）
├── AGENTS.md                 # 開発・本番デプロイ運用ガイド
└── README.md
```

---

## 🛠️ ローカルセットアップ ＆ 起動手順

### 1. 環境変数の準備
プロジェクトのルート直下に `.env` ファイルを作成し、必要な設定を記述します。

```env
# AI API Key (Mastra)
OPENAI_API_KEY=your_openai_api_key

# データベース設定
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_db

# Firebase Configuration (フロントエンド用)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Firebase Configuration (バックエンド認証用)
FIREBASE_PROJECT_ID=your_firebase_project_id
ADMIN_UIDS=your_firebase_user_uid
FIREBASE_SERVICE_ACCOUNT_KEY=/app/firebase-key.json

# 本番デプロイ用 SSH 設定（ローカル参照用）
EC2_HOST=your_ec2_public_ip
EC2_USER=ubuntu
EC2_KEY_PATH=~/.ssh/your-key.pem
EC2_DIR=~/MyPortfolio
```

### 2. ローカル環境の起動
```bash
# 初回・ワンコマンドセットアップ（起動・マイグレーション・シードデータ投入を自動完遂）
./start.sh

# または通常起動
docker compose up -d --build
```

### 3. 動作確認 URL
*   ポートフォリオ トップ: `http://localhost:3000`
*   ContextSwitch 詳細LP: `http://localhost:3000/contextswitch`
*   管理画面ログイン: `http://localhost:3000/login`
*   FastAPI Swagger UI: `http://localhost:8000/docs`
*   Mastra Studio (AI デバッグ): `http://localhost:5678`

---

## 🚀 本番デプロイフロー (AWS EC2)

本プロジェクトの本番環境（EC2）へのデプロイは、以下の実務フローに沿って安全に実行します。

1. **GitHub へのプッシュ（フィーチャーブランチ & PR マージ）**:
   ```bash
   git checkout -b feature/your-feature
   git add . && git commit -m "feat: ..."
   git push -u origin feature/your-feature
   # GitHub 上で PR を作成・マージ後、ローカル main を最新化
   git checkout main && git pull origin main
   ```

2. **EC2 への SSH 接続 & コンテナ更新**:
   ```bash
   ssh -i <EC2_KEY_PATH> -o StrictHostKeyChecking=no <EC2_USER>@<EC2_HOST> \
     "cd <EC2_DIR> && git pull origin main && docker compose build frontend && docker compose up -d frontend && docker compose restart mastra"
   ```

---

## 💡 AI自己紹介データ (`prof.md`) の更新手順

AIエージェント「こゅまちゃむ」が参照する自己紹介データ（ルート直下の `prof.md`）を書き換えた際は、以下の手順で即座に反映されます。

1. **Mastra コンテナの再起動**:
   Mastra サーバーは起動時に `prof.md` をロードしてメモリに保持するため、更新後はコンテナを再起動します。
   ```bash
   docker compose restart mastra
   ```
2. **チャットの対話履歴をリセット**:
   画面上のチャットウィジェット右上にある「リセット」を行うことで、最新のプロフィール情報に基づいた新しい対話が開始されます。
