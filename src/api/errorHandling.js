import toast from "react-hot-toast";

export const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    console.log(`Error ${status}: ${data.message}`);
    toast.error(`Error ${status}: ${data.message}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.log("Network error:", error.message);
    toast.error(
      "Network error: Please check your network or refresh your page."
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error:", error.message);
    toast.error(`Error: ${error.message}`);
  }
};
