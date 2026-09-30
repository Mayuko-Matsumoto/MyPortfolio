import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from src.database import get_db
from src import crud, schemas

router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])

def send_inquiry_email(name: str, email: str, message: str):
    mail_username = os.getenv("MAIL_USERNAME")
    mail_password = os.getenv("MAIL_PASSWORD")
    mail_to = os.getenv("MAIL_TO", mail_username)

    if not mail_username or not mail_password:
        print("Mail credentials not configured. Skipping email notification.")
        return

    try:
        msg = MIMEMultipart()
        msg['Subject'] = f"【ポートフォリオ通知】{name}様よりお問い合わせが届きました"
        msg['From'] = mail_username
        msg['To'] = mail_to

        body = f"""ポートフォリオサイトから新しいお問い合わせが届きました。

----------------------------------------
■ 送信者情報
お名前: {name}
メールアドレス: {email}

■ お問い合わせ内容
{message}
----------------------------------------
"""
        msg.attach(MIMEText(body, 'plain', 'utf-8'))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(mail_username, mail_password)
            server.send_message(msg)
        print(f"Inquiry notification email sent successfully to {mail_to}")
    except Exception as e:
        print(f"Failed to send inquiry email: {e}")

@router.post("", response_model=schemas.InquirySchema)
def create_inquiry(
    inquiry: schemas.InquiryCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    result = crud.create_inquiry(
        db,
        name=inquiry.name,
        email=inquiry.email,
        message=inquiry.message
    )
    background_tasks.add_task(
        send_inquiry_email,
        name=inquiry.name,
        email=inquiry.email,
        message=inquiry.message
    )
    return result
