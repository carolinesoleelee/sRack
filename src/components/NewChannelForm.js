import React, { Component } from 'react';

class NewChannelForm extends Component {

    constructor(){
      super()
      this.state = {
        channel: ''
      }
    }

    handleChange = (e) => {
      this.setState({
        channel: e.currentTarget.value
      })
    }

    handleSubmit(e) {
      e.preventDefault()
      this.props.createRoom(this.state.channel)
      this.setState({
        channel: ''
      })
    }

    render(){
      return(
        <div className='createChannel'>
           <form onSubmit={this.handleSubmit}>
                <input
                    value={this.state.channel}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Add a channel"
                    required />
                <button id="createButton" type="submit">+</button>
            </form>
        </div>
      )
    }
}

export default NewChannelForm;
