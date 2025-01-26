import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


const useSendMessage = () => {
  const [loading , setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation ();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/messages/send/${selectedConversation._id}`, {
        message,
        conversationId: selectedConversation._id
      },
      {
        withCredentials: true
      }
      );
      const data = response.data;
      if(data.error){
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {loading, sendMessage};
}

export default useSendMessage;