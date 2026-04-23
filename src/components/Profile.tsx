import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

export default function Profile() {
  const [message, setMessage] = useState("Loading...");

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Profile</h2>
        <p style={{ color: "red" }}>Please login first ❌</p>
      </div>
    );
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}/profile`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Could not load profile"));
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Profile</h2>
      <p style={{ color: "green" }}>{message}</p>
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>
    </div>
  );
}