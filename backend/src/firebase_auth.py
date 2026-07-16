"""
Firebase Admin SDK を使ったサーバー側トークン検証モジュール。
管理者向けエンドポイントの Depends() に使用する。
"""
import os
import firebase_admin
from firebase_admin import auth, credentials
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Firebase Admin SDKの初期化（既に初期化済みの場合はスキップ）
_firebase_initialized = False

def _init_firebase():
    global _firebase_initialized
    if _firebase_initialized:
        return
    # 環境変数からサービスアカウントを使うか、ADCを使うか判断
    service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY")
    if service_account_path and os.path.exists(service_account_path):
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred)
    else:
        # 環境変数から個別の値を読み込む方法（Dockerでの利用を想定）
        project_id = os.getenv("FIREBASE_PROJECT_ID")
        if not project_id:
            raise RuntimeError(
                "Firebase の設定が見つかりません。"
                "FIREBASE_PROJECT_ID 環境変数を設定してください。"
            )
        firebase_admin.initialize_app(options={"projectId": project_id})
    _firebase_initialized = True


def _get_admin_uids() -> set[str]:
    """
    環境変数 ADMIN_UIDS から許可する Firebase UID のセットを取得する。
    カンマ区切りで複数指定可能。例: ADMIN_UIDS=uid1,uid2
    """
    raw = os.getenv("ADMIN_UIDS", "")
    return {uid.strip() for uid in raw.split(",") if uid.strip()}


_bearer_scheme = HTTPBearer(auto_error=False)


async def verify_firebase_token(
    credentials: HTTPAuthorizationCredentials = Security(_bearer_scheme),
) -> dict:
    """
    Authorization: Bearer <Firebase IDトークン> ヘッダーを検証し、
    さらに ADMIN_UIDS に含まれる管理者 UID かどうかを確認する依存関係。
    有効な管理者トークンであれば decoded_token (dict) を返す。
    無効・未提供・管理者でない場合は適切なHTTPエラーを返す。
    """
    _init_firebase()

    if credentials is None or not credentials.credentials:
        raise HTTPException(
            status_code=401,
            detail="認証トークンが提供されていません。",
        )

    try:
        decoded_token = auth.verify_id_token(credentials.credentials)
    except auth.ExpiredIdTokenError:
        raise HTTPException(status_code=401, detail="トークンの有効期限が切れています。再ログインしてください。")
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="無効な認証トークンです。")
    except Exception as e:
        print(f"Firebase token verification error: {e}")
        raise HTTPException(status_code=401, detail="認証に失敗しました。")

    # 管理者 UID チェック（ADMIN_UIDS が設定されている場合のみ適用）
    admin_uids = _get_admin_uids()
    if admin_uids:
        uid = decoded_token.get("uid", "")
        if uid not in admin_uids:
            print(f"Unauthorized admin access attempt by UID: {uid}")
            # 403ではなく404を返すことで管理画面の存在自体を隠蔽する
            raise HTTPException(status_code=404, detail="Not Found")

    return decoded_token

