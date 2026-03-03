from fastapi import APIRouter
from pydantic import BaseModel
from app.ai.claude import get_listener_response

router = APIRouter()


class ListenRequest(BaseModel):
    message: str
    history: list[dict] | None = None


class ListenResponse(BaseModel):
    response: str


@router.post("/listen", response_model=ListenResponse)
async def listen(body: ListenRequest):
    reply = get_listener_response(body.message, body.history)
    return {"response": reply}
