import ChatBot, { Loading } from 'react-simple-chatbot'
import React, { Component } from 'react'
import { Wit, log } from 'node-wit'

import PropTypes from 'prop-types'

export default class Summary extends Component {
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

    triggetNext (triggerInput, value) {
      this.setState({ trigger: true }, () => {
    // this.props.triggerNextStep(null,{ end });
        if (triggerInput) {
          this.props.triggerNextStep({ value: null, trigger: triggerInput })
        } else this.props.triggerNextStep()
      })
    }

    componentWillMount() {
      const { steps } = this.props;
      const { name, contactInput, addressInput, trackingInput } = steps;
      this.setState({ name, contactInput, addressInput, trackingInput });
    }


    render () {
      const { name, contactInput, addressInput, trackingInput } = this.state
      return (
        <div style={{
          textAlign: 'center',
          width: '100%' 
        }}>
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{name.value}</td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>{contactInput.value}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{addressInput.value}</td>
              </tr>
              <tr>
                <td>Tracking</td>
                <td>{trackingInput.value}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
}

Summary.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
  step: PropTypes.object,
  previousStep: PropTypes.object,
  tonesArr: PropTypes.array,
}

Summary.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
  step: undefined,
  previousStep: undefined,
  tonesArr: undefined,
}
