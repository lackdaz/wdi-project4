import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

class Review extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   name: '',
    //   gender: '',
    //   age: '',
    //   type: 'alien',
    // };
  }

  // componentDidUpdate() {
  //   console.log(this.state.type.value)
  // }

  componentWillMount() {
    // console.log(this.props)
    // console.log(this.state)

    const { steps } = this.props;
    // console.log(steps);
    const { name, gender, age } = steps;

    // this.setState({ name, gender, age });
  }

  render() {
    // const { name, gender, age } = this.state;
    const { name, gender, age } = this.props.steps
    // console.log(this.state)
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};



class SimpleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'name from state',
      // gender: '',
      // age: '',
      // type: 'alien',
    };
  }

  render() {
    return (
      <ChatBot userDelay= {10} botDelay={10} steps={[
          {
            id: '1',
            message: 'What is your name?',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          // {
          //   id: '10',
          //   message: 'Hi {name.value}! What is your type?',
          //   trigger: 'type',
          // },
          {
            id: 'type',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! What is your gender?',
            trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: '5' },
              { value: 'female', label: 'Female', trigger: '5' },
            ],
            // user: true,
            // trigger: '5',
          },
          {
            id: '5',
            message: 'How old are you?',
            trigger: 'age',
          },
          {
            id: 'age',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: '7',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review name={this.state.name}/>,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'gender', label: 'Gender', trigger: 'update-gender' },
              { value: 'age', label: 'Age', trigger: 'update-age' },
              { value: 'type', label: 'Type', trigger: 'update-type' },
            ],
          },
          {
            id: 'update-type',
            update: 'type',
            trigger: '7',
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-gender',
            update: 'gender',
            trigger: '7',
          },
          {
            id: 'update-age',
            update: 'age',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          }
        ]}
      />
    );
  }
}

export default SimpleForm;
