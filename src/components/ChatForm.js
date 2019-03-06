import React, { Component } from 'react';

class ChatForm extends Component {

    constructor() {
      super()
      this.state = {
        message: ''
      }
    }

    handleChange = (e) => {
      this.setState({
        message: e.currentTarget.value
      })
    }

    handleSubmit(e) {
      e.preventDefault()
      this.props.sendMessage(this.state.message)
      this.setState({
        message: ''
      })
    }

    render(){
      console.log(this.state.message)
      return(
        <form onSubmit={this.handleSubmit} className='messageForm'>
            <input
                    disabled={this.props.disabled}
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message"
                    type="text" />
        </form>
      )
    }
}

export default ChatForm;
