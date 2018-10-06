import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
	  currentUser: {name: "Karthik"}, // optional. if currentUser is not defined, it means the user is Anonymous
	  messages: [
	    {
	      username: "Bob",
	      content: "Has anyone seen my marbles?",
	      id: "1"
	    },
	    {
	      username: "Anonymous",
	      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
	      id: "2"
	    }
	  ]
	};
  }

  render() {
    return (
	  <div>
	    <NavBar />
        <MessageList messages={this.state.messages} />
  		<ChatBar name={this.state.currentUser.name} />
  	  </div>
    );
  }
}
export default App;
