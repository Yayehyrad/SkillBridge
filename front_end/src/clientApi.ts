import { userSchema  } from "../../back_end/src/routes/user/user.validation"
import { IFormSchma } from "./forms/formSchema";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1/";

export const registerBackEnd = async (formData: IFormSchma) => {
    console.log(API_BASE_URL);
    console.log("from the register backe end api" , formData)
    const response = await fetch(`${API_BASE_URL}users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
  
    if (!response.ok) {
      throw new Error(responseBody.message);
    }
    return "success"
  };