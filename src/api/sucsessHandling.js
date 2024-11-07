import toast from "react-hot-toast";

export const handleSuccess = (response, message) => {
  if (response.status) {
    console.log(`Success ${response.status}: ${response.data.message}`);
    toast.success(`Success: ${message}`);
  } else {
    console.log("Success: Operation completed successfully.");
    toast.success("Success: Operation completed successfully.");
  }
};
