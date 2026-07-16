from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.database import get_db
from src import crud, schemas
from src.firebase_auth import verify_firebase_token

router = APIRouter(prefix="/api/achievements", tags=["Achievements"])

@router.get("", response_model=List[schemas.AchievementSchema])
def get_achievements(db: Session = Depends(get_db)):
    db_achievements = crud.get_achievements(db)
    results = []
    for ach in db_achievements:
        image_url = f"/api/images/{ach.image_id}" if ach.image_id else None
        results.append(schemas.AchievementSchema(
            id=ach.id,
            title=ach.title,
            description=ach.description,
            tech_stack=ach.tech_stack,
            image_id=ach.image_id,
            image_url=image_url,
            order=ach.order,
            created_at=ach.created_at,
            updated_at=ach.updated_at
        ))
    return results

@router.post("", response_model=schemas.AchievementSchema)
def create_achievement(
    data: schemas.AchievementCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_firebase_token),
):
    db_ach = crud.create_achievement(db, title=data.title, description=data.description, tech_stack=data.tech_stack, image_id=data.image_id, order=data.order)
    image_url = f"/api/images/{db_ach.image_id}" if db_ach.image_id else None
    return schemas.AchievementSchema(
        id=db_ach.id, title=db_ach.title, description=db_ach.description,
        tech_stack=db_ach.tech_stack, image_id=db_ach.image_id, image_url=image_url,
        order=db_ach.order, created_at=db_ach.created_at, updated_at=db_ach.updated_at
    )

@router.put("/{ach_id}", response_model=schemas.AchievementSchema)
def update_achievement(
    ach_id: int,
    data: schemas.AchievementUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_firebase_token),
):
    db_ach = crud.update_achievement(db, ach_id=ach_id, title=data.title, description=data.description, tech_stack=data.tech_stack, image_id=data.image_id, order=data.order)
    if not db_ach:
        raise HTTPException(status_code=404, detail="Achievement not found")
    image_url = f"/api/images/{db_ach.image_id}" if db_ach.image_id else None
    return schemas.AchievementSchema(
        id=db_ach.id, title=db_ach.title, description=db_ach.description,
        tech_stack=db_ach.tech_stack, image_id=db_ach.image_id, image_url=image_url,
        order=db_ach.order, created_at=db_ach.created_at, updated_at=db_ach.updated_at
    )

@router.delete("/{ach_id}")
def delete_achievement(
    ach_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_firebase_token),
):
    success = crud.delete_achievement(db, ach_id)
    if not success:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return {"ok": True}
