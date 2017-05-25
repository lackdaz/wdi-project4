// import SimpleChatBot from '../components/SimpleChatBot/SimpleChatBot'
import SentimentBot from '../components/SentimentBot/SentimentBot'
import ChatBot from 'react-simple-chatbot';

// ReactDOM.render(
//   <div>
//     <ChatBot steps={steps} />
//   </div>,
//   // document.getElementById('root')
// );

import PropTypes from 'prop-types';
import React from 'react';

export default class MainApp extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      steps: this.props.steps,
      response: '',
    };

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    // this.state = { name: this.props.name };
  }
  //
  // updateName = (name) => {
  //   this.setState({ name });
  // };

  render() {
    return (
        <div>
          <ChatBot steps={this.state.steps} />
          <SentimentBot response={this.state.response} />
        </div>
    );
  }
}
