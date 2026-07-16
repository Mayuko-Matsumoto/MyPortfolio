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

        avatar_id = upload_image("assets/my-photo.jpeg", "../frontend/public/my-photo.jpeg", "image/jpeg")
        kakeibo_img_id = upload_image("assets/kakeibo-image.png", "../frontend/public/kakeibo-image.png", "image/png")
        portfolio_img_id = upload_image("assets/portfolio-image.png", "../frontend/public/portfolio-image.png", "image/png")

        # 2. プロフィールの登録
        profile = Profile(
            name="まゆこ",
            title="Ms.Engineerのコーディングブートキャンプに参加し転職を目指している",
            bio="数年前、某地域密着型ポータルサイトの営業職をしており、店舗様の思いやアピールしたいことをWebで発信し、見てもらいやすくする（SEO）提案をしており、Web業界に興味がありました。その職を離れることになりましたが心残りがあり、スクールで勉強する決意をしました。",
            avatar_image_id=avatar_id
        )
        db.add(profile)
        db.commit()
        print("Created profile.")

        # 3. 実績の登録
        ach1 = Achievement(
            title="家計簿アプリ",
            description="生活の中で発生する支出を管理・分析できる、FastAPIとNext.jsを統合したモノレポ構成のWebアプリケーション。Mastraを用いた高度なAI対話・分析機能を備えています。",
            tech_stack="Next.js, TypeScript, TailwindCSS, shadcn/ui, Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic, Mastra",
            image_id=kakeibo_img_id,
            order=1
        )
        ach2 = Achievement(
            title="認証機能付きポートフォリオサイト",
            description="Firebase認証付きのマイページ管理機能と自己紹介チャットボットを搭載したポートフォリオ。",
            tech_stack="Next.js, FastAPI, Mastra, PostgreSQL, TailwindCSS, shadcn/ui, Firebase",
            image_id=portfolio_img_id,
            order=2
        )
        db.add_all([ach1, ach2])
        db.commit()
        print("Created achievements.")

        # 4. スキルの登録
        skills_data = [
            # フロントエンド
            {"name": "HTML/CSS", "category": "frontend", "level": 4, "order": 1},
            {"name": "JavaScript", "category": "frontend", "level": 4, "order": 2},
            {"name": "TypeScript", "category": "frontend", "level": 3, "order": 3},
            {"name": "React", "category": "frontend", "level": 4, "order": 4},
            {"name": "Next.js", "category": "frontend", "level": 3, "order": 5},
            {"name": "TailwindCSS", "category": "frontend", "level": 4, "order": 6},
            # バックエンド
            {"name": "Python", "category": "backend", "level": 3, "order": 7},
            {"name": "FastAPI", "category": "backend", "level": 3, "order": 8},
            {"name": "Node.js", "category": "backend", "level": 3, "order": 9},
            {"name": "PostgreSQL", "category": "backend", "level": 3, "order": 10},
            {"name": "MySQL", "category": "backend", "level": 3, "order": 11},
            {"name": "Prisma", "category": "backend", "level": 3, "order": 12},
            # ツール・インフラ
            {"name": "Docker", "category": "tool", "level": 3, "order": 13},
            {"name": "AWS", "category": "tool", "level": 2, "order": 14},
            {"name": "GitHub", "category": "tool", "level": 4, "order": 15},
            {"name": "AI活用", "category": "tool", "level": 5, "order": 16},
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
