import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TrackOrder.css'; // We'll create this for styling
import { assets } from '../../assets/assets'; // Assuming assets are in this path for the icon

const TrackOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOrder = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication required to track an order.");
            setLoading(false);
            return;
        }

        try {
            // The backend route is GET /api/track/:orderId
            const response = await axios.get(`/api/track/${orderId}`, {
                headers: { token }
            });

            // The backend sends the order object directly
            setOrder(response.data);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch order details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) return <p>Loading your orders...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!order) return <p>Order not found.</p>;

    return (
        <div className="track-order-container">
            <h2>Track Your Order</h2>
            <div className="order-card">
                <img src={assets.parcel_icon} alt="parcel icon" />
                <div className="order-details">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Items:</strong> {order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Amount:</strong> ${order.amount.toFixed(2)}</p>
                    <p><strong>Status:</strong> <span className={`status ${order.status.replace(/\s+/g, '-').toLowerCase()}`}>{order.status}</span></p>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;