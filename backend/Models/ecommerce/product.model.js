import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    productImage: {
         type: String, // if single image or else [{}, {}] -> arr of images
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        default: 0,
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.OjectId,
        ref: "Category",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Product = mongoose.model("Product", productSchema) // products banega