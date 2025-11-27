import ContactMessage from "../models/ContactMessage.js";

export const submitMessage = async (req, res) => {
  try {
    const newMessage = await ContactMessage.create(req.body);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
