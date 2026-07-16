from sqlalchemy import Column, Integer, String, Text, LargeBinary, ForeignKey, DateTime
from sqlalchemy.sql import func
from src.database import Base

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    data = Column(LargeBinary, nullable=False)  # 画像バイナリデータ
    mime_type = Column(String(100), nullable=False)  # "image/jpeg", "image/png" など
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, default="まゆこ")
    title = Column(String(200), nullable=False)
    bio = Column(Text, nullable=False)
    avatar_image_id = Column(Integer, ForeignKey("images.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    tech_stack = Column(String(500), nullable=False)  # 例: "Next.js, FastAPI, PostgreSQL"
    image_id = Column(Integer, ForeignKey("images.id", ondelete="SET NULL"), nullable=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)  # "frontend", "backend", "tool" 等
    level = Column(Integer, default=3)  # 1〜5
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
