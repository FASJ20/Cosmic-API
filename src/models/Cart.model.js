import mongoose from "mongoose";

const CartSchema = new mongoose.Schema ({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    item: [{
        productid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: mongoose.Schema.Types.Number,
            required: true,
            min: 1
        },
        price: {
            type: mongoose.Schema.Types.Number,
            required: true
        }
    }],
    totalamount: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    
    
},
{timestamps: true}
);

export const Cart = mongoose.model("Cart", CartSchema);