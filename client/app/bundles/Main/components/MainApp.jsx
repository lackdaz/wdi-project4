
// import SimpleChatBot from '../components/SimpleChatBot/SimpleChatBot'
import SentimentBot from '../components/SentimentBot/SentimentBot'
import ChatBot from 'react-simple-chatbot'
import { Wit, log } from 'node-wit'
var watson = require('watson-developer-cloud')

// ReactDOM.render(
//   <div>
//     <ChatBot steps={steps} />
//   </div>,
//   // document.getElementById('root')
// );

import PropTypes from 'prop-types'
import React from 'react'

export default class MainApp extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  constructor (props, _railsContext) {
    super(props)
    this.state = {
      steps: this.props.steps,
      response: '',
      lastresults: {},
      sentiment: '',
      intent: ''
    }
    // Callback function to trigger next step when user attribute is true. Optionally you can pass a object with value to be setted in the step and the next step to be triggered
  }
  //
  // updateName = (name) => {
  //   this.setState({ name });
  // };

  componentDidMount () {
    var tone_analyzer = watson.tone_analyzer({
      username: 'zkYEACBbE6Ws',
      password: 'bffbcc36-f252-4380-ac1a-35e46b935dd9',
      version: 'v3',
      version_date: '2016-05-19'
    })

    tone_analyzer.tone({
      text: 'A word is dead when it is said, some say. Emily Dickinson'
    }, function (err, tone) {
      if (err) {
        console.log(err)
      } else {
        console.log(JSON.stringify(tone, null, 2))
      }
    })

    // const client = new Wit({accessToken: 'H5SI45AK4BQA5YLWNYST576YCAI7JTSJ'})
    // client.message('what is the weather in London?', {})
    //   .then((response) => {
    //     // console.log('Yay, got Wit.ai response: ' + JSON.stringify(response));
    //     return response
    //   })
    //   .then((data) => {
    //     // need to update the state based on the received data
    //     console.log(data.entities)
    //     for (let entity in data.entities) {
    //       console.log(data.entities[entity])
    //     }
    //     // this.setState({
    //     //   lastresults: results,
    //     //   sentiment:
    //     // })
    //   })
    //   .catch((err) => {
    //     alert(err)
    //   })
  }

  render () {
    // const { name, gender, age } = this.state;
    return (
      <div>
        <ChatBot steps={this.state.steps} />
        <SentimentBot response={this.state.response} />
      </div>
    )
  }
}
