import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const res = await fetch("http://localhost:8000/get-token?roomName=testroom&identity=paul");
      const data = await res.json();
      setToken(data.token);
    }
    fetchToken();
  }, []);

  return (
    <div>
      <h1>LiveKit Test</h1>
      {token ? <p>Got token ✅</p> : <p>Loading token...</p>}
    </div>
  );
}

export default App;
