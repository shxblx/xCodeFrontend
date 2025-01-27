import userRoutes from "../endpoints/userEndpoints";
import Api from "./axiosConfig";

export const signup = async (email) => {
  try {
    const response = await Api.post(userRoutes.signup, email);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      return error.response;
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};
