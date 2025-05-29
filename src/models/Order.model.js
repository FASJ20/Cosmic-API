import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema ({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: {
            type: mongoose.Schema.Types.String
        },
        quantity: {
            type: mongoose.Schema.Types.Number
        },
        price: {
            type: mongoose.Schema.Types.Number
        },
    }],
    totalamount: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    shippingaddress: {
        street: {
            type: mongoose.Schema.Types.String,
        },
        city: {
            type: mongoose.Schema.Types.String
        },
        state: {
            type: mongoose.Schema.Types.String
        },
        zipcode: {
            type: mongoose.Schema.Types.String
        },
        country: {
            type: mongoose.Schema.Types.String
        },
    },
    status: {
        type: mongoose.Schema.Types.String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentstatus: {
        type: mongoose.Schema.Types.String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    
},
{timestamps: true}
);
export const Order = mongoose.model("Order", OrderSchema)