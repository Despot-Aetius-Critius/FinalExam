import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <div style={styles.container}>
      <style>{
}

      </style>

      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        ></div>
      ))}

      <motion.div
        style={styles.homeBox}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={styles.title}>Invictus Store!!</h1>
        <p style={styles.subtitle}>
          สินค้าดี! บริการดี! จัดส่งไวทันใจ!
        </p>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/products" style={styles.button}>เข้าสู่หน้าหลัก</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background: "radial-gradient(circle at center,rgb(255, 255, 255),rgb(255, 255, 255),rgb(255, 255, 255),rgb(255, 255, 255))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  homeBox: {
    position: "relative",
    background: "rgb(255, 255, 255)",
    padding: "3rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.57)",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    backdropFilter: "blur(12px)",
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
  button: {
    display: "inline-block",
    backgroundColor: "#EFBF04",
    color: "#000000",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "all 0.3s ease-in-out",
  },
};

export default Home;
