import React from 'react';
import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'

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
            // response: this.props.response
        };

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        // this.state = { name: this.props.name };
    }

    checktone(e) {
      let message = encodeURIComponent(document.getElementById('message').value)
      // fetch(`http://omdbapi.com/?s=${message}`)
      fetch(`https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=${message}`)
      .then((response) => {
        // console.log('first fetch response')
        return response.json()
      })
      .then((json) => {
        // console.log('second fetch json')
        console.log(json)
        // this.setState({
        //   searchResult: json.Search.map((movies) => movies.Title ),
        // })
      })
      .catch((err) => {
        console.log(err)
      })
      // logic
      // console.log(document.getElementById('message').value)
      // let message = document.getElementById('message').value
      // var tone_analyzer = new ToneAnalyzerV3({
      //   password: 'VkYEACBbE6Ws',
      //   username: 'bffbcc36-f252-4380-ac1a-35e46b935dd9',
      //   version_date: '2016-05-19'
      // });
      // // Parameters for the call are defined in the tone.json file.
      // // var params = require('./public/tone.json');
      // var params = { text: message }
      //
      // tone_analyzer.tone(params, function(error, response) {
      //   if (error)
      //     console.log('error:', error);
      //   else
      //     console.log(JSON.stringify(response, null, 2));
      //     // res.setHeader('Content-Type', 'application/json');
      //     // res.send(JSON.stringify(response, null, 2));
      //   }
      // );
    }

    // updateName (name) {
    //   this.setState({ name });
    // };

    render() {
        return (
            <div>
              <input type="text" placeholder="type something" id="message" />
              <button onClick={ (e) => this.checktone(e)}>Check Tone!</button>
                {/* write logic for sentiment bot here  */}
            </div>
        );
    }
}
