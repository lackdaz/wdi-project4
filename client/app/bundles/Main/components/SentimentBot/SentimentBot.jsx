import React from 'react';

export default class SentimentBot extends React.Component {
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
            response: this.props.response
        };

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        // this.state = { name: this.props.name };
    }

    // updateName (name) {
    //   this.setState({ name });
    // };

    render() {
        return (
            <div>
              hello
                {/* write logic for sentiment bot here  */}
            </div>
        );
    }
}
