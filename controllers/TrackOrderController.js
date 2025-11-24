import orderModel from "../models/orderModel.js";

export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("Tracking Order ->", orderId);

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log("Track Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
