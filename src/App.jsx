import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
	  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
	  messages: [],
	  onlineUsers: {count: "0"}
	};
	this.socket = null;
  }

	componentDidMount() {
		const url = 'ws://localhost:3001';
		this.socket = new WebSocket(url);
		this.socket.onopen = function() {
			console.log('Open web socket...');
		};
		this.socket.onmessage = event => {
			const newMessage = JSON.parse(event.data);
			const messages = this.state.messages.concat(newMessage);
			console.log(messages);
			switch(newMessage.type) {
			  case "incomingMessage":
			    this.setState({messages: messages});
			    break;
			  case "incomingNotification":
				this.setState({messages: messages});
			    break;
			  case "clientCount":
			    this.setState({onlineUsers:{count:newMessage.count}});
			    break;
			  default:
			    // show an error in the console if the message type is unknown
			    throw new Error("Unknown event type " + newMessage.type);
			}
		}
		this.socket.onclose = function(e) {
			console.log('closed');
		}
		this.socket.onerror = function(e) {
			console.log('error');
		}
  	};
  
  // Update current user to the state
  updateUser = username => {
  	this.setState({currentUser:{name:username}});
   };
  
  // Send new message to the state
  addMessage = (content, username) => {
  	const newMessage = {
      username: username,
      content: content,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(newMessage));
  };

  // Send username change notification
  sendNotification = (oldUsername, newUsername) => {
  	const newNotification = {
      content: `${oldUsername} has changed their name to ${newUsername}`,
      type: "postNotification"
    };
    if (oldUsername.trim() !== newUsername.trim()) {
      this.socket.send(JSON.stringify(newNotification));	
    }
  };
  render() {
    return (
	  <div>
	    <NavBar count={this.state.onlineUsers.count} />
        <MessageList messages={this.state.messages} />
  		<ChatBar name={this.state.currentUser.name} 
  			addMessage={this.addMessage} 
  			updateUser={this.updateUser} 
  			sendNotification={this.sendNotification}/>
  	  </div>
    );
  }
}
export default App;