import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema ({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    vendorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageurl: {
        type: mongoose.Schema.Types.String,
    },
    inventory: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    isActive: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    },
    features: {
        type: mongoose.Schema.Types.String,
    },
    ratings: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: mongoose.Schema.Types.Number
        },
        review: {
            type: mongoose.Schema.Types.String
        },
        
    }],
 
},
{timestamps: true}
);

export const Product = mongoose.model("Product", ProductSchema);