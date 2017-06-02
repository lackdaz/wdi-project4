# CSM Bot

[Heroku Deployment](https://postalcsbot.herokuapp.com/)

## Short
***CSM Bot*** is a proof-of-concept customer service chatbot that seamlessly integrates a clean and light-weight React User interface with real-time interaction analysis powered by the IBM Watson Tone Analyzer and trained Wit.Ai decision-aggregation models

## Introduction / Problem Statement
The proliferation of offshore customer service operations has distanced users from seeking answers to time-sensitive problems, or even questions they might be facing. Navigating complex websites is daunting and places unnecessary road blocks in the way of the user. Energized by a less-than-satisfactory experience locating a mis-delivered package by one of our members, our team set out to explore ways to facilitate meaningful front-facing customer interaction - with deep learning capabilities focused on listening to the user.

### Objective
* Make a chatbot that can make API calls -- and can be deployed on a website

## Framework
We chose the [React on Rails](https://github.com/shakacode/react_on_rails) by Shakacode. Like the react-rails gem, React on Rails is capable of server-side rendering with fragment caching and is compatible with turbolinks. Unlike react-rails, which depends heavily on sprockets and jquery-ujs, React on Rails uses webpack and does not depend on jQuery. While the initial setup is slightly more involved, it allows for advanced functionality such as:

1. Redux (for action cables)
2. Webpack optimization functionality
3. React Router
4. Ability to use **both** ruby gems and npm packages
5. Can optimize for SEO (through use of pre-renders)

Cons
1. Native modules tend to break down on some module installations - cost us a lot of time
2. Debugging was difficult because of webpack

## Built with
------
* React
* Rails
* Node.js
* CSS
* [ReactSimpleChatBot](https://github.com/LucasBassetti/react-simple-chatbot)
* [Type.js.JQuery](type.js)
* [Bootstrap Dashboard](https://startbootstrap.com/template-overviews/sb-admin/)

## APIs
* [Wit.ai](https://wit.ai/)
* [IBM Watson Tone Analyzer](https://www.ibm.com/watson/developercloud/tone-analyzer.html)
* [D3](https://d3js.org/)

### Wit.ai

Natural Language Processing Bot with features like intent parser and customizable user stories.

Example of how we have implemented in our chat program, together with IBM tone analyzer

```javascript
const client = new Wit({accessToken: 'IGHNEYS623KKCXIK6HZQRHXHC6Q43QWX'})
client.message(search, {}).then((data) => {
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
```

### ReactSimpleChatBot

Bot logic behind ReactSimpleChatBot

```javascript
{
  id: 'intent2',
  options: [
      { value: 'Inquire Missing parcel', label: 'Report Missing', trigger: 'askintent1' },
      { value: 'Operator', label: 'Operator', trigger: 'operator' },
      { value: 'Others', label: 'Others', trigger: 'askintent1'},
      { value: 'Rates', label: 'Rates', trigger: 'dummy' },
      { value: 'Check Status', label: 'Check Status', trigger: 'dummy' },
      { value: 'Nearest Post Office', label: 'Rates', trigger: 'dummy' },
  ]
},
{
  id: 'dummy',
  message: 'Sorry! This feature is not ready yet!',
  trigger: 'start'
},
{
  id: 'askintent1',
  message: 'I\'m all ears',
  trigger: 'intentinput'
},
{
  id: 'intentinput',
  user: true,
  trigger: 'intent',
  validator: (value) => {
    if (!value) return 'Please try again!'
    else {
      return true
    }
  }
},
{
  id: 'intent',
  component: <Wit_ai />,
  replace: true,
  waitAction: true,
  asMessage: true,
  trigger: 'askintent1'
},

```

### IBM Watson Tone Analyzer

The IBM Watson™ Tone Analyzer service uses linguistic analysis to detect emotional, social, and language tones in written text. API has two endpoints: general purpose and customer engagement. Due to the time constraint, we only managed to implement the general tone analyzer.

API is available for several clients such node, python, java. This is how we implemented the API call from react component/javascript.

```
message = encodeURIComponent(message);
 fetch(`https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=${message}`)
.then((response) => {
  return response.json();
})
.then((json) => {
  do something with response from api
}
```

Part of the api output:

```javascript
"tones": [
    {
      "score": 0.134622,
      "tone_id": "anger",
      "tone_name": "Anger"
    },
```

### D3 for Data Visualization

D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3 has a very good documentation and lots of examples on what can be achieved with this library.

With the limited time that we have, we only managed to implement a simple bar chart and it was a challenge tweaking the graph a bit here and there.

![Graph](https://github.com/lackdaz/wdi-project4/blob/master/graph.png)

[Full code can be viewed here](https://github.com/lackdaz/wdi-project4/blob/master/client/app/bundles/Main/components/SentimentBot/SentimentBot.jsx)

------
## Development
* Week 1 - We explored **a lot** of APIs -- Google Vision API (Object recognition, Geocoding, Face recognition, Natural Language Processing, Sentiment Analysis), Twitter real-time streaming API (using Python), Wit.Ai and narrowed our focus to a chatbot that can make API calls -- and can be deployed on a website. Raymond explored app integrations using both the React-Rails and React-on-Rails.

* Week 2 - We found a recent-release react-simple-chatbot by (LucasBassetti)[https://github.com/LucasBassetti] and found it to be a really light-weight UI with styling options and somewhat flexible integration. But we had to **hack a lot**. For instance, dynamic chat routing was not supported:

![Dynamic Trigger Issue](https://github.com/lackdaz/wdi-project4/blob/master/public/img/issues1.png)

But we found a solution buried deep in documentation:

![Breakout](https://github.com/lackdaz/wdi-project4/blob/master/public/img/solution1.png)

which opened up to the possibility -- and *complexities* of doing (req,res) callbacks within the chat engine. We spent a lot of time debating, experimenting and integrating this feature, and understanding the chat engine and design.

We opened a number of issues, and gave some recommendations for modest improvement on the engine -- and changes were implemented very quickly!:

![Feedback](https://github.com/lackdaz/wdi-project4/blob/master/public/img/feedback.png)


* Week 3 - Ultimately, in the final product sprint, we downloaded the source codes and made several modifications to allow for bi-directional flow of information between our components -- and this allowed us a lot of creative and programming freedom for passing states and props between the parent component and child components.

## Components

| Parent | Child                | Child  |
|:------:|:------:              |:------:|
| MainApp| Chatbot (NPM)        | Many   |
| --     | SentimentBot         | --     |
| --     | CustomerServiceChat  | --     |


### Obstacles
* Implementing user stories for chatbots is difficult!
* The React Component lifecycle was very challenging -- especially to API calls that have the same message/response
* Webpacks crash your Atom if you're not careful! It basically disabled search-all functions
* The webpack precompiling of .css and .js files doesn't seem to work very well with .scss files. I had to modify custom bootstrap css to do CSS styling

### Points of Interest
* Chatbots are very, very useful --- especially when used with the ReactDOM router. It can help to direct you to relevant pages.
* Introducing dynamic chat routing increases your code complexity exponentially

### Performance
* There are definitely performance issues -- particular with new initializing new sessions and large chat sessions. We've noticed that all the previous chat messages are re-rendered each update, and finding shouldComponentUpdate conditions that limit needless re-rendering and not break the code is **very challenging**

### Future
* More emotional chatbot profiles!
* For practical/innovative use cases [here](https://keyreply.com/botspeak/). I particularly liked IKEA Bot
------

## Credit
This is a proof-of-concept project and naturally all contributions are welcome.

### Contributors
* Raymond Aung Pyae Sone, GA Full-stack Developer
* Seth Loh Wei Chen, GA Full-stack Developer

### Acknowledgements
* We are incredibly thankful to the developer [LucasBassetti](https://github.com/LucasBassetti) for giving us helpful pointers along the way since this was our first React project and graciously allowed us to use his base codes.
* [Yi Sheng](https://github.com/yisheng90) for the useful guidance
* [Sharona](https://github.com/sharona1610) for the ERD advice
* [Prima](https://github.com/primaulia) for the massive amount of patience and debugging help!
* All of GA coursemates for being supportive and the good humour

### Image credits:
* [Images](https://unsplash.com/@halgatewood
