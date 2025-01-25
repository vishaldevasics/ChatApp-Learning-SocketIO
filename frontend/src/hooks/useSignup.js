import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/Auth.Context";

const useSignup = () => {
  const [loading,setLoading] = useState(false);

  const {setAuthUser} = useAuthContext();

  const signup = async ({firstName, lastName, username, password, confirmPassword, gender}) => {
    const success = handleInputErrors({firstName,lastName,username,password,confirmPassword,gender});

    if(!success){
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        username,
        password,
        confirmPassword,
        gender,
      });
    
      const data = response.data;
    
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    
    } catch (error) {
      if(error.response.status === 400){
        toast.error(error.response.data.message);
      }
      else toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {loading,signup};
}

export default useSignup

function handleInputErrors({ firstName, lastName, username, password, confirmPassword, gender }) {
  console.log("Validating inputs:",  firstName, lastName, username, password, confirmPassword, gender ); // Debugging

  if (!firstName || !lastName || !username || !password || !confirmPassword || !gender) {
    toast.error("All fields are required");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
