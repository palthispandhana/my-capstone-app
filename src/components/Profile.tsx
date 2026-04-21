import { useEffect, useState } from "react";

export default function Profile() {
  const [message, setMessage] = useState("");

  // 🔴 STEP 4: Protect page (ADD HERE — at top)
  if (!localStorage.getItem("token")) {
    return <h3>Please login first ❌</h3>;
  }

  // Fetch profile data
  useEffect(() => {
    fetch("https://my-capstone-app.onrender.com", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Profile Page</h2>

      <p>{message}</p>

      {/* 🔴 STEP 3: Logout button (ADD HERE — inside return) */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          alert("Logged out");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
}