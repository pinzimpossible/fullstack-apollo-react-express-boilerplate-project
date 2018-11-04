import React, { Component } from 'react'
import { Editor as EditorWysiwyg} from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState } from 'draft-js';
import MessageDelete from '../MessageDelete';

class MessageItem extends Component{

  state = {
    editorState: EditorState.createEmpty(),
  }

  render(){
    const { message, me } = this.props
    // console.log('message: ' ,message);
    const messageShow = message && EditorState.createWithContent(
      convertFromRaw(JSON.parse(message.description))
    );

    return(
      <div>
        <h3>{message.user.username}</h3>
        <div><span>Title: <label>{message.title}</label></span></div>
        <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
          <EditorWysiwyg editorState={messageShow} readOnly toolbarHidden />
        </div>
        <div><small>Created at: {new Date(Number(message.createdAt)).toLocaleString()}</small></div>

        {me &&
          message.user.id === me.id && (
            <MessageDelete message={message} />
          )}
      </div>
    )
  }
}

export default MessageItem