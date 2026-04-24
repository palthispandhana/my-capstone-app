import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div>
        <h3>Please login first ❌</h3>
        <button onClick={() => navigate("/")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Welcome user ✅</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}