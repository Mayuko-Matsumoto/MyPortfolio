from sqlalchemy.orm import Session
from src.models import Image, Profile, Achievement, Skill, Inquiry

# --- Profile ---
def get_profile(db: Session):
    return db.query(Profile).first()

def update_profile(db: Session, title: str | None = None, bio: str | None = None, avatar_image_id: int | None = None):
    profile = get_profile(db)
    if not profile:
        profile = Profile(name="まゆこ", title=title or "", bio=bio or "", avatar_image_id=avatar_image_id)
        db.add(profile)
    else:
        if title is not None:
            profile.title = title
        if bio is not None:
            profile.bio = bio
        if avatar_image_id is not None:
            profile.avatar_image_id = avatar_image_id
    db.commit()
    db.refresh(profile)
    return profile

# --- Achievements ---
def get_achievements(db: Session):
    return db.query(Achievement).order_by(Achievement.order.asc()).all()

def create_achievement(db: Session, title: str, description: str, tech_stack: str, image_id: int = None, order: int = 0):
    db_ach = Achievement(
        title=title,
        description=description,
        tech_stack=tech_stack,
        image_id=image_id,
        order=order
    )
    db.add(db_ach)
    db.commit()
    db.refresh(db_ach)
    return db_ach

def update_achievement(db: Session, ach_id: int, title: str | None = None, description: str | None = None, tech_stack: str | None = None, image_id: int | None = None, order: int | None = None):
    db_ach = db.query(Achievement).filter(Achievement.id == ach_id).first()
    if db_ach:
        if title is not None:
            db_ach.title = title
        if description is not None:
            db_ach.description = description
        if tech_stack is not None:
            db_ach.tech_stack = tech_stack
        if image_id is not None:
            db_ach.image_id = image_id
        if order is not None:
            db_ach.order = order
        db.commit()
        db.refresh(db_ach)
    return db_ach

def delete_achievement(db: Session, ach_id: int):
    db_ach = db.query(Achievement).filter(Achievement.id == ach_id).first()
    if db_ach:
        db.delete(db_ach)
        db.commit()
        return True
    return False

# --- Skills ---
def get_skills(db: Session):
    return db.query(Skill).order_by(Skill.order.asc()).all()

def create_skill(db: Session, name: str, category: str, level: int, order: int = 0):
    db_skill = Skill(name=name, category=category, level=level, order=order)
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def update_skill(db: Session, skill_id: int, name: str | None = None, category: str | None = None, level: int | None = None, order: int | None = None):
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if db_skill:
        if name is not None:
            db_skill.name = name
        if category is not None:
            db_skill.category = category
        if level is not None:
            db_skill.level = level
        if order is not None:
            db_skill.order = order
        db.commit()
        db.refresh(db_skill)
    return db_skill

def delete_skill(db: Session, skill_id: int):
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if db_skill:
        db.delete(db_skill)
        db.commit()
        return True
    return False

# --- Inquiries ---
def create_inquiry(db: Session, name: str, email: str, message: str):
    db_inq = Inquiry(name=name, email=email, message=message)
    db.add(db_inq)
    db.commit()
    db.refresh(db_inq)
    return db_inq

# --- Images ---
def get_image(db: Session, image_id: int):
    return db.query(Image).filter(Image.id == image_id).first()

def create_image(db: Session, filename: str, data: bytes, mime_type: str):
    db_img = Image(filename=filename, data=data, mime_type=mime_type)
    db.add(db_img)
    db.commit()
    db.refresh(db_img)
    return db_img
