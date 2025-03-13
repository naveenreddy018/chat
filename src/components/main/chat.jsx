import React from 'react'
import Slide_Bar from '../slide_bar/slide'
import Response_Bar from '../response_bar/response'
import "./chat.css"

function Chat() {
  return (
    <div className='chat_interface'>
      <Slide_Bar />
      <Response_Bar />
    </div>
  )
}

export default Chat
