from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# --- Image ---
class ImageBase(BaseModel):
    filename: str
    mime_type: str

class ImageSchema(ImageBase):
    id: int
    created_at: datetime

# --- Profile ---
class ProfileBase(BaseModel):
    name: str
    title: str
    bio: str
    avatar_image_id: Optional[int] = None

class ProfileSchema(ProfileBase):
    id: int
    avatar_url: Optional[str] = None  # フロントエンドで直接使える画像のURL
    created_at: datetime
    updated_at: datetime

class ProfileUpdate(BaseModel):
    """プロフィール更新専用スキーマ（省略フィールドは既存値を維持）"""
    title: Optional[str] = None
    bio: Optional[str] = None
    avatar_image_id: Optional[int] = None

# --- Achievement ---
class AchievementBase(BaseModel):
    title: str
    description: str
    tech_stack: str
    image_id: Optional[int] = None
    order: int = 0

class AchievementSchema(AchievementBase):
    id: int
    image_url: Optional[str] = None  # フロントエンドで直接使える画像のURL
    created_at: datetime
    updated_at: datetime

class AchievementCreate(BaseModel):
    """実績作成用スキーマ（全フィールド必須）"""
    title: str
    description: str
    tech_stack: str
    image_id: Optional[int] = None
    order: int = 0

class AchievementUpdate(BaseModel):
    """実績更新専用スキーマ（省略フィールドは既存値を維持）"""
    title: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    image_id: Optional[int] = None
    order: Optional[int] = None

# --- Skill ---
class SkillBase(BaseModel):
    name: str
    category: str
    level: int
    order: int = 0

class SkillSchema(SkillBase):
    id: int
    created_at: datetime

class SkillCreate(BaseModel):
    """スキル作成用スキーマ（全フィールド必須）"""
    name: str
    category: str
    level: int
    order: int = 0

class SkillUpdate(BaseModel):
    """スキル更新専用スキーマ（省略フィールドは既存値を維持）"""
    name: Optional[str] = None
    category: Optional[str] = None
    level: Optional[int] = None
    order: Optional[int] = None

# --- Inquiry ---
class InquiryCreate(BaseModel):
    name: str
    email: str
    message: str

class InquirySchema(InquiryCreate):
    id: int
    created_at: datetime

