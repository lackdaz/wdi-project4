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
      trigger: false
    }

    this.triggetNext = this.triggetNext.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props.angerScore)
    console.log(nextProps.angerScore)

    if (this.props.angerScore !== nextProps.angerScore) {
      const self = this
      const { steps } = this.props
      const { angerScore } = nextProps

      const search = steps.intentinput.value

      const client = new Wit({accessToken: 'IGHNEYS623KKCXIK6HZQRHXHC6Q43QWX'})
      console.log(search)
      client.message(search, {})
    .then((data) => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data))
      const entities = data.entities

      console.log(Object.keys(entities).length)

      console.log('Anger score is ' + angerScore)

      if (angerScore >= 0.5) {
        self.setState({ loading: false, result: entities.tracking[0].value, show: 'Chill!' })
        self.triggetNext(this.state.result, 'operator')
      } else if (entities && Object.keys(entities).length > 0) {
        self.setState({ loading: false, result: entities.intent[0].value })
        this.triggetNext(this.state.result)
      } else {
        self.setState({ loading: false, result: 'dunno' })
        this.triggetNext(this.state.result)
      }
    })
    .catch(console.error)
    }
  }

  triggetNext (triggerInput) {
    this.setState({ trigger: true }, () => {
      // this.props.triggerNextStep(null,{ end });
      if (triggerInput) {
        this.props.triggerNextStep({ value: null, trigger: triggerInput })
      } else this.props.triggerNextStep()
    })
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
  angerScore: PropTypes.number,
}

WitAi.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
  step: undefined,
  previousStep: undefined,
  angerScore: undefined,
}
