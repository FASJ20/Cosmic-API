import { Product } from "../models/Product.model.js";
import { validationResult } from "express-validator";

export const ShowCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        if (!categories) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Server error" });
    }
}

export const GetProductsByCategory = async (req, res) => {
    const { params: { category } } = req;
    try {
        const products = await Product.find({ category });
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Server error" });
    }
}

export const DeleteProductByCategory = async (req, res) => {
    const { params: { category } } = req;
    try {
        const result = await Product.deleteMany({ category });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }
        res.status(200).json({ message: "Products deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Server error" });
    }
}