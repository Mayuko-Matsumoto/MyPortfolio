import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# PostgreSQLへの接続URL
# Dockerコンテナ内からは db:5432、ローカルホストからは localhost:5432
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/portfolio_db")

# データベースエンジンの作成
engine = create_engine(DATABASE_URL)

# データベース操作をするためのセッションを作るクラス
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# すべてのモデルが引き継ぐベースクラス
Base = declarative_base()

# FastAPIに「データベースセッション」を安全に手渡すための関数（DI用）
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
