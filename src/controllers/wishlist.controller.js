import Wishlist from "../models/Wishlist.model.js";

export const getWishlist = async (req, res) => {
    const { params: { id } } = req;
    try {
        const wishlist = await Wishlist.findOne({ userId: id }).populate('products.productId', 'productname');
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });
        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
export const addToWishlist = async (req, res) => {
    const { body, params: { id } } = req;
    try {
        const wishlist = await Wishlist.findOne({ userId: id });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.products.push({ productId: body.productId, productname: body.productname });
        await wishlist.save();
        res.status(201).json(wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
export const addwishlist = async (req, res) => {
    // const result = validationResult(req);
    // if (!result.isEmpty()) return res.send(result.array());
    try {
        const newWishlist = new Wishlist({ userId: req.user.id });
        await newWishlist.save();
        res.status(201).json(newWishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

export const removeFromWishlist = async (req, res) => {
    const { params: { id }, body } = req;
    try {
        const wishlist = await Wishlist.findOne({ userId: id });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.products = wishlist.products.filter(product => product.productId.toString() !== body.productId);
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}