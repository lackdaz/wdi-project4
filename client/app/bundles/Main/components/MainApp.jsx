
// import SimpleChatBot from '../components/SimpleChatBot/SimpleChatBot'
import SentimentBot from '../components/SentimentBot/SentimentBot'
import ChatBot from 'react-simple-chatbot'
import { Wit, log } from 'node-wit'
// var watson = require('watson-developer-cloud')

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
      intent: '',
      previousTrigger: '',
      nextTrigger: ''
    }
    // Callback function to trigger next step when user attribute is true. Optionally you can pass a object with value to be setted in the step and the next step to be triggered
  }
  //
  // updateName = (name) => {
  //   this.setState({ name });
  // };

  componentDidMount () {
  }

  componentDidUpdate (prevProps, prevState) {
  // make new step
    // let newStep = {
    //   'id': '',
    //   'message': 'Bye!',
    //   'end': true
    // }

    // let results = this.state.steps
    // console.log('updated')
    // console.log(results[results.length])
    // modify previous step

    // this.setState({
    //   steps: results
    // })
  }

  render () {
    // const { name, gender, age } = this.state;
    return (
      <div>
        <ChatBot userDelay={10} botDelay={10} steps={[
          {
            id: 'onboarding-1',
            message: 'Welcome to GA Postal Services!',
            trigger: 'onboarding-2'
          },
          {
            id: 'onboarding-2',
            message: 'How may I address you?',
            trigger: 'name'
          },
          {
            id: 'intent-1',
            message: 'Hi {previousValue}!',
            trigger: 'intent-2'
          },
          {
            id: 'intent-2',
            options: [
                { value: 'Rates', label: 'Rates', trigger: '' },
                { value: 'Check Status', label: 'Check Status', trigger: 'status-1' },
                { value: 'Others', label: 'Others', trigger: 'others-1'}
            ]
          },
          {
            id: 'ask-intent-1',
            message: 'I\'m all ears',
            trigger: 'ask-intent'
          },
          {
            id: 'ask-intent-2',
            user: true,
            trigger: 'intent',
            validator: (value) => {
              if (!value) return 'Please try again!'
              else {
                return true
              }
            }
          },
          {
            id: 'intent',
            component: <Wit-ai />,
            waitAction: true,
            trigger: 'intent',
          },
          {
            id: 'name',

            user: true,
            trigger: 'intent-1',
            validator: (value) => {
              if (!value) {
                return 'Please try again'
              }
              let newResponse = value
              this.setState({

              })
              return true
            }
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true
          }
        ]}
        />
        <SentimentBot response={this.state.response} />
      </div>
    )
  }
}
