# server.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit import api
import os

app = FastAPI()

# Allow frontend (React on port 5173 or 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load API credentials from environment variables
LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY", "APIoUdetNWdQsYy")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET", "fpMr9ZHbvaoFi2484A6pB22hrnKWyeblCbMNQfZp6bLB")


@app.get("/get-token")
def get_token(roomName: str, identity: str):
    """
    Returns a LiveKit access token for the frontend to join a room.
    """
    grant = api.VideoGrant(room=roomName, room_join=True)
    at = api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
    at.identity = identity
    at.add_grant(grant)
    return {"token": at.to_jwt()}


@app.get("/")
def root():
    return {"message": "ECHO Backend is running"}
