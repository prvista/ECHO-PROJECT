import React, { useRef, useEffect } from "react";

function VideoTrack({ track, isLocal = false, identity }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (track && videoRef.current) {
      track.attach(videoRef.current);
      return () => track.detach(videoRef.current);
    }
  }, [track]);

  return (
    <div className="video-container">
      {track ? (
        <video ref={videoRef} autoPlay muted={isLocal} />
      ) : (
        <div className="video-placeholder">
          {identity} {isLocal ? "(You)" : ""}
        </div>
      )}
    </div>
  );
}

export default VideoTrack;
