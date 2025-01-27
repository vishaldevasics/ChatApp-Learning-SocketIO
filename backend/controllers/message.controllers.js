import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getRecieverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try{
    
    const {message} = req.body;
    const {id : recieverId} = req.params;
    const senderId = req.user._id;
    
    let conversaton = await Conversation.findOne({participants : {
      $all : [senderId,recieverId]}
    });
    
    if(!conversaton){
      conversaton = await Conversation.create({
        participants : [senderId,recieverId]
      });
    }
    
    const newMessage = await Message({
      senderId,
      recieverId,
      message
    });
    

    if(newMessage){
      conversaton.messages.push(newMessage._id);
    }
    
    // await conversaton.save();
    // await message.save();
    
    await Promise.all([conversaton.save(),newMessage.save()]); //This will run in parallel
    
    //Socket.io will be implemented here
    const receiverSocketId = getRecieverSocketId(recieverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
  try{
    
    const {id : userToChatId} = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({participants : {
      $all : [senderId,userToChatId]
    }}).populate('messages');
    
    if(!conversation){
      return res.status(200).json([]);
    }    
    res.status(200).json(conversation.messages);
  }
  catch(error){
    console.log('Error in sendMessage controller',error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}