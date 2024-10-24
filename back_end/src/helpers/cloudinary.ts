import { v2 as cloudinary } from "cloudinary";

// Configure with environment data
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const uploadMediaToCloudinary = async (filePath: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading to Cloudinary");
  }
};

const deleteMediaFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete asset from Cloudinary");
  }
};

export { uploadMediaToCloudinary, deleteMediaFromCloudinary };