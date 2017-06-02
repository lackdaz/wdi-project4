
// import SimpleChatBot from '../components/SimpleChatBot/SimpleChatBot'
import SentimentBot from '../components/SentimentBot/SentimentBot'
import Wit_ai from '../components/ChatBotComponents/Intent'
import Missing from '../components/ChatBotComponents/Missing'
import Summary from '../components/ChatBotComponents/Summary'
import ChatBot from '../components/ReactSimpleChatBot/ChatBot'
import { Wit, log } from 'node-wit'
import CustomerServiceChat from './CustomerServiceChat/CustomerServiceChat'
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
            { value: 'Inquire Missing parcel', label: 'Report Missing', trigger: 'askintent1' },
            { value: 'Operator', label: 'Operator', trigger: 'operator' },
            { value: 'Others', label: 'Others', trigger: 'askintent1'},
            { value: 'Rates', label: 'Rates', trigger: 'dummy' },
            { value: 'Check Status', label: 'Check Status', trigger: 'dummy' },
            { value: 'Nearest Post Office', label: 'Rates', trigger: 'dummy' },
        ]
      },
      {
        id: 'dummy',
        message: 'Sorry! This feature is not ready yet!',
        trigger: 'start'
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
        id: 'Are you looking for a parcel? Sad',
        message: 'I\'m sorry for your loss. We\'re trying our best to locate your parcel',
        trigger: 'Missing1'
      },
      {
        id: 'Missing1',
        message: 'What is your tracking number?',
        trigger: 'trackingInput'
      },
      {
        id: 'trackingInput',
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
        id: 'summary',
        component: <Summary />,
        asMessage: true,
        trigger: 'confirmation'
      },
      {
        id: 'inputTrackingMissing',
        message: 'Whoops! Would you like to try again? (hint: G123**9)',
        trigger: 'inputTrackingMissingOptions'
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
        message: 'We will be working on recovering your parcel shortly! I just need some more details',
        trigger: 'address'
      },
      {
        id: 'trackingSuccessSad',
        message: 'Cheer up! 90% of our missing parcels are redelivered within the first 48 hours',
        trigger: 'before-end'
      },
      {
        id: 'address',
        message: 'What is your address?',
        trigger: 'addressInput'
      },
      {
        id: 'addressInput',
        user: true,
        trigger: 'contact',
        validator: (value) => {
          if (!value) return 'Please try again!'
          else {
            return true
          }
        }
      },
      {
        id: 'contact',
        message: 'What is your contact?',
        trigger: 'contactInput'
      },
      {
        id: 'contactInput',
        user: true,
        trigger: 'summary',
        validator: (value) => {
          if (!value) return 'Please try again!'
          else {
            return true
          }
        }
      },
      {
        id: 'confirmation',
        message: 'Before I forget, are these details correct?',
        trigger: 'confirmationInput'
      },
      {
        id: 'confirmationInput',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'before-end'},
            { value: 'no', label: 'No', trigger: 'before-end'}
        ]
      },
      {
        id: 'angry',
        message: 'I\'m sorry to have offended you, would you like to talk to an operator instead?',
        trigger: 'angryInput'
      },
      {
        id: 'angryInput',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'operator'},
            { value: 'no', label: 'No', trigger: 'start'}
        ]
      },
      {
        id: 'operator',
        message: 'Hello! Operator speaking here, how may I help you!',
        trigger: 'before-end'
      },
      {
        id: 'unsure',
        message: 'No worries. Are you expecting a package from an online retailer?',
        trigger: 'unsureInput'
      },
      {
        id: 'unsureInput',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'start'},
            { value: 'no', label: 'No', trigger: 'end-message'}
        ]
      },
      {
        id: 'default',
        message: 'Sorry I don\t quite understand you. Would you like to try again?',
        trigger: 'defaultInput'
      },
      {
        id: 'defaultInput',
        options: [
            { value: 'yes', label: 'Yes', trigger: 'start'},
            { value: 'no', label: 'No', trigger: 'end-message'}
        ]
      },
      {
        id: 'before-end',
        message: 'Do you still need any help?',
        trigger: 'before-endInput'
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
      inputValue: undefined,
      sentiment: '',
      endDelay: 2000,
      tonesArr: [],
    }

    // Callback function to trigger next step when user attribute is true. Optionally you can pass a object with value to be setted in the step and the next step to be triggered
  }

  handleMessage (e) {
    this.setState({
      inputValue: document.getElementById('inputText').value
    })
    // document.getElementById("messageBtn").innerHTML = "loading"
    // document.getElementById("messageBtn").setAttribute("disabled", "");
  }

  handleLoadingDone (tonesArr) {
    // console.log(tonesArr)
    // document.getElementById("messageBtn").innerHTML = "Send"
    // document.getElementById("messageBtn").removeAttribute("disabled");
    this.setState({ tonesArr })
  }

  handleEnd ({ steps, values }) {
    // console.log(steps);
    // console.log(values);
    // setTimeout(() => {
    //   this.setState({ opened: false })
    //   console.log('closed window')
    // }, this.state.endDelay)
  }


  // toggleFloating({opened}) {
  //   console.log(opened)
  //   console.log({opened})
  //   this.setState({ opened })
  // }

  handleInputValue (inputValue, res) {
    console.log(inputValue)
    console.log(res)
    this.setState({ inputValue })
  }

  handleNewChat (message) {
    this.setState({
      inputValue: message
    })
  }

  componentDidMount () {
    this.handleEnd = this.handleEnd.bind(this)
    this.handleInputValue = this.handleInputValue.bind(this)
    // this.toggleFloating.bind(this)
    // setTimeout(() => {
    //   this.setState({ opened: true })
    // }, this.state.endDelay)
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log("called receive props!")
    // console.log(this.props.opened)
    // console.log(nextProps.opened)
    // console.log(this.props.opened !== nextProps.opened)
    if (this.state.inputValue === nextState.inputValue) {
      this.setState({
        inputValue: undefined
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
  }

  render () {
    const { opened, floating, steps, endDelay, inputValue, tonesArr } = this.state
    return (
      <div className='container'>
        {/* { this.props.isadmin ? <div>Is Admin</div> : 'no leh'} */}
        <div className='row justify-content-around'>
          <div className='col-md-6'>
            { this.props.is_Logged_in ? (
              <CustomerServiceChat handleNewChat={(chat) => this.handleNewChat.bind(this)(chat)} current_user={this.props.current_user} />
              ) : (
                <h5>Please sign in to talk to our customer service agent or chat with our bot on the lower right corner.</h5>
              )}
          </div>
          <div className='col-md-6'>
            { this.props.isadmin && <h2 style={{
              textAlign: 'center'
            }}>Sentiment Analysis</h2> }
            <SentimentBot response={this.state.inputValue} handleLoadingDone={(tonesArr) => this.handleLoadingDone(tonesArr)} isadmin={this.props.isadmin} />
          </div>
          <div className='col-md-12'>
            <ChatBot
              headerBgColor={'#5DCA88'}
              botBubbleColor={'#5DCA88'}
              userDelay={10}
              opened={opened}
              handleEnd={this.handleEnd.bind(this)}
              handleInputValue={this.handleInputValue.bind(this)}
              floating={floating}
              botDelay={10}
              steps={steps}
              headerTitle={'Postal Bot'}
              endDelay={endDelay}
              tonesArr={tonesArr}
              // toggleFloating={this.toggleFloating.bind(this)}
              />
          </div>
        </div>
      </div>
    )
  }
}
