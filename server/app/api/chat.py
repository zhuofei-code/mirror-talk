import uuid

from fastapi import APIRouter
from pydantic import BaseModel

from app.core.interviewer import interviewer

router = APIRouter()


class StartResponse(BaseModel):
    session_id: str
    message: str


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    message: str
    turn_count: int
    is_near_end: bool


class PortraitResponse(BaseModel):
    portrait: str


@router.post("/start", response_model=StartResponse)
async def start_session():
    session_id = str(uuid.uuid4())
    greeting = await interviewer.chat(session_id, "你好，我想开始一次对话。")
    return StartResponse(session_id=session_id, message=greeting)


@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    reply = await interviewer.chat(req.session_id, req.message)
    turn_count = interviewer.get_turn_count(req.session_id)
    return ChatResponse(
        message=reply,
        turn_count=turn_count,
        is_near_end=turn_count >= 15,
    )


@router.post("/portrait", response_model=PortraitResponse)
async def generate_portrait(req: ChatRequest):
    portrait = await interviewer.generate_portrait(req.session_id)
    return PortraitResponse(portrait=portrait)
