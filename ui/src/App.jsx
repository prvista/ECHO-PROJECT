import React from "react";
import Room from "./Room";
import "./App.css";

function App() {
  const roomName = "test-room";
  const identity = "user-" + Math.floor(Math.random() * 1000);

  return (
    <div className="App">
      <Room roomName={roomName} identity={identity} />
    </div>
  );
}

export default App;
