
// import SimpleChatBot from '../components/SimpleChatBot/SimpleChatBot'
import SentimentBot from '../components/SentimentBot/SentimentBot'
import Wit_ai from '../components/ChatBotComponents/Intent'
import Missing from '../components/ChatBotComponents/Missing'
import ChatBot from '../components/ReactSimpleChatBot/ChatBot'
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

    let steps = [
      {
        id: 'onboarding1',
        message: 'Welcome to GA Postal Services!',
        trigger: 'onboarding2'
      },
      {
        id: 'onboarding2',
        message: 'How may I address you?',
        trigger: 'name'
      },
      {
        id: 'name',
        user: true,
        trigger: 'intent1',
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
        id: 'intent1',
        message: 'Hi {previousValue}!',
        trigger: 'start'
      },
      {
        id: 'start',
        message: 'What would you like to do today?',
        trigger: 'intent2'
      },
      {
        id: 'intent2',
        options: [
            { value: 'Rates', label: 'Rates', trigger: '' },
            { value: 'Check Status', label: 'Check Status', trigger: 'status1' },
            { value: 'Others', label: 'Others', trigger: 'askintent1'}
        ]
      },
      {
        id: 'askintent1',
        message: 'I\'m all ears',
        trigger: 'intentinput'
      },
      {
        id: 'intentinput',
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
        component: <Wit_ai />,
        replace: true,
        waitAction: true,
        asMessage: true,
        trigger: 'askintent1'
      },
      {
        id: 'Others',
        message: '!',
        trigger: 'Missing1'
      },
      {
        id: 'Are you looking for a parcel?',
        message: 'Welcome to the Missing Parcels Department!',
        trigger: 'Missing1'
      },
      {
        id: 'Missing1',
        message: 'What is your tracking number?',
        trigger: 'inputTracking'
      },
      {
        id: 'inputTracking',
        user: true,
        trigger: 'missing',
        validator: (value) => {
          if (!value) return 'Please try again!'
          else {
            return true
          }
        }
      },
      {
        id: 'missing',
        component: <Missing />,
        waitAction: true,
        asMessage: true,
        replace: true,
        trigger: 'inputTrackingMissing'
      },
      {
        id: 'inputTrackingMissing',
        message: 'Whoops! Would you like to try again?',
        trigger: 'inputTrackingMissingOptions',
      },
      {
        id: 'inputTrackingMissingOptions',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'Missing1'},
            { value: 'no', label: 'No', trigger: 'before-end'}
        ]
      },
      {
        id: 'trackingSuccess',
        message: 'We are currently checking the status of {previousValue}!',
        trigger: 'before-end',
      },
      {
        id: 'operator',
        message: 'Hello operator speaking here',
        trigger: 'before-end',
      },
      {
        id: 'unsure',
        message: '?',
        trigger: 'unsureInput',
      },
      {
        id: 'unsureInput',
        options: [
            { value: 'friend', label: 'A friend', trigger: 'start'},
            { value: 'end', label: 'End Session', trigger: 'end-message'}
        ]
      },
      {
        id: 'before-end',
        message: 'Do you still need any help?',
        trigger: 'before-endInput',
      },
      {
        id: 'before-endInput',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'start'},
            { value: 'end', label: 'End Session', trigger: 'end-message'}
        ]
      },
      {
        id: 'end-message',
        message: 'Thank you! Do let me know if you need any help!',
        end: true
      }
    ]

    this.state = {
      steps: steps,
      opened: false,
      floating: true,
      inputValue: '',
      sentiment: '',
      endDelay: 2000,
      angerScore: 0,
    }

    // Callback function to trigger next step when user attribute is true. Optionally you can pass a object with value to be setted in the step and the next step to be triggered
  }


  handleMessage(e) {
    this.setState({
      // response: document.getElementById("inputText").value
      inputValue: document.getElementById("inputText").value
    })
    document.getElementById("messageBtn").innerHTML = "loading"
    document.getElementById("messageBtn").setAttribute("disabled", "");
  }

  handleLoadingDone(angerScore) {
    console.log('handleLoadingDone is ' + angerScore)
    document.getElementById("messageBtn").innerHTML = "Submit"
    document.getElementById("messageBtn").removeAttribute("disabled");
    this.setState({ angerScore: angerScore });
  }

  handleEnd ({ steps, values }) {
  // console.log(steps);
  // console.log(values);
    setTimeout(() => {
      this.setState({ opened: false });
      console.log('opened window')
    }, this.state.endDelay)
  }

  handleInputValue (inputValue, res) {
  console.log(inputValue);
  console.log(res);
  this.setState({ inputValue });
  }


  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this)
    setTimeout(() => {
      this.setState({ opened: true });
    }, this.state.endDelay)
  }

  componentDidUpdate (prevProps, prevState) {
  }

  render () {
    const { opened, floating, steps, endDelay, inputValue, angerScore } = this.state;
    return (
      <div className="container">
          {/* { this.props.isadmin ? <div>Is Admin</div> : 'no leh'} */}
          <div className="row">
            <div  className="col-md-6">
              <ChatBot
                userDelay={10}
                opened={opened}
                handleEnd={this.handleEnd.bind(this)}
                handleInputValue={this.handleInputValue.bind(this)}
                floating={floating}
                botDelay={10}
                steps={steps}
                testproc={'test'}
                headerTitle={'Postal Bot'}
                endDelay={endDelay}
                angerScore={angerScore}
            />
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input className="form-control" type="text" id="inputText" placeholder="type something" />
            </div>
            <div className="form-group">
              <button className="btn btn-default" id="messageBtn" onClick={ (e) => this.handleMessage(e)} >Submit</button>
            </div>
            <SentimentBot response={this.state.inputValue} handleLoadingDone={ (angerScore) => this.handleLoadingDone(angerScore) } />

          </div>
        </div>
      </div>
    )
  }
}
