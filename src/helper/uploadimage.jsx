const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  // Validate image parameter
  if (!(image instanceof File)) {
    throw new Error('Provided argument is not a valid File object');
  }

  // Validate file type and size (optional)
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(image.type)) {
    throw new Error('Unsupported file type');
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (image.size > maxSize) {
    throw new Error('File size exceeds 5MB');
  }

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  try {
    const dataResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!dataResponse.ok) {
      const errorText = await dataResponse.text();
      throw new Error(`Error uploading image: ${errorText}`);
    }

    const data = await dataResponse.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error('Cloudinary did not return a secure_url');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export default uploadImage;
