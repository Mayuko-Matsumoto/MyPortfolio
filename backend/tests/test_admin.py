import pytest
from fastapi import HTTPException
from src.firebase_auth import verify_firebase_token
from src.main import app

def test_update_profile_unauthorized(client, seed_profile):
    """ケースC: 認証ヘッダーなしの場合、401エラーになること"""
    # 依存関係をオーバーライド（トークンなしのモック）
    async def mock_verify_no_token():
        raise HTTPException(
            status_code=401,
            detail="認証トークンが提供されていません。",
        )
    app.dependency_overrides[verify_firebase_token] = mock_verify_no_token

    try:
        response = client.put(
            "/api/profile",
            json={"title": "最強ギャルエンジニア", "bio": "世界を救うで☆"}
        )
        assert response.status_code == 401
        assert response.json()["detail"] == "認証トークンが提供されていません。"
    finally:
        app.dependency_overrides.pop(verify_firebase_token, None)


def test_update_profile_forbidden_non_admin(client, seed_profile):
    """ケースB: ログインはしているが、管理者ではないユーザーの場合、404を返すこと（隠蔽ガード）"""
    # 依存関係をオーバーライド（一般ユーザーのモック。管理者UIDリストに含まれないため404エラーをスロー）
    async def mock_verify_non_admin():
        raise HTTPException(status_code=404, detail="Not Found")
    app.dependency_overrides[verify_firebase_token] = mock_verify_non_admin

    try:
        response = client.put(
            "/api/profile",
            json={"title": "ハッカー", "bio": "侵入したで"}
        )
        assert response.status_code == 404
        assert response.json()["detail"] == "Not Found"
    finally:
        app.dependency_overrides.pop(verify_firebase_token, None)


def test_update_profile_authorized_admin(client, seed_profile, db_session):
    """ケースA: 管理者ユーザーの場合、200 OKで更新が成功し、DBの中身も変わること"""
    # 依存関係をオーバーライド（管理者UIDのモック）
    async def mock_verify_admin():
        return {"uid": "admin_uid_example", "email": "admin@example.com"}
    app.dependency_overrides[verify_firebase_token] = mock_verify_admin

    try:
        response = client.put(
            "/api/profile",
            json={"title": "最強ギャルエンジニア", "bio": "世界を救うで☆"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "最強ギャルエンジニア"
        assert data["bio"] == "世界を救うで☆"

        # DBの中身も実際に変わっているか確認
        from src.models import Profile
        db_profile = db_session.query(Profile).first()
        assert db_profile.title == "最強ギャルエンジニア"
        assert db_profile.bio == "世界を救うで☆"
    finally:
        app.dependency_overrides.pop(verify_firebase_token, None)
