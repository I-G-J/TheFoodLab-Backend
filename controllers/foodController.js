import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "No image uploaded" });
    }    

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.path,
        publicId: req.file.filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        let publicId = food.publicId;
        if (!publicId) {
            // Extract from URL if publicId not stored
            publicId = food.image.split('/').pop().split('.')[0];
        }
        await cloudinary.uploader.destroy(publicId);

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addFood, listFood, removeFood };