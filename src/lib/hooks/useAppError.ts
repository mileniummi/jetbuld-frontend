import { useEffect, useState } from "react";
import { IError, isInstanceOfIError, UnexpectedError } from "@/models/Error";
import { toast } from "react-toastify";
import { EAuthErrorMessage, EAuthErrorToast } from "@/lib/constants/errors";
import { useNavigate } from "react-router-dom";

export const useAppError = (error: any) => {
  const [appError, setAppError] = useState<IError | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!error) {
      setAppError(error);
    } else if (isInstanceOfIError(error)) {
      switch (error.data.message) {
        case EAuthErrorMessage.Unauthorized: {
          setAppError(null);
          toast.error(EAuthErrorToast.Unauthorized);
          navigate("/login");
          break;
        }
        case EAuthErrorMessage.NeedsEmailActivation: {
          toast.error(EAuthErrorToast.NeedsEmailActivation);
          break;
        }

        default: {
          toast.error(error.data.message);
        }
      }
      setAppError(error);
    } else {
      setAppError(UnexpectedError);
      toast.error(error.data.message);
    }
  }, [error, navigate]);

  return appError;
};
