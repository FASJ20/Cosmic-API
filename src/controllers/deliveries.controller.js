import { Delivery } from "../models/Delivery.model.js";


export const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        if (!deliveries) return res.status(404).json({message: "Deleveries not recorded yet"});
        res.status(200).json({status: "Successfull", data: deliveries});

    } catch (err) {
        console.error(err);
        res.status(500).json({status: "Failed", error: err})
    }
}

export const getOneDeliveryDetail = async (req, res) => {
    const {params: id} = req;
    try {
        const delivery = await Delivery.findOne({_id: id.id});
        if (!delivery) return res.status(404).json({message: "Delivery haven't been found"});
        res.status(200).json({delivery})
    } catch (err) {
        console.error(err);
        res.status(500).json({status: "Failed", error: err})
    }
}

export const createDelivery = async (req, res) => {
    const {body} = req;
    try {
        const delivery = new Delivery({...body});
        await delivery.save()
        res.status(201).json({delivery})
    } catch (err) {
        console.error(err);
        res.status(500).json({status: "Failed", error: err})
    }
}

export const updateDelivryStat = async (req, res) => {
    const {body, params: id} = req;
    try {
        const update = await Delivery.findOneAndUpdate({_id: id.id}, {status: body.status}, {new: true});
        if (!update) return res.status(404).json({message: "Delivery not found"});
        res.status(200).json({status: "Successful", data: update});
    } catch (err) {
        console.error(err);
        res.status(500).json({status: "Failed", error: err})
    }
}

export const deleteDelivery = async (req, res) => {
    const {params: id} = req;
    try {
        const delivery = await Delivery.findOneAndDelete({_id: id.id});
        if (!delivery) return res.status(404).json({message: "Delivery not found"});
        res.status(200).json({status: "Successful", message: "Delivery deleted successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({status: "Failed", error: err})
    }
}