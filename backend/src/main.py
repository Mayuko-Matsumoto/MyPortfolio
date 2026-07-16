from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from . import routers

app = FastAPI(title="Portfolio Backend API")

# CORS設定
origins = os.getenv("ALLOW_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Portfolio Backend API"}

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

# ルーターの登録
app.include_router(routers.images.router)
app.include_router(routers.profile.router)
app.include_router(routers.achievements.router)
app.include_router(routers.skills.router)
app.include_router(routers.inquiries.router)
app.include_router(routers.chat.router)
