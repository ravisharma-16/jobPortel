import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    export const cloudinaryupload = async (localfilepath) =>
    {
        try {
    if (!localfilepath) return null;

    // Upload to cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary:", response.url);

    // ✅ Delete only if file still exists
    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
    }

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // ✅ Prevent crash if file doesn't exist
    if (fs.existsSync(localfilepath)) {
      fs.unlinkSync(localfilepath);
    }
    return null;
  }
    }