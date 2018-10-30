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
      convertFromRaw(JSON.parse(message.text))
    );

    return(
      <div>
        <h3>{message.user.username}</h3>
        <small>{message.createdAt}</small>
        <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
          <EditorWysiwyg editorState={messageShow} readOnly toolbarHidden />
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