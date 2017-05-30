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
  }

  componentWillReceiveProps(nextProps){
    if (this.props.angerScore !== nextProps.angerScore) {
      const self = this
      // const { loading, result, show } = this.state
      const { steps, angerScore } = this.props
      const search = steps.inputTracking.value

      const client = new Wit({accessToken: 'IKOX36ZK6SVACQGYK2BDE7OTDFWMMXX4'})
      console.log(search)
      client.message(search, {})
      .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data))
        const entities = data.entities

        console.log(Object.keys(entities).length)

        // this is the fuck you condition
        console.log(angerScore)
        if (angerScore >= 0.5) {
          self.setState({ loading: false, result: entities.tracking[0].value, show: 'Chill!' })
          self.triggetNext(this.state.result,"operator")
        }
        // if there is a tracking entity value
        if (entities && Object.keys(entities).length > 0 && entities.tracking[0].value ) {
          self.setState({ loading: false, result: entities.tracking[0].value, show: 'Got it!' })
          self.triggetNext(this.state.result,"trackingSuccess")
        }
        // else if there is a intent entity value
        else if (entities && Object.keys(entities).length > 0 && entities.intent[0].value) {
          self.setState({ loading: false, result: entities.intent[0].value, show: 'No worries...' })
          self.triggetNext(this.state.result,"unsure")
        }
        else {
          self.setState({ loading: false, result: 'inputTrackingMissing', show: 'Not Found' })
          self.triggetNext()
        }
      })
      .catch(console.error)
    }
  }

  componentWillUpdate () {

  }

  triggetNext (value,triggerInput) {
    this.setState({ trigger: true }, () => {
      // this.props.triggerNextStep(null,{ end });
      if (triggerInput) {
        console.log(value)
        console.log(triggerInput)
        this.props.triggerNextStep({ value: value, trigger: triggerInput })
      } else this.props.triggerNextStep()
    })
  }

  render () {
    const { loading, result, trigger, show } = this.state

    return (
      <div className='dbpedia'>

        {/* change this to a different output */}
        { loading ? <Loading /> : show }
        {/* {
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
        } */}
      </div>
    )
  }
}

WitAi.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
  step: PropTypes.object,
  previousStep: PropTypes.object,
  angerScore: PropTypes.number,
}

WitAi.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
  step: undefined,
  previousStep: undefined,
  angerScore: undefined,
}
