import { toast } from "react-hot-toast";

export const setErrorToast = (error: string, duration = 3000) => {
  toast.error(error, { duration });
};
