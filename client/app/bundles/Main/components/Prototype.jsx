import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

import { Wit, log } from 'node-wit'

class EndCallback extends Component {
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values }) {
    console.log(steps);
    console.log(values);
    alert(`Chat handleEnd callback! Number: ${values[0]}`);
  }

  render() {
    return (
      <div className="docs-example-1">
        <ChatBot
          handleEnd={this.handleEnd}
          steps={[
            {
              id: '1',
              message: 'Pick a number',
              trigger: '2',
            },
            {
              id: '2',
              options: [
                { value: '1', label: '1', trigger: '3' },
                { value: '2', label: '2', trigger: '3' },
                { value: '3', label: '3', trigger: '3' },
                { value: '4', label: '4', trigger: '3' },
                { value: '5', label: '5', trigger: '3' },
              ],
            },
            {
              id: '3',
              message: 'A callback message was called!',
              end: true,
            },
          ]}
        />
      </div>
    );
  }
}

export default EndCallback;
