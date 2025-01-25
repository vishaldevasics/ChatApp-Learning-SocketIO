import { useState , useEffect } from "react";
import axios from "axios";

const useGetConversations = () => {
  const [loading , setLoading] = useState(false);

  const [conversations , setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users");
        const data = response.data;
        if(data.error){
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getConversations();
  },[]);

  return {loading , conversations};
}

export default useGetConversations;