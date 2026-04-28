import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.logo}>🔒</div>
          <h2 style={styles.title}>Access Denied</h2>
          <p style={styles.subtitle}>You need to login first</p>
          <button onClick={() => navigate("/")} style={styles.button}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatar}>U</div>
        <h1 style={styles.title}>My Profile</h1>
        <p style={styles.subtitle}>You are successfully logged in</p>

        <div style={styles.infoBox}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Status</span>
            <span style={styles.badge}>● Active</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Session</span>
            <span style={styles.infoValue}>Authenticated</span>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          style={styles.logoutButton}
        >
          Sign out
        </button>
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
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontSize: "28px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  logo: {
    fontSize: "40px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#1a202c",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#718096",
    margin: "0 0 32px",
  },
  infoBox: {
    background: "#f7fafc",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "28px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: "14px",
    color: "#718096",
    fontWeight: 500,
  },
  infoValue: {
    fontSize: "14px",
    color: "#2d3748",
    fontWeight: 600,
  },
  badge: {
    background: "#f0fff4",
    color: "#276749",
    fontSize: "13px",
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #9ae6b4",
  },
  button: {
    padding: "14px 32px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
  logoutButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1.5px solid #e2e8f0",
    background: "#fff",
    color: "#e53e3e",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
};