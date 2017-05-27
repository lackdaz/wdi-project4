<ChatBot userDelay={10} botDelay={10} steps={[
  {
    id: 'intent',
    user: true,
    trigger: 'wit-ai',
    validator: (value) => {
      if (!value) return 'Please try again!'
      else {
        const client = new Wit({accessToken: 'H5SI45AK4BQA5YLWNYST576YCAI7JTSJ'})
        client.message(value, {})
        .then((response) => {
          // console.log('Yay, got Wit.ai response: ' + JSON.stringify(response));
          return response
        })
        .then((data) => {
          // need to update the state based on the received data
          console.log(data.entities)
          for (let entity in data.entities) {
            console.log(data.entities[entity])
          }
          return true
        })
        .catch((err) => {
          alert(err)
        })

      }
    }
  },
  {
    id: 'name',
    user: true,
    trigger: 'intent-1',
    validator: (value) => {
      if (!value) {
        return 'Please try again'
      }
      return true
    }
  },
  {
    id: 'onboarding-1',
    message: 'Welcome to GA Postal Services!',
    trigger: '2'
  },
  {
    id: 'onboarding-2',
    message: 'How may I address you?',
    trigger: 'name'
  },
  {
    id: 'intent-1',
    message: 'Hi {previousValue}!',
    trigger: 'intent-2'
  },
  {
    id: 'intent-2',
    options: [
        { value: 'Rates', label: 'Male', trigger: '' },
        { value: 'Check Status', label: 'Female', trigger: 'status-1' },
        { value: 'Others', label: 'Others', trigger: 'others-1'}
    ]
  },
  {
    id: 'others-1',
    message: 'I\m all ears',
    trigger: 'intent'
  },
  {
    id: 'gender',
    options: [
        { value: 'male', label: 'Male', trigger: '5' },
        { value: 'female', label: 'Female', trigger: '5' }
    ]
      // user: true,
      // trigger: '5',
  },
  {
    id: 'age',
    user: true,
    trigger: '7',
    validator: (value) => {
      if (isNaN(value)) {
        return 'value must be a number'
      } else if (value < 0) {
        return 'value must be positive'
      } else if (value > 120) {
        return `${value}? Come on!`
      }

      return true
    }
  },
  {
    id: '7',
    message: 'Great! Check out your summary',
    trigger: 'review'
  },
  // {
  //   id: 'review',
  //   component: <Review />,
  //   asMessage: true,
  //   trigger: 'update'
  // },
  {
    id: 'update',
    message: 'Would you like to update some field?',
    trigger: 'update-question'
  },
  {
    id: 'update-question',
    options: [
        { value: 'yes', label: 'Yes', trigger: 'update-yes' },
        { value: 'no', label: 'No', trigger: 'end-message' }
    ]
  },
  {
    id: 'update-yes',
    message: 'What field would you like to update?',
    trigger: 'update-fields'
  },
  {
    id: 'update-fields',
    options: [
        { value: 'name', label: 'Name', trigger: 'update-name' },
        { value: 'gender', label: 'Gender', trigger: 'update-gender' },
        { value: 'age', label: 'Age', trigger: 'update-age' }
    ]
  },
  {
    id: 'update-name',
    update: 'name',
    trigger: '7'
  },
  {
    id: 'update-gender',
    update: 'gender',
    trigger: '7'
  },
  {
    id: 'update-age',
    update: 'age',
    trigger: '7'
  },
  {
    id: 'end-message',
    message: 'Thanks! Your data was submitted successfully!',
    end: true
  }
]}
/>
