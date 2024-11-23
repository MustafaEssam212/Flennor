import dbConnect from "@/utils/dbConnect";
import Brands from "@/models/Brands";


export default async function getBrands(req, res){

    await dbConnect();

    if(req.method === 'GET'){
        const brands = await Brands.find({});
        return res.status(200).send(brands);
    }

}


export const config = {
    api: {
        externalResolver: true,
    },
};