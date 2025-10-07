import React from "react";
import Room from "./Room"; // your room.jsx component
import "./app.css";

function App() {
  // Replace "test-room" with any room name
  const roomName = "test-room";
  const identity = "user-" + Math.floor(Math.random() * 1000);

  return (
    <div className="App">
      <Room roomName={roomName} identity={identity} />
    </div>
  );
}

export default App;
