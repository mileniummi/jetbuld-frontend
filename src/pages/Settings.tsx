import React from "react";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUser } from "@/redux/reducers/authReducer";
import PageNotFound from "@/components/PageNotFound";
import { UserSettings } from "@/components/settings/UserSettings/UserSettings";

const Settings = () => {

  const user = useAppSelector(selectCurrentUser)
  if (!user) {
    return <PageNotFound />
  }
  return <UserSettings user={user} />
};

export default Settings;
