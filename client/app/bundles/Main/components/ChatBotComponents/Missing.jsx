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
      const { steps, angerScore } = this.props
      const search = steps.inputTracking.value

      const client = new Wit({accessToken: 'IKOX36ZK6SVACQGYK2BDE7OTDFWMMXX4'})
      console.log(search)
      client.message(search, {})
      .then((data) => {
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(data))
        const entities = data.entities
        const { angerScore } = self.props
        const { tonesArr } = self.props

        console.log(Object.keys(entities).length)

        // this is the fuck you condition
        console.log(angerScore)
        if (angerScore >= 0.5) {
          // this is the angry man condition
          self.setState({ loading: false, result: 'angry', show: 'Chill!' })
          self.triggetNext(self.state.result)
        } else if (entities && Object.keys(entities).length > 0 && entities.tracking[0].value) {
          // this is triggered if there are intent entities from wit.ai
          self.setState({ loading: false, result: entities.tracking[0].value })
          self.triggetNext('trackingSuccess')
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
