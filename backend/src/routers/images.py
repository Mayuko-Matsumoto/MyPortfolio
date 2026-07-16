from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response
from sqlalchemy.orm import Session
from src.database import get_db
from src import crud, schemas

router = APIRouter(prefix="/api/images", tags=["Images"])

# 許可する画像MIMEタイプ
ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
# 最大ファイルサイズ (5MB)
MAX_FILE_SIZE = 5 * 1024 * 1024

@router.post("", response_model=schemas.ImageSchema)
def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # 1. MIMEタイプのチェック
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400, 
            detail="Only JPEG, PNG, GIF, and WebP images are allowed."
        )
        
    try:
        contents = file.file.read()
        # 2. ファイルサイズのチェック
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400, 
                detail="File size exceeds the limit of 5MB."
            )
            
        db_image = crud.create_image(
            db,
            filename=file.filename or "uploaded_image",
            data=contents,
            mime_type=file.content_type
        )
        return db_image
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {e}")

@router.get("/{image_id}")
def get_image(image_id: int, db: Session = Depends(get_db)):
    db_image = crud.get_image(db, image_id)
    if not db_image:
        raise HTTPException(status_code=404, detail="Image not found")
    return Response(content=db_image.data, media_type=db_image.mime_type)
