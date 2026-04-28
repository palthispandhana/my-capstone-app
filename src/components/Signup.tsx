import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMsg(data.message || "Done");
      if (data.message?.includes("successfully") || data.message?.includes("✅")) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err: any) {
      setMsg("Cannot reach server. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>✨</div>
        <h1 style={styles.title}>Create account</h1>
        <p style={styles.subtitle}>Start your journey today</p>

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={e => (e.target.style.borderColor = "#6366f1")}
              onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={e => (e.target.style.borderColor = "#6366f1")}
              onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          {msg && (
            <div style={{
              ...styles.msgBox,
              background: success ? "#f0fff4" : "#fff5f5",
              borderColor: success ? "#9ae6b4" : "#feb2b2",
              color: success ? "#276749" : "#c53030",
            }}>
              {msg} {success && "— redirecting to login..."}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} style={styles.link}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  logo: {
    fontSize: "40px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1a202c",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#718096",
    margin: "0 0 32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  field: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#4a5568",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #e2e8f0",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    color: "#1a202c",
  },
  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    marginTop: "8px",
    transition: "opacity 0.2s",
  },
  msgBox: {
    borderRadius: "8px",
    border: "1px solid",
    padding: "10px 14px",
    fontSize: "14px",
    textAlign: "left",
  },
  switchText: {
    marginTop: "24px",
    fontSize: "14px",
    color: "#718096",
  },
  link: {
    color: "#6366f1",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "underline",
  },
};