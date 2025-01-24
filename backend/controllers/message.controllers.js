import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

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
      res.status(200).json(newMessage);
    }
    
    //Socket.io will be implemented here

    // await conversaton.save();
    // await message.save();

    await Promise.all([conversaton.save(),newMessage.save()]); //This will run in parallel
  }
  catch(error){
    console.log('Error in sendMessage controller',error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
}

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