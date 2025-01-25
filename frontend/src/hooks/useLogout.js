import { useState } from "react";
import { useAuthContext } from "../context/Auth.Context";
import axios from "axios";

const useLogout = () => {
  const [loading,setLoading] = useState(false);

  const {setAuthUser} = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/logout", {
        withCredentials: true
      });
      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };

  return {loading, logout};
}

export default useLogout;