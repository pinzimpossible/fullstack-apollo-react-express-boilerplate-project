import React, { Component } from 'react';
import { EditorState, convertToRaw  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../Error';

const CREATE_MESSAGE = gql`
  mutation($title: String!, $description: String!) {
    createMessage(title: $title, description: $description) {
      id
      # title,
      # description,
      createdAt
      user {
        id
        username
      }
    }
  }
`;

class MessageCreate extends Component {
  state = {
    title: '',
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleChangeInput = e => {
    const { name, value } = e.target
    this.setState({[name]: value});
  }

  onSubmit = async (event, createMessage) => {
    event.preventDefault();

    try {
      await createMessage();
      this.setState({ editorState: EditorState.createEmpty() });
    } catch (error) {}
  };

  render() {
    const { title, editorState } = this.state;
    const dataSubmit = { title, description: JSON.stringify(convertToRaw(editorState.getCurrentContent()))}

    return (
      <Mutation
        mutation={CREATE_MESSAGE}
        variables={dataSubmit}
        // Not used anymore because of Subscription

        // update={(cache, { data: { createMessage } }) => {
        //   const data = cache.readQuery({
        //     query: GET_ALL_MESSAGES_WITH_USERS,
        //   });

        //   cache.writeQuery({
        //     query: GET_ALL_MESSAGES_WITH_USERS,
        //     data: {
        //       ...data,
        //       messages: {
        //         ...data.messages,
        //         edges: [createMessage, ...data.messages.edges],
        //         pageInfo: data.messages.pageInfo,
        //       },
        //     },
        //   });
        // }}
      >
        {(createMessage, { data, loading, error }) => (
          <form
            onSubmit={event => this.onSubmit(event, createMessage)}
          >
            <h3>New message</h3>
            <div style={{marginBottom: 12, minHeight: 24}}  >
              <span><label>Title </label></span>
              <input 
                type='textarea' name='title' 
                style={{height: 18, minWidth: 250}} 
                onChange={this.handleChangeInput} 
              />
            </div>
            <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <button type="submit">Send</button>

            {error && <ErrorMessage error={error} />}
          </form>
        )}
      </Mutation>
    );
  }
}

export default MessageCreate;
