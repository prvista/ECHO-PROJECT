import React, { useEffect, useState } from "react";
import { Room as LiveKitRoom, connect } from "livekit-client";
import VideoTrack from "./VideoTrack";

function Room() {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const joinRoom = async () => {
      try {
        // Replace with your roomName and identity
        const roomName = "echo-room";
        const identity = "user-" + Math.floor(Math.random() * 1000);

        // Get token from FastAPI server
        const res = await fetch(
          `http://127.0.0.1:8000/get-token?roomName=${roomName}&identity=${identity}`
        );
        const data = await res.json();

        // Connect to LiveKit
        const liveRoom = await connect("wss://echo-iptawdrf.livekit.cloud", data.token, {
          audio: true,
          video: true,
        });

        setRoom(liveRoom);

        // Update participants whenever a participant joins/leaves
        const updateParticipants = () => {
          setParticipants([...liveRoom.participants.values()]);
        };

        liveRoom.on("participantConnected", updateParticipants);
        liveRoom.on("participantDisconnected", updateParticipants);
        updateParticipants(); // initial list

      } catch (err) {
        console.error("Error joining room:", err);
      }
    };

    joinRoom();

    return () => {
      if (room) room.disconnect();
    };
  }, []);

  return (
    <div className="room-container">
      {participants.length === 0 && <p>Waiting for participants...</p>}
      <div className="video-grid">
        {room && (
          <VideoTrack
            track={room.localParticipant.videoTracks.values().next().value?.track}
            isLocal={true}
            identity={room.localParticipant.identity}
          />
        )}
        {participants.map((p) =>
          Array.from(p.videoTracks.values()).map((vt) => (
            <VideoTrack key={vt.trackSid} track={vt.track} identity={p.identity} />
          ))
        )}
      </div>
    </div>
  );
}

export default Room;
