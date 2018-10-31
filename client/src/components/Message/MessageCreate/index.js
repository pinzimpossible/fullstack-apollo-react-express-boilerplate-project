import React, { Component } from 'react';
import { EditorState, convertToRaw  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import ErrorMessage from '../../Error';

const CREATE_MESSAGE = gql`
  mutation($text: String!) {
    createMessage(text: $text) {
      id
      text
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
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    
  };

  onSubmit = async (event, createMessage) => {
    event.preventDefault();
    
    const contentState = this.state.editorState.getCurrentContent();
    // let html = stateToHTML(contentState)
    // console.log('html: ',html);
    console.log('raw: ' ,JSON.stringify(convertToRaw(contentState)));

    try {
      // await createMessage();
      this.setState({ editorState: EditorState.createEmpty() });
    } catch (error) {}
  };

  render() {
    const { editorState } = this.state;

    return (
      <Mutation
        mutation={CREATE_MESSAGE}
        variables={{ text: JSON.stringify(convertToRaw(editorState.getCurrentContent())) }}
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
            <div style={{maxWidth: 800, border: '1px solid #448aff', marginBottom: 12}} >
              <Editor
                // initialEditorState={editorState}
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
