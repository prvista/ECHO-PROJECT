import React, { useEffect, useRef } from "react";

export default function VideoTrack({ track }) {
  const ref = useRef();

  useEffect(() => {
    if (track.kind === "video") {
      track.attach(ref.current);
      return () => {
        track.detach(ref.current);
      };
    }
  }, [track]);

  return <video ref={ref} autoPlay playsInline className="rounded border" />;
}
