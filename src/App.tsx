import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar />

      {page === "home" && <Hero />}
      {page === "login" && <Login />}
      {page === "signup" && <Signup />}

      <div className="flex justify-center gap-4 my-4">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("signup")}>Signup</button>
      </div>

      <Footer />
    </>
  );
}

export default App;