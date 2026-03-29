import mongoose from 'mongoose'

const medicalRecordSchema = mongoose.Schema({}, {timestamps: true})


export const medicalRecordModel = mongoose.models.MedicalRecord || mongoose.model("MedicalRecord", medicalRecordSchema)