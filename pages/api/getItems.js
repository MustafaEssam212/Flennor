import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const { text, brand, page = 1 } = req.query;
            const limit = 6;
            const skip = (parseInt(page) - 1) * limit;

            let regularText = '';
            let formattedText = '';
            let brandText = '';

            // Extract and format the text query
            if (text) {
                formattedText = text.replace(/\s+/g, '').toUpperCase();
                regularText = text;
            }

            // Extract the brand query
            if (brand) {
                brandText = brand;
            }

            // Extract the models array from query parameters
            const models = Object.keys(req.query)
                .filter(key => key.startsWith('model['))
                .map(key => req.query[key]);

            // Construct the MongoDB query object
            const query = {};

            // If there is a text query, search by partNum, oemNums, or partName using regex
            if (formattedText || regularText) {
                query.$or = [];
                
                if (formattedText) {
                    query.$or.push(
                        { partNum: { $regex: formattedText, $options: 'i' } },
                        { oemNums: { $regex: formattedText, $options: 'i' } }
                    );
                }

                if (regularText) {
                    query.$or.push(
                        { partName: { $regex: regularText, $options: 'i' } }
                    );
                }
            }

            // Filter by brand if brandText is provided
            if (brandText) {
                query.brands = brandText;
            }

            // If models are provided, filter by matching models in the models object
            if (models.length > 0) {
                query.$and = models.map(model => ({
                    [`models.${brandText}`]: { $in: models }
                }));
            }

            // If no filters are applied (i.e., no query parameters), return all products
            const isQueryEmpty = !text && !brand && models.length === 0;
            const [products, documentCount] = await Promise.all([
                Product.find(isQueryEmpty ? {} : query)
                    .skip(skip)
                    .limit(limit),
                Product.countDocuments(isQueryEmpty ? {} : query)
            ]);

            return res.status(200).json({ products, totalCount: documentCount });

        } catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({ message: 'An error occurred while fetching products.' });
        }
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
};
