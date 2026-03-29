import mongoose from 'mongoose'

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number, // can be string as well for precision
        required: true
    },
    qualifications: {
        type: [{degree: String}], // arr of degrees
        required: true
    },
    experience: {
        type: Number,
        default: 0
    },
    worksinhospitals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        }
    ]
}, {timestamps: true})


export const doctorModel = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema)