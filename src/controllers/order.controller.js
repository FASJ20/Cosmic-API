import { Order } from "../models/Order.model.js";
import { Cart } from "../models/cart.model.js";
import { validationResult } from "express-validator";
import { calculateTotal } from "./cart.controllers.js";

export const getOrders = async (req, res) => {
    const {params:id} = req;
    try{
        const ShowOrders = await Order.findone({_id: id.id});
        if (!ShowOrders) return res.status(401).json({message: "No Order found"});
        res.status(200).json(ShowOrders);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const AddOrders = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const {body, params:id} = req;
    try{
        const findCart = await Cart.findOne({userid: id.id});
        if (!findCart || findCart.item.length === 0) return res.status(400).json({ message: "Cart is empty or not found" });
        
        const AddOrder = new Order({...body, userid: id.id, items: findCart.item, totalamount: calculateTotal(findCart.item)})
        await AddOrder.save().then((Order) => {
            console.log(Order);
            res.status(201).json(Order)
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const ShowOneOrder = async (req, res) => {
    const {params: id} = req;
    try{
        const OneOrder = await Order.findOne({_id: id.id});
        if (!OneOrder ) return res.status(401).json({message: "Order not found"});
        res.status(200).json(OneOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const updateOrderStatus = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const {body, params: id} = req
    try{
        const findOrders = await Order.findOne({ _id: id.id });
        
        findOrders.status = body.status ? body.status : findOrders.status,
        findOrders.paymentstatus = body.paymentstatus ? body.paymentstatus : findOrders.paymentstatus
        
        res.json(findOrders)
        console.log(findOrders)
          
    } catch (err) {
        res.status(500).json({message: err}) 
        console.error(err) 
    }
   
}

export const getOrderTracking = async (req, res) => {
    const { params: id } = req;
    try{
        const findTracking = await Order.findOne({_id: id.id});
        if (!findTracking) return res.status(404).json({message: "Order not found"})
        res.json({
            status: findTracking.status,
            shippingAddress: findTracking.shippingaddress,
            paymentstatus: findTracking.paymentstatus
        })
       
    } catch (err) {
        res.status(500).json({message: err}) 
        console.error(err)
    }
}