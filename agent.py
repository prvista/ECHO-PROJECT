from dotenv import load_dotenv

from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.plugins import noise_cancellation, google
from prompts import AGENT_INSTRUCTION, SESSION_INSTRUCTION
from tools import get_weather, search_web, send_email

load_dotenv()


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions=AGENT_INSTRUCTION,
            llm=google.beta.realtime.RealtimeModel(
                voice="Aoede",         # AI voice
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
            audio_enabled=True,   # enable microphone input
            noise_cancellation=noise_cancellation.BVC(),
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
