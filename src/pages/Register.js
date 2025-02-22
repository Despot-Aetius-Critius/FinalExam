import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", { fullName, email, password });
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("❌ Error registering. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {

        }
      </style>

      {/* Star Twinkle Effect */}
      {[...Array(50)].map((_, i) => (
        <div key={i} className="star" style={{
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 3}s`,
        }}></div>
      ))}

      {/* Register Box */}
      <motion.div
        style={styles.registerBox}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.title}>สร้างบัญชี</h2>
        <p style={styles.subtitle}>กรุณากรอกข้อมูลให้ครบถ้วน</p>
        <form onSubmit={handleRegister}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="ชื่อ-นามสกุล"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="email"
              placeholder="อีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ยืนยัน
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background: "radial-gradient(circle at center,rgb(255, rgb(255, 255, 255)), #0f0f1a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  registerBox: {
    position: "relative",
    background: "rgb(255, 255, 255)",
    padding: "3rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },
  title: {
    color: "#EFBF04",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textShadow: "0px 0px 15px rgba(255, 246, 169, 0.57)",
  },
  subtitle: {
    color: "#000000",
    fontSize: "1.3rem",
    marginBottom: "2rem",
  },
  inputContainer: {
    marginBottom: "1rem",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#8c8c8c",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s",
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#EFBF04",
    color: "#000000",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
  },
};

export default Register;
