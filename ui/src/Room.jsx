import React, { useEffect, useState } from "react";
import { connect } from "livekit-client";
import VideoTrack from "./VideoTrack.jsx";

function Room({ roomName, identity }) {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let liveRoom = null;

    const joinRoom = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/get-token?roomName=${roomName}&identity=${identity}`
        );
        if (!res.ok) throw new Error("Failed to fetch token");
        const data = await res.json();

        liveRoom = await connect("wss://echo-iptawdrf.livekit.cloud", data.token, {
          audio: true,
          video: true,
        });

        setRoom(liveRoom);

        const updateParticipants = () => setParticipants([...liveRoom.participants.values()]);
        liveRoom.on("participantConnected", updateParticipants);
        liveRoom.on("participantDisconnected", updateParticipants);
        updateParticipants();

        await liveRoom.localParticipant.setCameraEnabled(true);
        await liveRoom.localParticipant.setMicrophoneEnabled(true);

        setConnecting(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setConnecting(false);
      }
    };

    joinRoom();

    return () => {
      if (liveRoom) liveRoom.disconnect();
    };
  }, [roomName, identity]);

  if (error) return <div className="room-container">Error: {error}</div>;

  const localTrack =
    room &&
    room.localParticipant &&
    room.localParticipant.videoTracks &&
    room.localParticipant.videoTracks.size > 0
      ? Array.from(room.localParticipant.videoTracks.values())[0].track
      : null;

  return (
    <div className="room-container">
      <h2>Room: {roomName}</h2>

      <div className="video-grid">
        {/* Local participant */}
        <VideoTrack
          track={localTrack}
          isLocal={true}
          identity={room?.localParticipant?.identity || "You"}
        />

        {/* Remote participants */}
        {participants.map((p) =>
          Array.from(p.videoTracks.values()).map((vt) => (
            <VideoTrack key={vt.trackSid} track={vt.track} identity={p.identity} />
          ))
        )}

        {/* Connecting / empty placeholder */}
        {connecting && <p style={{ color: "#fff" }}>Connecting to LiveKit...</p>}
        {!connecting && participants.length === 0 && <p style={{ color: "#fff" }}>No participants yet</p>}
      </div>
    </div>
  );
}

export default Room;
