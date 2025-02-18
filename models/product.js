import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key : {
        type: String,
        required: true,
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    category : {
        type: String,
        required: true,
        default: "Uncategorized"
    },
    dimensions : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    availability : {
        type: Boolean,
        required: true,
        default: true
    },
    image : {
        type: [String],
        required: true,
        default: ["https://th.bing.com/th/id/R.3e84bbc1a638f957aa80db814b1554a2?rik=IoLnRX89yNVwUA&pid=ImgRaw&r=0&sres=1&sresct=1"]
    }
});
// create a model for the schema
const Product = mongoose.model("products", productSchema);

export default Product;