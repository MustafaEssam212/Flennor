import mongoose from 'mongoose';


const Brands = new mongoose.Schema({
    brand: {type: String, requried: true},
    models: []
})

export default mongoose.models.Brands || mongoose.model("Brands", Brands)