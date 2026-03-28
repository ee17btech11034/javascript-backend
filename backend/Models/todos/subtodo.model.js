import mongoose from 'mongoose'


const subTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    // we can add createdBy as well here
}, {timestamps: true})


export const subTodoModel = mongoose.model("SubTodo", subtodoSchema)