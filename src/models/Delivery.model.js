import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema ({
    
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productName:{
        type: mongoose.Schema.Types.String,
        requirted: true
    },
    NumberOfItems: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    price:{
        type: mongoose.Schema.Types.Number,
        required: true
    },
    deliveryAddress: {
        street: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        city: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        state: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        zipcode: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        country: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },
    deliveryStatus: {
        type: mongoose.Schema.Types.String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    created: {
        type: Date,
    }
}, {timestamps: true});

export const Delivery = mongoose.model("Delivery", DeliverySchema);