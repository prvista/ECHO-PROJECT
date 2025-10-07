# agent.py

from dotenv import load_dotenv
import os
from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.agents import plugin  # updated import
from prompts import AGENT_INSTRUCTION, SESSION_INSTRUCTION
from tools import get_weather, search_web, send_email

# ✅ Load .env from server folder
env_path = os.path.join(os.path.dirname(__file__), "server", ".env")
load_dotenv(dotenv_path=env_path)

print("LIVEKIT_URL:", os.getenv("LIVEKIT_URL"))

# Disable noise cancellation (current LiveKit Python may not support it)
noise_cancellation = None
google_plugin = plugin.google  # updated to match current package


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions=AGENT_INSTRUCTION,
            llm=google_plugin.beta.realtime.RealtimeModel(
                voice="Aoede",
                temperature=0.8,
            ),
            tools=[
                get_weather,
                search_web,
                send_email,
            ],
        )


async def entrypoint(ctx: agents.JobContext):
    # create a new session for the agent
    session = AgentSession()

    # connect to the LiveKit room first
    await ctx.connect()

    # start the agent inside the room
    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            video_enabled=True,
            audio_enabled=True,
            noise_cancellation=noise_cancellation,  # None for now
        ),
    )

    # initial system instruction (like playground intro)
    await session.generate_reply(
        instructions=SESSION_INSTRUCTION,
    )


if __name__ == "__main__":
    agents.cli.run_app(
        agents.WorkerOptions(entrypoint_fnc=entrypoint)
    )
