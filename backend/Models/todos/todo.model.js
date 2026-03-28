// todo.model.js tells that it is JS file but related to Data Models for Todo.

import mongoose from "mongoose" 

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: { // is this completed. mark it if all subtodos are completed
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subTodos: [ // arr of subtodos
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo"
        }
    ]
}, {timestemps: true})


export const TodoModel = mongoose.model("Todo", todoSchema)