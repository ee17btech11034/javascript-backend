import mongoose from 'mongoose'

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    diagnosedWith: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true // better to use enum here
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true
    },
    admittedIn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    },
    diagnosedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
}, {timestamps: true})


export const patientModel = mongoose.models.Patient || mongoose.model("Patient", patientSchema)