import mongoose from 'mongoose'

// mini model
const orderItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItems: {
        type: [orderItemsSchema]
    },
    address: { // we can create a different schema for address as well
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Cacelled", "Delivered"],
        default: "Pending"
    }
}, {timestamps: true})


export const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema)


/*
OrderItems me single type ka object ki kitni pieces hai wo kaise kre, 
    we need another Schema. 
    We are defining a small schema  here fo that


OrderStatus: We are telling that can be choosen from ist or options
*/