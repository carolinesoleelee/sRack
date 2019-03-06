import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit'
import ChatForm from './components/ChatForm'
import ChatList from './components/ChatList'
import Channels from './components/Channels'
import NewChannelForm from './components/NewChannelForm'

import { tokenUrl, instanceLocator } from './token'

class App extends Component {

  constructor(){
    super()
    this.state = {
      chatId: null,
      messages: [],
      connectToChats: [],
      connectedChats:[]
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToChat = this.subscribeToChat.bind(this)
    this.getChats = this.getChats.bind(this)
    this.createChat = this.createChat.bind(this)
}

componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'cslee95',
        tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
        })
    })

    chatManager.connect()
    .then(currentUser => {
        this.currentUser = currentUser
        this.getChats()
    })
    .catch(err => console.log('error on connecting: ', err))
}

getChats() {
    this.currentUser.getConnectToChats()
    .then(connectToChats => {
        this.setState({
            connectToChats,
            connectedChats: this.currentUser.chats
        })
    })
    .catch(err => console.log('error on connectToChats: ', err))
}

subscribeToChat(chatId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToChat({
        chatId: chatId,
        hooks: {
            onNewMessage: message => {
                this.setState({
                    messages: [...this.state.messages, message]
                })
            }

        }
    })
    .then(chat => {
        this.setState({
            chatId: chat.id
        })
        this.getChats()
    })
    .catch(err => console.log('error on subscribing to chat: ', err))
}

sendMessage(text) {
    this.currentUser.sendMessage({
        text,
        chatId: this.state.chatId
    })
}

createChat(name) {
    this.currentUser.createChat({
        name
    })
    .then(chat => {
        this.subscribeToChat(chat.id)
    })
    .catch(err => console.log('error with createChat: ', err))
}

  render() {
    return (
      <div className="App">
          <ChatList
              chatId={this.state.chatId}
              messages={this.state.messages} />
          <Channels
              subscribeToChat={this.subscribeToChat}
              chats={[...this.state.connectToChats, ...this.state.connectedChats]}
              chatId={this.state.chatId} />
          <NewChannelForm
              createChat={this.createChat} />
          <ChatForm
              disabled={!this.state.chatId}
              sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
