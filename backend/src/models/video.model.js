import mongoose, {Schema, model} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema({
    videosFile: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // can get from cloudinary response
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})


videoSchema.plugin(mongooseAggregatePaginate) // add as plugin -> plugin helps us in pagination, like how many videos we want to show on each page etc.
export const videoModel = model("Video", videoSchema)