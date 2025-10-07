import React, { useEffect, useState } from "react";
import { connect, Room as LiveKitRoom } from "livekit-client";
import VideoTrack from "./VideoTrack";

export default function Room({ token, roomName }) {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    let lkRoom = new LiveKitRoom();

    const joinRoom = async () => {
      try {
        await connect(process.env.LIVEKIT_URL || "wss://echo-iptawdrf.livekit.cloud", token, {
          room: lkRoom,
        });

        setRoom(lkRoom);

        const updateParticipants = () => {
          setParticipants(Array.from(lkRoom.participants.values()));
        };

        lkRoom
          .on("participantConnected", updateParticipants)
          .on("participantDisconnected", updateParticipants);

        updateParticipants();
      } catch (err) {
        console.error("Error connecting:", err);
      }
    };

    joinRoom();

    return () => {
      lkRoom.disconnect();
    };
  }, [token]);

  return (
    <div className="container mt-5">
      <h2>Room: {roomName}</h2>
      <h3>Participants:</h3>
      <ul>
        {participants.map((p) => (
          <li key={p.sid}>{p.identity}</li>
        ))}
      </ul>
      <div className="video-grid">
        {participants.map((p) =>
          Array.from(p.tracks.values()).map(
            (trackPub) =>
              trackPub.isSubscribed &&
              trackPub.track && (
                <VideoTrack key={trackPub.trackSid} track={trackPub.track} />
              )
          )
        )}
      </div>
    </div>
  );
}
