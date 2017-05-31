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
    }

    this.triggetNext = this.triggetNext.bind(this)
    this.witCall = this.witCall.bind(this)
  }

  witCall () {
      const self = this
      const { steps } = this.props
      const search = steps.trackingInput.value

      const client = new Wit({accessToken: 'IKOX36ZK6SVACQGYK2BDE7OTDFWMMXX4'})
      console.log(search)
      client.message(search, {})
      .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data))
        const entities = data.entities
        const { tonesArr } = self.props

        /*iterating through objects for feelings
        { Anger, Disgust, Fear, Joy, Sadness, Analytical, Confident, Tentative, Openness, Conscientiousness, Extraversion, Agreeableness, Emotional Range}
        */
        var tonesObj = {}
        tonesArr.map((val, ind) => tonesObj[val.tone_name] = val.score)
        console.log(Object.keys(entities).length)

        // this is the angry man condition
        if (tonesObj.Anger >= 0.5) {
          self.setState({ loading: false, result: 'angry', show: 'Chill!' })
          self.triggetNext(self.state.result)
        }
        else if (entities && Object.keys(entities).length > 0 && entities.tracking[0].value && tonesObj.Sadness >= 0.5) {
          self.setState({ loading: false, result: entities.tracking[0].value })
          self.triggetNext('trackingSuccessSad')
        }
        else if (entities && Object.keys(entities).length > 0 && entities.tracking[0].value) {
          // this is triggered if there are intent entities from wit.ai
          self.setState({ loading: false, result: entities.tracking[0].value })
          self.triggetNext('unsure')
        }
        else if (entities && Object.keys(entities).length > 0 && entities.intent[0].value) {
          // this is triggered if there are intent entities from wit.ai
          self.setState({ loading: false, result: entities.intent[0].value })
          self.triggetNext('unsure')
        } else {
          // this is the I'm unsure condition
          self.setState({ loading: false, result: 'inputTrackingMissing', show: 'Not Found' })
          self.triggetNext()
        }
      })
      .catch(console.error)
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
          tonesArr: nextProps.tonesArr
        })
      }
    }

    shouldComponentUpdate (nextProps, nextState) {
      return this.props.tonesArr !== nextProps.tonesArr
    }

    componentWillUpdate () {
      this.witCall()
    }

  render () {
    const { loading, result, trigger, show } = this.state

    return (
      <div className='dbpedia'>

        {/* change this to a different output */}
        { loading ? <Loading /> : show }
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
