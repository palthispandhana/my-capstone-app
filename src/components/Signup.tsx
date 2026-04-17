import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      alert("Signup successful ✅");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Signup
        </button>
      </form>
    </div>
  );
}