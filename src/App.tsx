import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => setPage("login")}>Login</button>
      <button onClick={() => setPage("signup")}>Signup</button>
      <button onClick={() => setPage("profile")}>Profile</button>

      {page === "login" && <Login />}
      {page === "signup" && <Signup />}
      {page === "profile" && <Profile />}
    </div>
  );
}

export default App;