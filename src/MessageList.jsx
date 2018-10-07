import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
    return (
	  <main className='messages'>
	    {
	      this.props.messages.map((message) => {
	        return (<Message type={message.type} content={message.content} 
	        	username={message.username} key={message.id} />);
	      })
	    }
	  </main>
    );
  }
}
export default MessageList;