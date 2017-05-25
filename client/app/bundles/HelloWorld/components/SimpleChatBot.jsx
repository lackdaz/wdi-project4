import ChatBot from 'react-simple-chatbot';
//
const steps = [
  {
    id: '0',
    message: 'Welcome!!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'I am Raymond. What is your name?',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: 'Hello {previousValue}!',
    end: true,
    trigger: '6'
  },
  {
    id: '5',
    message: 'You are so smart!',
    end: true,
  },
  {
    id: '6',
    message: 'Bye!',
    end: true,
  },
];

// ReactDOM.render(
//   <div>
//     <ChatBot steps={steps} />
//   </div>,
//   // document.getElementById('root')
// );

import PropTypes from 'prop-types';
import React from 'react';

export default class HelloWorld extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor(props, _railsContext) {
    super(props);

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
          <ChatBot steps={steps} />
        </div>
      // <div>
      //   <h3>
      //     Hello, {this.state.name}!
      //   </h3>
      //   <hr />
      //   <form >
      //     <label htmlFor="name">
      //       Say hello to:
      //     </label>
      //     <input
      //       id="name"
      //       type="text"
      //       value={this.state.name}
      //       onChange={(e) => this.updateName(e.target.value)}
      //     />
      //   </form>
      // </div>
    );
  }
}
