import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
    return (
	  <main className='messages'>
	    {
	      this.props.messages.map((message) => {
	        return (<Message content={message.content} username={message.username} />);
	      })
	    }
	    <div className='message system'>
	      Anonymous1 changed their name to nomnom.
	    </div>
	  </main>
    );
  }
}
export default MessageList;