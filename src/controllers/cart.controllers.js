import { Cart } from "../models/cart.model.js";
export let calculateTotal = (items) => {
    return items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
}
export const ShowCartItems = async (req, res) => {
    const {params: id} = req
    try{
        const ShowItems = await Cart.findOne({_id:id.id});
        if (!ShowItems) return res.status(401).json({message: "Nothing found in Cart"});
        res.status(200).json({
            items: ShowItems.item,
            totalamount: ShowItems.totalamount,
            updatedat: ShowItems.updatedAt,
            createdat: ShowItems.createdAt

        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const createCart = async (req, res) => {
    const {body} = req;
    try{
        const AddCart = new Cart ({...body, totalamount: calculateTotal(body.item)})
        await AddCart.save().then((data) => {
            console.log(data);
            res.status(201).json(data)
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}
export const AddItem = async (req, res) => {
    const {body, params: id} = req;
    try{
        const findCart = await Cart.findOne({_id: id.id});
        if (!findCart) return res.status(404).json({message: "Cart not found"})
        findCart.item.push({...body});
        findCart.totalamount = calculateTotal(findCart.item);
        await findCart.save();
        res.json(findCart);    
        

    } catch(err) {
        console.error(err);
        res.status(500).json({message: err});
    }
    
}



export const updateCartItems = async (req, res) => {
    const {body, params:id} = req;
    try{
        const findCart = await Cart.findOne({_id:id.id})
        findCart.item = {
            quantity: body.quantity? body.quantity : findCart.item.quantity,
            price: body.price ? body.price : findCart.item.price
        }
        findCart.totalamount = calculateTotal(item)
        await findCart.save()
        res.status(202).json({message: "Updated successfully"})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

export const deleteCartItems = async (req, res) => {
    const {body, params:id} = req;
    try{
        const findCart = await Cart.findOne({_id:id.id})
        findCart.item.find({_id: body.id}).slice();
        findCart.totalamount = calculateTotal(item);
        await findCart.save()
        res.status(202).json({message: "deleted successfully"})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}
export const deleteCart = async (req, res) => {
    const {params:id} = req
    try{
        const deleteCart = await Cart.deleteOne({_id: id.id});
        res.status(204).json({message: "Deleted successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err});
    }
}

