import React, { useState } from "react";
// @ts-ignore
import styles from "./index.module.css";
import Avatar from "../../UI/avatar";
import Button from "./Button";
import PopupWindow from "../../utils/popup/PopupWindow";
import AvatarCropper from "../../UI/avatar/cropper";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUser } from "@/redux/reducers/authReducer";

const SettingsPhoto = () => {
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState<Blob | null>(null);
  const user = useAppSelector(selectCurrentUser);

  return (
    <div>
      <div className={styles.label}>Photo</div>
      <div className={styles.photoContainer}>
        <Avatar user={user} size={"sm"} src={image ? URL.createObjectURL(image) : undefined} />
        <Button onClick={() => setShowCropper(true)}>Change</Button>
        <Button>Remove</Button>
      </div>
      <PopupWindow hideFunction={() => setShowCropper(false)} transitionInState={showCropper}>
        <AvatarCropper hide={() => setShowCropper(false)} setResultingImage={(image) => setImage(image)} />
      </PopupWindow>
    </div>
  );
};

export default SettingsPhoto;
