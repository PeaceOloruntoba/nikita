import { toast } from "sonner";

export const handleError = (error) => {
  const { response } = error;
  if (response) {
    toast.error(response.data.message);
  } else {
    toast.error(error?.message);
  }
  console.log(error);
};
