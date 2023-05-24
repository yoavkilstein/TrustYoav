import React, { useContext } from 'react'
import Messages from "./Messages"; 
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const{data} = useContext(ChatContext);  // use ChatContext to get data

  return (
    <div className='chat'>
      <div className="chatInfo"> 
        <span>{data.user?.displayName}</span> {/*display the user's display name*/}
        <div className="chatIcons">
          {}        {/*placeholder for chat icons */}
        </div> 
      </div>
        <Messages /> {/*display messages*/}
        <Input/> {/*input field for new messages*/}
    </div>
  )
}

export default Chat