import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    logo: {
        type: String,   // url fetch for file
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    userId: 
        [
            {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
            }
        ],
},{timestamps:true})


export const Company = mongoose.model("Company", companySchema)