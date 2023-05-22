export interface IError {
  data: {
    statusCode: number;
    message: string;
  };
}

export const UnexpectedError: IError = {
  data: {
    statusCode: 400,
    message: "Unexpected error has occurred",
  },
};

export function isInstanceOfIError(obj: any): obj is IError {
  return (
    (obj as IError)?.data !== undefined &&
    (obj as IError)?.data?.statusCode !== undefined &&
    (obj as IError)?.data?.message !== undefined
  );
}

