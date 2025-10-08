from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from livekit_server_sdk import AccessToken
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")
LIVEKIT_URL = os.getenv("LIVEKIT_URL")
ROOM_NAME = "ECHO_ROOM"

@app.get("/get_token")
def get_token(identity: str = "user1"):
    token = AccessToken(
        api_key=LIVEKIT_API_KEY,
        api_secret=LIVEKIT_API_SECRET,
        room=ROOM_NAME,
        identity=identity
    )
    return {"token": token.to_jwt(), "url": LIVEKIT_URL}
