/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object provided by react-image-crop
 */
import { Crop } from "react-image-crop";

export function getCroppedImg(image: string, crop: Crop): Promise<Blob> {
  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = image;
    img.onload = () => {
      let originalHeight = img.height;
      let originalWidth = img.width;
      let width = crop.unit === "%" ? (originalWidth * crop.width) / 100 : crop.width;
      let height = crop.unit === "%" ? (originalHeight * crop.height) / 100 : crop.height;

      let sourceX = crop.unit === "%" ? (originalWidth * crop.x) / 100 : crop.x;
      let sourceY = crop.unit === "%" ? (originalHeight * crop.y) / 100 : crop.y;

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, sourceX, sourceY, width, height, 0, 0, width, height);
      canvas.toBlob((file) => {
        if (file) {
          resolve(file);
        }
      });
    };
    img.onerror = reject;
  });
}
