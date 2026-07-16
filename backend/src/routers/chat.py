from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx

router = APIRouter(prefix="/api/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str

@router.post("")
async def chat_with_agent(req: ChatRequest):
    # Dockerネットワーク内では、Mastraのコンテナ内部ポート '4111' で通信。
    url = "http://mastra:4111/api/agents/portfolio-agent/generate"
    try:
        async with httpx.AsyncClient() as client:
            # Mastraのgenerate APIが期待する {"messages": [{"role": "user", "content": "..."}]} の形式で送信
            resp = await client.post(
                url, 
                json={"messages": [{"role": "user", "content": req.message}]}, 
                timeout=30.0
            )
            if resp.status_code != 200:
                print(f"Mastra agent response error: {resp.status_code} - {resp.text}")
                raise HTTPException(
                    status_code=resp.status_code,
                    detail="AIアシスタントから適切な応答を得られませんでした。"
                )
            data = resp.json()
            return {"reply": data.get("text", "")}
    except HTTPException as he:
        raise he
    except httpx.RequestError as exc:
        print(f"An error occurred while requesting {exc.request.url!r}: {exc}")
        raise HTTPException(
            status_code=503,
            detail="AIアシスタントへの接続に失敗しました。少し時間をおいてから再度お試しください。"
        )
    except Exception as e:
        print(f"Unexpected chat error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="サーバー内部で予期しないエラーが発生しました。"
        )
