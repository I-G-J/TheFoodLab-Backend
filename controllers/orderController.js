import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// This is an example of what the other functions in this file might look like.
// The key function for your request is userOrders below.
export const placeOrder = async (req, res) => {
  let frontend_url = process.env.FRONTEND_URL;

  if (!frontend_url) {
    console.log("Error: something went wrong ");
    return res.json({ success: false, message: "Server Error: FRONTEND_URL missing" });
  }

  // Trim whitespace to avoid issues if there are accidental spaces in the env var
  frontend_url = frontend_url.trim();

  // Remove trailing slash if present to prevent double slashes in URL (e.g. .com//verify)
  if (frontend_url.endsWith('/')) {
    frontend_url = frontend_url.slice(0, -1);
  }

  try {
    // Create a new order document but don't save it yet
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    // Save the order to the database immediately
    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in the smallest currency unit
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      // Pass order details to Stripe metadata
      metadata: {
        orderId: newOrder._id.toString(),
        userId: req.body.userId,
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Stripe Session Creation Error:", error);
    res.json({ success: false, message: "Error creating Stripe session" });
  }
};

export const placeCodOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false, // For COD, payment is not done online
            paymentMethod: "COD"
        });
        await newOrder.save();

        // After placing order, clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "COD Order Placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing COD order" });
    }
};
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true, paymentMethod: "Online" });
      // After verifying payment, clear the user's cart
      const order = await orderModel.findById(orderId);
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
      res.json({ success: true, message: "Payment Verified, Order Placed" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed, Order Canceled" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error Verifying Payment" });
  }
};
export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: "Error fetching all orders" });
    }
};
export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.json({ success: false, message: "Error updating status" });
    }
};
export const removeOrder = async (req, res) => {
    try {
        // The orderId should be sent in the request body from the frontend
        await orderModel.findByIdAndDelete(req.body.orderId);
        res.json({ success: true, message: "Order Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing order" });
    }
};

/**
 * @desc    Get logged in user's orders
 * @route   POST /api/order/userorders
 * @access  Private
 */
export const userOrders = async (req, res) => {
    try {
        // The authMiddleware provides the userId in the request body
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

export const trackOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderModel.findById(orderId);
        res.json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error tracking order" });
    }
};