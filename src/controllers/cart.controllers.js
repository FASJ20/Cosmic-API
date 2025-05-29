import { Cart } from "../models/cart.model.js";

export const ShowCartItems = async (req, res) => {
    try{
        const ShowItems = await Cart.find();
        if (!ShowItems) return res.status(401).json({message: "Nothing found in Cart"});
        res.status(200).json(ShowItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const AddCartItems = async (req, res) => {
    const {body} = req;
    try{
        const AddItem = new Cart ({...body})
        await AddItem.save().then((item) => {
            console.log(item);
            res.status(201).json(item)
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const ShowOneItem = async (req, res) => {
    const {params: id} = req;
    try{
        const ShowOneItem = await Cart.findOne({_id: id.id});
        if (!ShowOneItem) return res.status(401).json({message: "No item found"});
        res.status(200).json(ShowOneItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const updateCartItems = async (req, res) => {
    const {body, params:id} = req;
    try{
        const updateItem = await Cart.updateOne({_id: id.id}, {$set: body});
        res.status(202).json({message: "Updated successfully"})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const deleteCartItems = async (req, res) => {
    const {params:id} = req;
    try{
        const deleteItem = await Cart.deleteOne({_id: id.id});
        res.status(202).json({message: "deleted successfully"})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}
export const deleteCart = async (req, res) => {
    try{
        const deleteAll = await Cart.deleteAll();
        res.status(204).json({message: "Deleted successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

