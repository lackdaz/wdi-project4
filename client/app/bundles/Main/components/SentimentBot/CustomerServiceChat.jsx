import React from 'react';
// import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'

export default class CustomerServiceChat extends React.Component {
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
            // steps: this.props.steps,
            // response: this.props.response
        };

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        // this.state = { name: this.props.name };
    }

    handleMessage(e) {

    }

    // updateName (name) {
    //   this.setState({ name });
    // };

    render() {
      // this.checktone(this.props.response)
      return (
          <div className="chatbox">
            <h1>Talk to our Customer Service</h1>
            <div id="messages"></div>
            <form id="new_message">
              <div className="form-group">
                <input className="form-control" type="text" id="message_body" placeholder="type something to chat" />
              </div>
              <div className="form-group">
                <button className="btn btn-default" id="messageBtn" onClick={ (e) => this.handleMessage(e)} >Send</button>
              </div>
            </form>
          </div>
      );
    }
}
