import { User } from "../models/User.model.js";

export const GetUserprofile = async (req, res) => {
    const {params: id} = req;
    try{
        const findUser = await User.findOne({_id: id.id});
        if (!findUser) return res.status(404).json({message: "User not found"})
        console.log(findUser);
        res.json(findUser)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err || "error"});
    }
}

export const updateUserProfile = async (req, res) => {
    const {body, params:id} = req;
    try {
        const updateUser = await User.updateOne({_id: id.id}, {$set: body});
        res.json({message: "User Updated successfully"})

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err || "error"});
    }
}

export const AddNewAddress = async (req, res) => {
    const { body, params:id } = req;
    let addresses = req.body
    try{
        const findUser = await User.updateOne({_id: id.id}, {$set: addresses});
        if (!findUser) return res.status(404).json({message: "User not found"});
       
        res.status(201).json(findUser.addresses)

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err || "error"});
    }
}
export const GetAddress = async (req, res) => {
    const { params:id } = req;
    try{
        const findUser = await User.findOne({_id: id.id});
        if (!findUser) return res.status(404).json({message: "User not found"});
        res.json(findUser.addresses)

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err || "error"});
    }
}

export const UpdateAddress = async (req, res) => {
    const { body, params:id } = req;
    try{
        const findUser = await User.findOne({_id: id.id});
        if (!findUser) return res.status(404).json({message: "User not found"});
        findUser.addresses = {
            street: body.street ? body.street : findUser.addresses.street,
            city: body.city ? body.city : findUser.addresses.city,
            state: body.state ? body.state : findUser.addresses.state,
            zipcode: body.zipcode ? body.zipcode : findUser.addresses.zipcode,
            country: body.country ? body.country : findUser.addresses.country,
            isdefault: body.isdefault ? body.isdefault : findUser.addresses.isdefault
        }
        res.status(201).json(findUser.addresses)

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err || "error"});
    }
}

export const DeleteAddress = async (req, res) => {
    const { params:id } = req;
    try{
        const findUser = await User.findOne({_id: id.id});
        if (!findUser) return res.status(404).json({message: "User not found"});
        const deleteUser = findUser.deleteOne(addresses)

    } catch (err) {
        console.error(err);
        res.status(500).json({message: err || "error"});
    }
}