import React, { useMemo } from "react";
import { useAppSelector } from "../../../lib/hooks/redux";
import { selectCurrentUser } from "../../../redux/reducers/authReducer";
import { Avatar as MUIAvatar } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

const avatarSizes = {
  sm: { width: 34, height: 34 },
  md: { width: 44, height: 44 },
  lg: { width: 54, height: 54 },
};

interface AvatarProps {
  size: "sm" | "md" | "lg";
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ size, src }) => {
  const user = useAppSelector(selectCurrentUser);

  const stringAvatar = useMemo(() => {
    return {
      sx: { ...avatarSizes[size], bgcolor: stringToColor(user.firstName) },
      children: `${user.firstName.substring(0, 1).toUpperCase()}${user.lastName.substring(0, 1).toUpperCase()}`,
    };
  }, [size, user.firstName, user.lastName]);

  if (src) {
    return <MUIAvatar sx={avatarSizes[size]} src={src} />;
  }

  return <MUIAvatar {...stringAvatar} />;
};

export default Avatar;
