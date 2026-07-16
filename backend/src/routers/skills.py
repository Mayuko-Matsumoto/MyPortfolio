from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.database import get_db
from src import crud, schemas
from src.firebase_auth import verify_firebase_token

router = APIRouter(prefix="/api/skills", tags=["Skills"])

@router.get("", response_model=List[schemas.SkillSchema])
def get_skills(db: Session = Depends(get_db)):
    return crud.get_skills(db)

@router.post("", response_model=schemas.SkillSchema)
def create_skill(
    data: schemas.SkillCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_firebase_token),
):
    return crud.create_skill(db, name=data.name, category=data.category, level=data.level, order=data.order)

@router.put("/{skill_id}", response_model=schemas.SkillSchema)
def update_skill(
    skill_id: int,
    data: schemas.SkillUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_firebase_token),
):
    db_skill = crud.update_skill(db, skill_id=skill_id, name=data.name, category=data.category, level=data.level, order=data.order)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return db_skill

@router.delete("/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(verify_firebase_token),
):
    success = crud.delete_skill(db, skill_id)
    if not success:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"ok": True}
