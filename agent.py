import os
from dotenv import load_dotenv
import subprocess

from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.plugins import noise_cancellation, google
from prompts import AGENT_INSTRUCTION, SESSION_INSTRUCTION
from tools import get_weather, search_web, send_email

# ---- Load .env ----
# This ensures it finds the server/.env no matter where you run it
env_path = os.path.join(os.path.dirname(__file__), "server", ".env")
if not os.path.exists(env_path):
    raise FileNotFoundError(f".env file not found at {env_path}")
load_dotenv(dotenv_path=env_path)

LIVEKIT_URL = os.getenv("LIVEKIT_URL")
LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")

# ---- Check if env vars loaded ----
if not all([LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET]):
    raise ValueError("LIVEKIT_URL, LIVEKIT_API_KEY, or LIVEKIT_API_SECRET not set in .env!")

print("LIVEKIT_URL:", LIVEKIT_URL)
print("LIVEKIT_API_KEY:", LIVEKIT_API_KEY[:4] + "…")  # hide part of key
print("LIVEKIT_API_SECRET:", LIVEKIT_API_SECRET[:4] + "…")

# ---- System Command Tool ----
def run_command(command: str):
    try:
        allowed = ["notepad", "calc", "mspaint", "chrome"]
        if any(cmd in command.lower() for cmd in allowed):
            subprocess.Popen(command, shell=True)
            return f"Executing: {command}"
        else:
            return "Command not allowed."
    except Exception as e:
        return f"Failed to execute command: {str(e)}"

# ---- AI Assistant ----
class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions=AGENT_INSTRUCTION,
            llm=google.beta.realtime.RealtimeModel(
                voice="Aoede",
                temperature=0.8,
            ),
            tools=[
                get_weather,
                search_web,
                send_email,
                run_command,
            ],
        )

# ---- Entrypoint ----
async def entrypoint(ctx: agents.JobContext):
    session = AgentSession()
    await ctx.connect()
    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            video_enabled=True,
            audio_enabled=True,
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )
    await session.generate_reply(instructions=SESSION_INSTRUCTION)

# ---- CLI Runner ----
if __name__ == "__main__":
    agents.cli.run_app(
        agents.WorkerOptions(entrypoint_fnc=entrypoint)
    )
