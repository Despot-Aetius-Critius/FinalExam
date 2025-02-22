import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                login(data.token);
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("❌ Login failed. Try again.");
        }
    };

    return (
        <div style={styles.container}>
            {/* 🌟 Animation Background */}
            <style>

            </style>

            {/* ⭐ Random Stars */}
            {[...Array(50)].map((_, i) => (
                <div key={i} className="star" style={{
                    top: `${Math.random() * 100}vh`,
                    left: `${Math.random() * 100}vw`,
                    animationDelay: `${Math.random() * 3}s`,
                }}></div>
            ))}

            <motion.div 
                style={styles.loginBox}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 style={styles.title}>เข้าสู่ระบบ</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleLogin}>
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
                        whileTap={{ scale: 0.95, backgroundColor: "#6c48d3" }}
                    >
                        ยืนยัน
                    </motion.button>
                </form>
                <p style={styles.signupText}>
                    หากยังไม่มีบัญชี <a href="/register" style={styles.link}>กดตรงนี้</a>
                </p>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "linear-gradient(-45deg,rgb(255, 255, 255),rgb(255, 255, 255),rgb(255, 255, 255))",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 10s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    loginBox: {
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
    signupText: {
        color: "#8c8c8c",
        marginTop: "1rem",
        fontSize: "0.9rem",
    },
    link: {
        color: "#EFBF04",
        textDecoration: "none",
        fontWeight: "bold",
        transition: "color 0.3s",
    },
};

export default Login;
