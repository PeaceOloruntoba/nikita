import { toast } from "sonner";

export const handleError = (error) => {
  const { response } = error;
  if (response) {
    toast.error(response.message);
  }
  toast.error(error?.message);
  console.log(error)
};
