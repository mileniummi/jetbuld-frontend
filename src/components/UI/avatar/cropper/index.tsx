import React, { useRef, useState } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "./getCroppedImage";

interface AvatarCropperProps {
  setResultingImage: (image: Blob) => void;
  hide: () => void;
}

const defaultCrop: Crop = {
  unit: "%", // Can be 'px' or '%'
  x: 25,
  y: 25,
  width: 50,
  height: 50,
};

const AvatarCropper: React.FC<AvatarCropperProps> = ({ setResultingImage, hide }) => {
  const [imgSrc, setImgSrc] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>(defaultCrop);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      // setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader();
      // @ts-ignore
      reader.addEventListener("load", () => setImgSrc(reader.result.toString() || ""));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const setResult = async () => {
    if (crop && imageRef.current) {
      const image = await getCroppedImg(imageRef.current.src, crop);
      console.log(image);
      setResultingImage(image);
      hide();
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      <ReactCrop circularCrop aspect={1} crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)}>
        <img ref={imageRef} alt="Crop me" src={imgSrc} />
      </ReactCrop>
      <button type="button" onClick={setResult}>
        Accept
      </button>
    </>
  );
};

export default AvatarCropper;
