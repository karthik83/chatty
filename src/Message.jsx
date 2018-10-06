import React, {Component} from 'react';
class MessageList extends Component {
  render() {
    return (
      <div className = "message">
        <span className="message-username"> {this.props.username}</span>
        <span className="message-content">{this.props.message}</span>
      </div>
    );
  }
}
export default MessageList;