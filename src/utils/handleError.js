import { toast } from "sonner";

export const handleError = (error) => {
  console.error(error);
  const { response } = error;
  if (response?.message) {
    toast.error(response.message);
  } else {
    toast.error("Something went wrong");
  }
};
