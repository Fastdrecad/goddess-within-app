import { toast } from "react-toastify";

export const useProductSubmit = (mutationFn, { successMessage, onSuccess }) => {
  return async (e, data) => {
    e.preventDefault();
    try {
      const result = await mutationFn(data).unwrap();
      toast.success(successMessage);
      if (onSuccess) {
        await onSuccess(result);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
};
