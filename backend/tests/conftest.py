import os
import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

# テスト前に環境変数をモック
os.environ["ADMIN_UIDS"] = "admin_uid_example"
os.environ["FIREBASE_PROJECT_ID"] = "dummy-project-id"

from src.database import Base, get_db
from src.models import Profile, Skill, Achievement
from src.main import app

# テスト用のSQLiteデータベースの作成（インメモリ）
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_portfolio.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    # テスト開始時にテーブルを作成
    Base.metadata.create_all(bind=engine)
    yield
    # テスト終了時にテーブルを削除
    Base.metadata.drop_all(bind=engine)
    # テスト用のDBファイルを削除
    if os.path.exists("./test_portfolio.db"):
        os.remove("./test_portfolio.db")

@pytest.fixture
def db_session():
    """各テストケースごとにクリーンなセッションを提供し、終了後にロールバックする"""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    # 外部キー制約をSQLiteで有効化
    connection.execute(text("PRAGMA foreign_keys=ON"))

    yield session

    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(autouse=True)
def override_dependencies(db_session):
    """FastAPIの get_db 依存関係をテスト用セッションで上書きする"""
    def _override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _override_get_db
    yield
    # テスト終了後に元に戻す
    app.dependency_overrides.pop(get_db, None)

@pytest.fixture
def client():
    """FastAPIのテスト用クライアント"""
    with TestClient(app) as c:
        yield c

@pytest.fixture
def seed_profile(db_session):
    """初期プロフィールを投入するフィクスチャ"""
    profile = Profile(
        name="まゆこむ",
        title="Ms.Engineer受講生",
        bio="営業からWeb業界への転身を目指し爆走中！"
    )
    db_session.add(profile)
    db_session.commit()
    db_session.refresh(profile)
    return profile
