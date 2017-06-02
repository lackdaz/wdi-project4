# CSM Bot
https://thingies.herokuapp.com/

[Heroku Deployment](https://postalcsbot.herokuapp.com/)

## Short
***CSM Bot*** is a proof-of-concept customer service chatbot that seamlessly integrates a clean and light-weight React User interface with real-time interaction analysis powered by the IBM Watson Tone Analyzer and trained Wit.Ai decision-aggregation models

## Introduction / Problem Statement
The proliferation of offshore customer service operations has distanced users from seeking answers to time-sensitive problems, or even questions they might be facing. Navigating complex websites is daunting and places unnecessary road blocks in the way of the user. Energized by a less-than-satisfactory experience locating a mis-delivered package by one of our members, our team set out to explore ways to facilitate meaningful front-facing customer interaction - with deep learning capabilities focused on listening to the user.

### Objective
* Make agit  chatbot that can make API calls -- and can be deployed on a website

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
* [D3](https://d3js.org/)
* [Type.js.JQuery](type.js)

## APIs
* [IBM Watson Tone Analyzer](https://www.ibm.com/watson/developercloud/tone-analyzer.html)
* [Wit.ai](https://wit.ai/)

------
## Development
* Week 1 - We explored **a lot** of APIs -- Google Vision API (Object recognition, Geocoding, Face recognition, Natural Language Processing, Sentiment Analysis), Twitter real-time streaming API (using Python), Wit.Ai and narrowed our focus to a chatbot that can make API calls -- and can be deployed on a website. Raymond explored app integrations using both the React-Rails and React-on-Rails.
* Week 2 - We found a recent-release react-simple-chatbot by (LucasBassetti)[https://github.com/LucasBassetti] and found it to be a really light-weight UI with styling options and somewhat flexible integration. But we had to **hack a lot**. For instance, dynamic chat routing was not supported:

![Dynamic Trigger Issue](/issues1.png)



* Day 3 = Learn MQTT, rigged up a simple connection
* Day 4 = Successfully executed flash, user authentication and models
* Day 5 = Finished CRUD, routes in one day!
* Day 6 = Debugging, CSS and documentation (barely made it)




## ERD
![ScreenShot](https://github.com/lackdaz/wdi-project-2/blob/master/uploads/ERD.jpeg)


## Models, Routes, Controllers
Sentinel
![Thingies Sentinel] (photo link here "Sentinel")

| mqttController | eventController | thingController | userController |
| ------ |:------:| ------:| ------: |
| index: | -- | -- | index: |
| open: | list: | list: | list: |
| openForX: | new: | new: | new: |
| lock: | -- | -- | login: |
| superlock: | create: | create: | create: |
| listen: | -- | -- | dashboard: |
| listenNoUser: | show: | show: | -- |
| -- | edit: | edit: | -- |
| -- | -- | createUser: | -- |
| -- | update: | update: | update: |
| -- | delete: | delete: | -- |
| -- | -- | -- | settings: |
| -- | -- | -- | editChild: |
| -- | -- | -- | updateChild: |
| -- | -- | -- | logout: |

#### Models
| Model #1: User       | Model #2: Thing | Model #3: Event |
| -------------------- |:----------------|:----------------:
| name                 | name            | uid             |
| email                | thingId         | time            |
| password             | userId          | isEntry         |
| isAdmin              | owner           |                 |
| cardUid              |                 |                 |
| related              |                 |                 |


### Obstacles
* Understanding websockets! Enigmatic but fascinating stuff!
* Deploying a user-study in a full-stack application within a week - I 'pivoted' my ideas 3 times
* Server-end: big problems on assigning topics without hosting the websocket
* Device-end: without the ability to update and compile the code remotely, it was difficult to implement any purposeful and flexible multi-device applications - one solution is to embed the different functions into topic messages themselves, or the use of cloud-based compilers like Particle.io or AWS. I've also read that new npm mqtt server routers have recently popped up but I didn't have the time to try these out - do let me know if you have any experience!

### Points of Interest
* The helper function to extract the cardUid
* Sending messages as an array of characters!

#### Performance
* There are definitely a lot of security issues - that I do not yet know how to fix yet, and I'm not too certain about how the application is robust enough to handle multiple access requests.

#### Design
![ScreenShot](https://github.com/lackdaz/wdi-project-2/blob/master/uploads/Design.jpeg)

More wireframing and previous models/plans can be found: [here](https://github.com/lackdaz/wdi-project-2/tree/master/uploads)

### Future
* User profiles! I kept the model for future development of saving 'user preferences' to achieve more 'ambient' forms of UX. Essentially, I predict that manual applications like RFID card-reading would be replaced by remote authentication - like beacons, chip implants, blockchain - so hopefully this runs along the same grain
* Smart lights are the natural next step, the original intention of the project was to achieve [this](http://adityatannu.com/blog/post/2016/01/24/ESP8266-Websockets-demo-using-NeoPixels.html), but with more user-friendly documentation
* This requires better encryption, more security features to be ever considered for public-access use. As of writing, I cannot guarantee the safety of any personal data

------

## Credit
This is a live project; all code contributions are welcome.

### Author
* Seth Loh Wei Chen, GA Web Dev Student and Exploring Maker

### Acknowledgements
* [Cleavan](https://www.linkedin.com/in/cleavan/) for the food, patience and user testing, and running my 3D prints for me!
* [Han Sheng](https://github.com/hsquek) for the timely advice, and observant eye at helping me to debug my code
* [John](https://github.com/johnacs) for the help in MQTT, CSS tricks and inspiration for this project
* [Xavier](https://github.com/random-9) for the bootstrap and logo hacks
* [Yi Sheng](https://github.com/yisheng90) for the useful guidance
* [Sharona](https://github.com/sharona1610) for the ERD advice
* [Raymond](https://github.com/ijmeister) for the massive amount of patience and debugging help!
* [Kenneth](https://github.com/DarkArtistry) for the few lines of code and helper functions that got me off in the right direction.

### Resources

* [Bootstrap Dashboard](https://startbootstrap.com/template-overviews/sb-admin/)
* [Landing Page Theme](https://www.bootstrapzero.com/bootstrap-template/small-apps-themefisher)

### Image credits:
* [Icons](http://fontawesome.io/3.2.1/icons/)
* [Logo](https://www.logomaker.com/)
* [Logo](http://www.cnx-software.com/wp-content/uploads/2016/02/Wemos_D1_mini.jpg)
