const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

export async function uploadImage(file) {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary isn't configured yet — add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to a .env file."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || "Image upload failed.");
  }

  const data = await res.json();
  return data.secure_url;
}
