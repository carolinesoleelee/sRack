import React from 'react'

const Message =(props)=> {
  return (
    <div className='chat'>
      <div className='chatUser'>The persons username</div>
      <div className='chatText'>The persons message</div>
    </div>
  )
}

export default Message;
