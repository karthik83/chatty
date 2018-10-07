import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.addMessage = this.addMessage.bind(this);
    // this is the *only* time you should assign directly to state:
    this.state = {
	  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
	  messages: []
	};
	this.socket = null;
  }

	componentDidMount() {
		const url = 'ws://localhost:3001';
		this.socket = new WebSocket(url);
		console.log(this.socket);
		this.socket.onopen = function() {
			console.log('Open web socket...');
		};
		this.socket.onmessage = event => {
			const newMessage = JSON.parse(event.data);
			const messages = this.state.messages.concat(newMessage);
			console.log(messages);
			this.setState({messages: messages});
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
  
  // Add new message to the state
  addMessage = (content, username) => {
  	const newMessage = {
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  };

  render() {
    return (
	  <div>
	    <NavBar />
        <MessageList messages={this.state.messages} />
  		<ChatBar name={this.state.currentUser.name} 
  			addMessage={this.addMessage} 
  			updateUser={this.updateUser} />
  	  </div>
    );
  }
}
export default App;