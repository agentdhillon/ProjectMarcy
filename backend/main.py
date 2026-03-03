import os
import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# --- FastAPI app ---
app = FastAPI(
    title="ProjectMarcy API",
    description="Backend for the ProjectMarcy salesperson community platform.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Socket.IO server (for real-time chat rooms + music sync) ---
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
)
socket_app = socketio.ASGIApp(sio, other_asgi_app=app)


# --- REST routes ---
@app.get("/health")
async def health_check():
    return {"status": "ok"}


from app.routes.ai_chat import router as ai_chat_router
app.include_router(ai_chat_router, prefix="/ai", tags=["ai"])

# Register additional route modules here as you build them, e.g.:
# from app.routes import posts, auth, rooms, music
# app.include_router(posts.router, prefix="/posts", tags=["posts"])
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(rooms.router, prefix="/rooms", tags=["rooms"])
# app.include_router(music.router, prefix="/music", tags=["music"])


# --- Socket.IO events (real-time chat rooms + music sync) ---
@sio.event
async def connect(sid, environ, auth):
    print(f"Client connected: {sid}")


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")


@sio.event
async def join_room(sid, data):
    """User joins a private chat room or music room."""
    room_id = data.get("room_id")
    await sio.enter_room(sid, room_id)
    await sio.emit("room_joined", {"room_id": room_id}, room=room_id)


@sio.event
async def leave_room(sid, data):
    room_id = data.get("room_id")
    await sio.leave_room(sid, room_id)


@sio.event
async def send_message(sid, data):
    """Relay a chat message to everyone in the room."""
    room_id = data.get("room_id")
    await sio.emit("new_message", data, room=room_id, skip_sid=sid)


@sio.event
async def music_sync(sid, data):
    """Broadcast a music playback event (play/pause/seek/track change) to the room."""
    room_id = data.get("room_id")
    await sio.emit("music_event", data, room=room_id, skip_sid=sid)


# --- Entry point ---
# Run with: uvicorn main:socket_app --reload --port 8000
