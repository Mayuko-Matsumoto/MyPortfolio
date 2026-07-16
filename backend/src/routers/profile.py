from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import get_db
from src import crud, schemas
from src.firebase_auth import verify_firebase_token

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("", response_model=schemas.ProfileSchema)
def get_profile(db: Session = Depends(get_db)):
    db_profile = crud.get_profile(db)
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    avatar_url = f"/api/images/{db_profile.avatar_image_id}" if db_profile.avatar_image_id else None
    return schemas.ProfileSchema(
        id=db_profile.id,
        name=db_profile.name,
        title=db_profile.title,
        bio=db_profile.bio,
        avatar_image_id=db_profile.avatar_image_id,
        avatar_url=avatar_url,
        created_at=db_profile.created_at,
        updated_at=db_profile.updated_at
    )

@router.put("", response_model=schemas.ProfileSchema)
def update_profile(
    data: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_firebase_token),
):
    db_profile = crud.update_profile(db, title=data.title, bio=data.bio, avatar_image_id=data.avatar_image_id)
    avatar_url = f"/api/images/{db_profile.avatar_image_id}" if db_profile.avatar_image_id else None
    return schemas.ProfileSchema(
        id=db_profile.id,
        name=db_profile.name,
        title=db_profile.title,
        bio=db_profile.bio,
        avatar_image_id=db_profile.avatar_image_id,
        avatar_url=avatar_url,
        created_at=db_profile.created_at,
        updated_at=db_profile.updated_at
    )
