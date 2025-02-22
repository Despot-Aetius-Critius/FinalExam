import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import axios from "axios";

const OrdersAndPayment = () => {
    const [error, setError] = useState(null);
    const [selectedOrderID, setSelectedOrderID] = useState("");
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("");

    // ฟังก์ชันดึงข้อมูลออเดอร์ทั้งหมด
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/api/orders"); // เปลี่ยน URL ให้ตรงกับ API ของคุณ
                setOrders(response.data);
            } catch (err) {
                setError("Failed to fetch orders.");
            }
        };
        fetchOrders();
    }, []);

    // ฟังก์ชันดึงรายละเอียดของออเดอร์ที่เลือก
    const fetchOrderDetails = async (orderID) => {
        try {
            const response = await axios.get(`/api/orders/${orderID}`);
            setOrderDetails(response.data);
        } catch (err) {
            setError("Failed to fetch order details.");
        }
    };

    // ฟังก์ชันสำหรับสไตล์ของ status
    const getStatusStyle = (status) => {
        switch (status) {
            case "Pending":
                return { backgroundColor: "#f39c12", color: "white" };
            case "Completed":
                return { backgroundColor: "#2ecc71", color: "white" };
            case "Canceled":
                return { backgroundColor: "#e74c3c", color: "white" };
            default:
                return {};
        }
    };

    // ฟังก์ชันสำหรับทำการจ่ายเงิน
    const handlePayment = () => {
        if (!paymentMethod) {
            setError("Please select a payment method.");
            return;
        }

        alert(`Payment successful with ${paymentMethod}`);
        setOrderDetails((prev) => ({ ...prev, Status: "Completed" }));
    };

    return (
        <motion.div
            className="container my-5 p-4 rounded shadow-lg bg-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={styles.card}
        >
            <h2 className="text-center text-primary fw-bold mb-4">
                📦 <span style={{ color: "#1d3557" }}>Order & Payment</span>
            </h2>

            {error && <p className="alert alert-danger text-center">{error}</p>}

            <div className="mb-4">
                <label className="fw-bold">Select Order ID:</label>
                <select
                    className="form-select"
                    value={selectedOrderID}
                    onChange={(e) => {
                        setSelectedOrderID(e.target.value);
                        fetchOrderDetails(e.target.value);
                    }}
                >
                    <option value="">-- Select Order --</option>
                    {orders.map((order) => (
                        <option key={order.OrderID} value={order.OrderID}>
                            Order {order.OrderID} - {new Date(order.OrderDate).toLocaleString()}
                        </option>
                    ))}
                </select>
            </div>

            {orderDetails && (
                <div className="p-3 mb-4 rounded shadow-sm" style={styles.orderDetails}>
                    <h4 className="text-center text-dark fw-bold">Order Information</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="mb-1"><strong>Order ID:</strong> {orderDetails.OrderID}</p>
                            <p className="mb-1"><strong>Order Date:</strong> {new Date(orderDetails.OrderDate).toLocaleString()}</p>
                        </div>
                        <div className="col-md-6">
                            <p className="mb-1"><strong>Total Price:</strong> {parseFloat(orderDetails.TotalPrice).toLocaleString()} บาท</p>
                            <p className="mb-1">
                                <strong>Status:</strong>
                                <span className="badge ms-2" style={getStatusStyle(orderDetails.Status)}>
                                    {orderDetails.Status}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {orderDetails && orderDetails.Status !== "Completed" ? (
                <>
                    <p className="text-center text-muted">Please select your preferred payment method:</p>
                    <div className="d-flex flex-column gap-3 my-4">
                        {["Credit Card", "PayPal", "Bank Transfer"].map((method) => (
                            <motion.label
                                key={method}
                                className="d-flex align-items-center p-3 rounded border"
                                whileHover={{ scale: 1.05, backgroundColor: "#f1faee" }}
                                transition={{ duration: 0.3 }}
                                style={styles.option}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method}
                                    className="me-2"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                {method === "Credit Card" ? "💳" : method === "PayPal" ? "🅿️" : "🏦"} {method}
                            </motion.label>
                        ))}
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <motion.button
                            className="btn btn-lg"
                            style={styles.btnPayment}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePayment}
                        >
                            ✅ Complete Payment
                        </motion.button>
                    </div>
                </>
            ) : orderDetails && orderDetails.Status === "Completed" ? (
                <p className="text-center text-success fw-bold">✅ This order has already been paid.</p>
            ) : null}
        </motion.div>
    );
};

const styles = {
    orderDetails: {
        backgroundColor: "#f1faee",
        borderRadius: "10px",
        padding: "15px",
        border: "1px solid #d0d0d0"
    },
    btnPayment: {
        backgroundColor: "#1d3557",
        color: "white",
        padding: "12px 20px",
        borderRadius: "10px",
        fontSize: "1.2rem",
        transition: "0.3s",
        border: "none",
        cursor: "pointer",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)"
    },
    card: {
        maxWidth: "600px",
        margin: "auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0e0e0"
    },
    option: {
        fontSize: "1.2rem",
        cursor: "pointer",
        transition: "0.3s",
        border: "1px solid #ced4da",
        backgroundColor: "#fff",
    }
};

export default OrdersAndPayment;
