from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit import api
import os

app = FastAPI()

# Allow frontend (React on port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY", "APIoUdetNWdQsYy")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET", "fpMr9ZHbvaoFi2484A6pB22hrnKWyeblCbMNQfZp6bLB")

@app.get("/get-token")
def get_token(roomName: str, identity: str):
    grant = api.VideoGrant(room=roomName, room_join=True)
    at = api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET)
    at.identity = identity
    at.add_grant(grant)
    return {"token": at.to_jwt()}
