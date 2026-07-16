from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src import crud, schemas

router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])

@router.post("", response_model=schemas.InquirySchema)
def create_inquiry(inquiry: schemas.InquiryCreate, db: Session = Depends(get_db)):
    return crud.create_inquiry(
        db,
        name=inquiry.name,
        email=inquiry.email,
        message=inquiry.message
    )
