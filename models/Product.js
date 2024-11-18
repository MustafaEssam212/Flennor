import mongoose from 'mongoose';


const Product = new mongoose.Schema({
    partNum: {type: String, required: true},
    partName: {type: String, required: true},
    productId: {type: String, required: true},
    brands: [],
    models: {type: Object, required: true},
    oemNums: [],
    brandsOems: {type: Object},
    vehiclesInfo: {type: Object},
    image: {type: String, required: true}
})

export default mongoose.models.Product || mongoose.model("Product", Product)