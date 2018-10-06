import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
	  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
	  messages: [
	    {
	      id: "1",
	      username: "Bob",
	      content: "Has anyone seen my marbles?"
	    },
	    {
	      id: "2",
	      username: "Anonymous",
	      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
	    },
	    {
	      id: "3",
	      username: "Sam",
	      content: "I found it, Buddy!"
	    }
	  ]
	};
  }

	componentDidMount() {
	  setTimeout(() => {
	    // Add a new message to the list of messages in the data store
	    const newMessage = {username: "Michelle", content: "No no no no, that is a different one!", id: "4"};
	    const messages = this.state.messages.concat(newMessage);
	    // Update the state of the app component.
	    // Calling setState will trigger a call to render() in App and all child components.
	    this.setState({messages: messages});
	  }, 3000);
	};
  
  // Update current user to the state
  updateUser = username => {
  	this.setState({currentUser:{name:username}});
   };
  
  // Add new message to the state
  addMessage = (content, username) => {
  	const newMessage = {
      id: this.state.messages.length + 1,
      username: username,
      content: content
    };
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
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