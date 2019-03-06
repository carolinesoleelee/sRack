import React, { Component } from 'react';

class Channels extends Component {

    render(){
            const sorted = [...this.props.chats].sort((a, b) => a.id > b.id)
      return(
        <div className='chatsList'>
        <ul>
        <h3>Your chats:</h3>
            {sorted.map(chat => {
                const active = chat.id === this.props.chatId ? 'active' : '';
                return (
                    <li key={chat.id} className={"chat " + active}>
                        <a
                            onClick={() => this.props.subscribeToChat(chat.id)}
                            href="#">
                            # {chat.name}
                        </a>
                    </li>
                )
            })}
        </ul>
        </div>
      )
    }
}

export default Channels;
