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
      trigger: false
    }

    this.triggetNext = this.triggetNext.bind(this)
  }

  componentWillMount () {
    const self = this
    // const { loading, result, show } = this.state
    const { steps } = this.props
    const search = steps.inputTracking.value

    const client = new Wit({accessToken: 'IGHNEYS623KKCXIK6HZQRHXHC6Q43QWX'})
    console.log(search)
    client.message(search, {})
    .then((data) => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data))
      const entities = data.entities

      console.log(Object.keys(entities).length)
      if (entities && Object.keys(entities).length > 0) {
        self.setState({ loading: false, result: entities.tracking[0].value, show: 'Got it!' })
        self.triggetNext(this.state.result,"trackingSuccess")
      } else {
        self.setState({ loading: false, result: 'inputTrackingMissing', show: 'Not Found' })
        self.triggetNext()
      }
    })
    .catch(console.error)
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
  previousStep: PropTypes.object
}

WitAi.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
  step: undefined,
  previousStep: undefined
}
