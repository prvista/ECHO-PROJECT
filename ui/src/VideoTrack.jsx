import React, { useRef, useEffect } from "react";

function VideoTrack({ track, isLocal = false, identity }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (track && videoRef.current) {
      track.attach(videoRef.current);
      return () => track.detach(videoRef.current);
    }
  }, [track]);

  if (!track) return null;

  return (
    <div className="video-container">
      <video ref={videoRef} autoPlay muted={isLocal} />
      <p>{identity}{isLocal ? " (You)" : ""}</p>
    </div>
  );
}

export default VideoTrack;
