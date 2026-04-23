import { useState } from "react";
import { API_BASE_URL } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Sending...");
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setMsg("Login successful ✅");
      } else {
        setMsg(data.message || "Login failed ❌");
      }
    } catch (err: any) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required /><br /><br />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Login</button>
      </form>
      {msg && <p style={{ color: msg.includes("✅") ? "green" : "red" }}>{msg}</p>}
    </div>
  );
}