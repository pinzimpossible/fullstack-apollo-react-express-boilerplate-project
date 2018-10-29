import React, { Component } from 'react'
import { Editor, convertFromRaw, EditorState } from 'draft-js';
import MessageDelete from '../MessageDelete';

class MessageItem extends Component{

  state = {
    editorState: EditorState.createEmpty(),
  }

  render(){
    const { message, me } = this.props
    console.log('message: ' ,message);
    const messageShow = EditorState.createWithContent(
      convertFromRaw(JSON.parse(message.text))
    );

    return(
      <div>
        <h3>{message.user.username}</h3>
        <small>{message.createdAt}</small>
        <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
          <Editor editorState={messageShow} readOnly/>
        </div>

        {me &&
          message.user.id === me.id && (
            <MessageDelete message={message} />
          )}
      </div>
    )
  }
}

export default MessageItem