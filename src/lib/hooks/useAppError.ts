import { useEffect, useState } from "react";
import { IError, isInstanceOfIError, UnexpectedError } from "../../types/Error";
import { toast } from "react-toastify";

export const useAppError = (error: any) => {
  const [appError, setAppError] = useState<IError | null>(null);
  useEffect(() => {
    if (!error) {
      setAppError(error);
    } else if (isInstanceOfIError(error)) {
      setAppError(error);
    } else {
      setAppError(UnexpectedError);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return appError;
};
