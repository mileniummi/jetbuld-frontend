import React, { useMemo } from "react";
import { Avatar as MUIAvatar } from "@mui/material";
import { IUser } from "@/models/User";

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
  lg: { width: 54, height: 54 }
};

interface AvatarProps {
  size: "sm" | "md" | "lg";
  src?: string;
  user: IUser;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

const Avatar: React.FC<AvatarProps> = (
  {
    size,
    src,
    user,
    onClick,
    children,
    style,
    ref,
  }) => {
  const avatarSx = useMemo(() => {
    return {
      sx: {
        ...avatarSizes[size],
        bgcolor: "#fff",
        border: "1px solid #2B2929",
        color: "#2B2929",
        ...style
      },
      children: user.login.substring(0, 2).toUpperCase()
    };
  }, [size, user]);

  return <div><MUIAvatar ref={ref} src={src} onClick={onClick} {...avatarSx} /> {children} </div>;
};

export default Avatar;
