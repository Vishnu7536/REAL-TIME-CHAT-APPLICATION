import React, { useState, useEffect } from "react";

function ChatApp() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && input.trim() !== "") {
      ws.send(input);
      setInput("");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "10px", border: "1px solid black" }}>
      <h2>💬 Real-Time Chat</h2>
      <div style={{ height: "300px", overflowY: "auto", border: "1px solid gray", padding: "5px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: "5px 0" }}>{msg}</div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          style={{ width: "70%", padding: "5px" }} 
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={{ padding: "5px 10px", marginLeft: "5px" }}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
