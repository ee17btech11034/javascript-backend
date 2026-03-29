import mongoose from 'mongoose'

const hospitalSchema = mongoose.Schema({}, {timestamps: true})


export const hospitalModel = mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)