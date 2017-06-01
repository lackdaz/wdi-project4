import ChatBot, { Loading } from 'react-simple-chatbot'
import React, { Component } from 'react'
import { Wit, log } from 'node-wit'

import PropTypes from 'prop-types'

export default class WitAi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      result: '',
      show: '',
      trigger: false,
      steps: {}
    }

    this.triggetNext = this.triggetNext.bind(this)
    this.witCall = this.witCall.bind(this)
  }

  witCall () {
    const self = this
    const { steps } = self.props
    const search = steps.intentinput.value


    const client = new Wit({accessToken: 'IGHNEYS623KKCXIK6HZQRHXHC6Q43QWX'})
    console.log(search)
    client.message(search, {}).then((data) => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data))
      const entities = data.entities
      const { tonesArr } = self.props

      /*iterating through objects for feelings
      { Anger, Disgust, Fear, Joy, Sadness, Analytical, Confident, Tentative, Openness, Conscientiousness, Extraversion, Agreeableness, Emotional Range}
      */
      var tonesObj = {}
      tonesArr.map((val, ind) => tonesObj[val.tone_name] = val.score)

      console.log(Object.keys(entities).length)

      if (tonesObj.Anger >= 0.5) {
        // this is the angry man condition
        self.setState({ loading: false, result: 'angry', show: 'Chill!' })
        self.triggetNext(self.state.result)
      }
      else if (entities && Object.keys(entities).length > 0 && entities.intent[0].value && tonesObj.Sadness >= 0.5) {
      self.setState({ loading: false, result: entities.intent[0].value })
      self.triggetNext('Are you looking for a parcel? Sad')
    }
      else if (entities && Object.keys(entities).length > 0) {
        // this is triggered if there are intent entities from wit.ai
        self.setState({ loading: false, result: entities.intent[0].value })
        self.triggetNext(self.state.result)
      }
      else {
        // this is the I'm unsure condition
        self.setState({ loading: false, result: 'default' })
        self.triggetNext(self.state.result)
      }
    }).catch(console.error)

  }

  triggetNext (triggerInput, value) {
    this.setState({ trigger: true }, () => {
  // this.props.triggerNextStep(null,{ end });
      if (triggerInput) {
        this.props.triggerNextStep({ value: null, trigger: triggerInput })
      } else this.props.triggerNextStep()
    })
  }

  componentWillReceiveProps (nextProps) {

    if (this.props.tonesArr !== nextProps.tonesArr) {
      this.setState({
        tonesArr: nextProps.tonesArr,
        steps: nextProps.steps
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // if (this.props.tonesArr !== nextProps.tonesArr || this.steps !== nextProps.steps) {
    if (this.props.tonesArr !== nextProps.tonesArr) {
      
      return true
    }
    return false
  }

  componentWillUpdate () {
    this.witCall()
  }

  render () {
    const { loading, result, trigger } = this.state
    return (
      <div className='dbpedia'>

        {/* change this to a different output */}
        { loading ? <Loading /> : result }
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20
            }}
          >
            {
              !trigger &&
              <button
                onClick={() => this.triggetNext(result)}
              >
                Yes
              </button>
            }
            {
            !trigger &&
            <button
              onClick={() => this.triggetNext()}
              >
              Search Again
            </button>
          }
          </div>
        }
      </div>
    )
  }
}

WitAi.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
  step: PropTypes.object,
  previousStep: PropTypes.object,
  tonesArr: PropTypes.array,
}

WitAi.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
  step: undefined,
  previousStep: undefined,
  tonesArr: undefined,
}
