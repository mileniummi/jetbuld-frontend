import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedImg } from "./getCroppedImage";
import Button from "@/components/settings/settingsUI/Button";
// @ts-ignore
import styles from "./index.module.css";
// @ts-ignore
import settingsStyles from "@/components/settings/settingsUI/index.module.css";
import classNames from "classnames";

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
      setResultingImage(image);
      hide();
    }
  };

  return (
    <>
      <label className={classNames(styles.label, imgSrc && styles.small)}>
        <input hidden type="file" accept="image/*" onChange={onSelectFile} />
        <p className={classNames(styles.labelText, imgSrc && styles.small)}>
          Click to select&nbsp;{imgSrc ? "another" : ""}&nbsp;file
        </p>
      </label>
      {imgSrc && (
        <>
          <ReactCrop
            style={{ maxWidth: "800px", maxHeight: "600px" }}
            circularCrop
            aspect={1}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
          >
            <img ref={imageRef} alt="Crop me" src={imgSrc} />
          </ReactCrop>
          <div className={styles.separator}> </div>
          <div className={styles.buttons}>
            <Button variant="green" onClick={setResult}>
              Accept
            </Button>
            <Button onClick={() => hide()}>Cancel</Button>
          </div>
        </>
      )}
    </>
  );
};

export default AvatarCropper;
