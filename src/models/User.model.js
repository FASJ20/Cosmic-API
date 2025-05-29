import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    firstname: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    lastname: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    addresses: [{
            street: {
                type: mongoose.Schema.Types.String,
            },    
            city: {
                type: mongoose.Schema.Types.String,
            },
            state: {
                type: mongoose.Schema.Types.String,
            }, 
            zipcode: {
                type: mongoose.Schema.Types.String,
            }, 
            country: {
                type: mongoose.Schema.Types.String,
            }, 
            isdefault: {
                type: mongoose.Schema.Types.Boolean,
            },
    }],
},
{timestamps: true}
)
       
export const User = mongoose.model("User", UserSchema);    
