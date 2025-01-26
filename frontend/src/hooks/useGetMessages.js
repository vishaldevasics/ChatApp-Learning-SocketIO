import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/messages/${selectedConversation._id}`);
        const data = response.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if(selectedConversation?._id) getMessages();
  }, [selectedConversation?._id,setMessages]);
  

  return {loading, messages};
};

export default useGetMessages;