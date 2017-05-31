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
      const { angerScore } = self.props
      const { tonesArr } = self.props

      console.log(Object.keys(entities).length)
      // console.log('Anger score is ' + angerScore)

      if (angerScore >= 0.5) {
        // this is the angry man condition
        self.setState({ loading: false, result: 'angry', show: 'Chill!' })
        self.triggetNext(self.state.result)
      } else if (entities && Object.keys(entities).length > 0) {
        // this is triggered if there are intent entities from wit.ai
        self.setState({ loading: false, result: entities.intent[0].value })
        self.triggetNext(self.state.result)
      } else {
        // this is the I'm unsure condition
        self.setState({ loading: false, result: 'unsure' })
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
    if (this.props.angerScore !== nextProps.angerScore) {
      this.setState({
        angerScore: nextProps.angerScore
      })
    }
    if (this.props.tonesArr !== nextProps.tonesArr) {
      this.setState({
        tonesArr: nextProps.tonesArr
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // console.log(this.props.angerScore !== nextProps.angerScore)
    return this.props.tonesArr !== nextProps.tonesArr
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
  angerScore: PropTypes.number,
  tonesArr: PropTypes.array,
}

WitAi.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
  step: undefined,
  previousStep: undefined,
  angerScore: undefined,
  tonesArr: undefined,
}
