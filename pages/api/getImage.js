import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import mime from 'mime-types';
import sharp from 'sharp';

export default async function GetImage(req, res) {

      // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }


    if(req.method === 'GET'){
        try {
            const filePath = path.join(process.cwd(), 'uploads', 'products', req.query.productId, req.query.image);
            const mimeType = mime.lookup(filePath);
    
            if (!mimeType) {
                return res.status(400).send('Unsupported file type');
            }
    
            const fileContent = await fsPromises.readFile(filePath);
            let processedImage;
    
            if (mimeType.startsWith('image/jpeg')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            } else if (mimeType.startsWith('image/png')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .png({ compressionLevel: 8 })
                    .toBuffer();
            } else {
                processedImage = fileContent;
            }
    
            res.setHeader('Content-Type', mimeType);
            res.send(processedImage);
    
        } catch (err) {
            console.error('Error processing image:', err);
            res.status(404).send('File not found');
        }
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
};
