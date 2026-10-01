import os
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Skill, Achievement, Profile, Image

def seed_db():
    db = SessionLocal()
    try:
        # 既存データのクリア
        db.query(Skill).delete()
        db.query(Achievement).delete()
        db.query(Profile).delete()
        db.query(Image).delete()
        db.commit()

        print("Seeding database...")

        # ヘルパー関数：画像をDBに登録
        def upload_image(filename, fallback_path, mime_type):
            path = filename
            if not os.path.exists(path):
                path = fallback_path
            if os.path.exists(path):
                with open(path, "rb") as f:
                    data = f.read()
                img = Image(
                    filename=os.path.basename(filename),
                    data=data,
                    mime_type=mime_type
                )
                db.add(img)
                db.commit()
                db.refresh(img)
                print(f"Uploaded {filename}: ID {img.id}")
                return img.id
            else:
                print(f"Image {filename} not found.")
                return None

        avatar_id = upload_image("assets/my-image.png", "../frontend/public/my-image.png", "image/png")
        contextswitch_img_id = upload_image("assets/contextswitch-1.png", "../frontend/public/contextswitch-1.png", "image/png")
        inquiry_img_id = upload_image("assets/toiawase-app.png", "../frontend/public/toiawase-app.png", "image/png")
        oshikatsu_img_id = upload_image("assets/oshikatsu-app.png", "../frontend/public/oshikatsu-app.png", "image/png")
        portfolio_img_id = upload_image("assets/portfolio-app.png", "../frontend/public/portfolio-app.png", "image/png")

        # 2. プロフィールの登録
        profile = Profile(
            name="まゆこ",
            title="Ms.Engineerのコーディングブートキャンプ修了 / Webエンジニア志望",
            bio="これまでの広告営業やテクニカルサポートなどの顧客折衝経験で培ったヒアリング力・課題整理力と、個人・チーム開発で培った自走力を武器に、要件定義からモダンなフルスタック開発（Next.js / FastAPI / Go / Hono）、AIエージェント実装（Mastra / pgvector）までを自走して完遂します。",
            avatar_image_id=avatar_id
        )
        db.add(profile)
        db.commit()
        print("Created profile.")

        # 3. 実績の登録
        ach1 = Achievement(
            title="ContextSwitch（コッチー）",
            description="AIの記憶混ざりを防ぐ思考整理特化型チャットアプリ。客観記憶抽出「SimpleMem」とpgvector連想検索「Hindsight」のハイブリッド記憶構造を独自構築。実ユーザー21名のクローズドテスト運用・モデル比較検証を経て卒業発表会まで一貫完遂。",
            tech_stack="Next.js 16, TypeScript, Tailwind CSS v4, Hono, Supabase (pgvector), Drizzle ORM, Upstash Redis, Docker, OpenAI API, Stripe, Zod, Vitest",
            image_id=contextswitch_img_id,
            order=1
        )
        ach2 = Achievement(
            title="問い合わせ対応AIエージェントアプリ",
            description="不動産仲介業の問い合わせ対応を迅速化・品質平準化するため、能動的ヒアリングによる要件定義から、Mastraを用いたAI制御ロジックまでを一貫して構築した実務特化型Webアプリ。PIIマスキングやリスク判定ロジックを実装。",
            tech_stack="Next.js (App Router), TypeScript, Tailwind CSS, Mastra (AI Agent), OpenAI API, Prisma, SQLite, Firebase, Docker, Git",
            image_id=inquiry_img_id,
            order=2
        )
        ach3 = Achievement(
            title="推し活支援アプリ",
            description="推し活のイベントや予算管理を効率化し、推しカラー対応カレンダーやAI自動登録でファンのモチベーションを高めるWebアプリ。チーム開発にてGo (Gin) と GORM による高速なREST APIと厳格なエラーハンドリングを実装。",
            tech_stack="Go (Gin), GORM, PostgreSQL, Next.js, React, TypeScript, Tailwind CSS, Redis, Docker, Git",
            image_id=oshikatsu_img_id,
            order=3
        )
        ach4 = Achievement(
            title="認証機能付きポートフォリオサイト",
            description="Firebase Authenticationを用いたセキュアな認可チェックと、RAG自己紹介チャットボットを搭載したフルスタック・モノレポ構成のポートフォリオサイト（本作）。",
            tech_stack="Next.js, FastAPI, Mastra, PostgreSQL, SQLAlchemy, Alembic, Docker, AWS, Firebase",
            image_id=portfolio_img_id,
            order=4
        )
        db.add_all([ach1, ach2, ach3, ach4])
        db.commit()
        print("Created achievements.")

        # 4. スキルの登録
        skills_data = [
            # フロントエンド
            {"name": "HTML/CSS", "category": "frontend", "level": 4, "order": 1},
            {"name": "JavaScript", "category": "frontend", "level": 4, "order": 2},
            {"name": "TypeScript", "category": "frontend", "level": 4, "order": 3},
            {"name": "React", "category": "frontend", "level": 4, "order": 4},
            {"name": "Next.js", "category": "frontend", "level": 4, "order": 5},
            {"name": "TailwindCSS", "category": "frontend", "level": 4, "order": 6},
            # バックエンド
            {"name": "Python (FastAPI)", "category": "backend", "level": 3, "order": 7},
            {"name": "Go (Gin)", "category": "backend", "level": 3, "order": 8},
            {"name": "Node.js / Hono", "category": "backend", "level": 4, "order": 9},
            {"name": "PostgreSQL", "category": "backend", "level": 4, "order": 10},
            {"name": "Supabase (pgvector)", "category": "backend", "level": 4, "order": 11},
            {"name": "Prisma / Drizzle", "category": "backend", "level": 4, "order": 12},
            # ツール・インフラ・AI
            {"name": "Docker", "category": "tool", "level": 3, "order": 13},
            {"name": "AWS / Cloudflare", "category": "tool", "level": 3, "order": 14},
            {"name": "GitHub", "category": "tool", "level": 4, "order": 15},
            {"name": "Mastra (AI Agent)", "category": "tool", "level": 4, "order": 16},
            {"name": "OpenAI API / RAG", "category": "tool", "level": 5, "order": 17},
            {"name": "Firebase", "category": "tool", "level": 4, "order": 18},
        ]
        for s in skills_data:
            skill = Skill(
                name=s["name"],
                category=s["category"],
                level=s["level"],
                order=s["order"]
            )
            db.add(skill)
        db.commit()
        print("Created skills.")

        print("Database seeding completed successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error during seeding: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
