import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: true})

// export const categoryModel = mongoose.model("Category", categorySchema) // categories me store krta hai.



// Avoid recompiling the model if already exists (important in hot-reload environments)
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);