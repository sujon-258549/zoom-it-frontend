// utils/cloudinary.ts
 const uploadImageToCloudinary = async (
  file: File,
  cloudName: string,
  uploadPreset: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return await response.json();
};

export const uploadProfileImage = async (file: File) => {
  const cloudName = "ddzoqma5y";
  const uploadPreset = "altranative_product";

  try {
    const uploadedData = await uploadImageToCloudinary(
      file,
      cloudName,
      uploadPreset
    );
    return uploadedData.secure_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};