import React, {Component} from 'react';
class ChatBar extends Component {

// Enter key event handler
handleMessageKeyPress = (event) => {
  if(event.key == 'Enter'){
  	let username = document.getElementById('username').value;
  	if (username === null || username === "") {
 	  username = "Anonymous";
  	}
  	if (event.target.value !== null && event.target.value.trim() !== "") {
  	  this.props.updateUser(username);
  	  this.props.addMessage(event.target.value, username);
  	}
    event.target.value = "";
  }
}
  render() {
    return (
      <footer className='chatbar'>
  	    <input id='username' maxLength='30' className='chatbar-username' placeholder='Your Name (Optional)' defaultValue={this.props.name} />
  	    <input id='message' maxLength='280' className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyPress={this.handleMessageKeyPress} />
	  </footer>
    );
  }

}
export default ChatBar;