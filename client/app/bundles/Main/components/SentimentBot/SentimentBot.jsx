import React from 'react';
import CustomerServiceChat from './CustomerServiceChat'
// import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3'

export default class SentimentBot extends React.Component {
    // static propTypes = {
    //   name: PropTypes.string.isRequired, // this is passed from the Rails view
    // };

    /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
    constructor(props, _railsContext) {
        super(props);
        this.state = {
            // steps: this.props.steps,
            // response: this.props.response
        };

        // How to set initial state in ES6 class syntax
        // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
        // this.state = { name: this.props.name };
    }

    checktone(message) {
      if(message) {
        message = encodeURIComponent(message)
        // let message = encodeURIComponent(document.getElementById('message').value)
        // fetch(`http://omdbapi.com/?s=${message}`)
        fetch(`https://watson-api-explorer.mybluemix.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=${message}`)
        .then((response) => {
          // console.log('first fetch response')
          return response.json()
        })
        .then((json) => {
          // console.log('second fetch json')
          // console.log(json)
          // console.log(input)
          var tonesArr = []
          let angerScore = 0
          // var res = JSON.parse(input)
          // var res = json
          // console.log(res.document_tone.tone_categories)
          json.document_tone.tone_categories.map( (tones) => {
            // console.log(val)
            tones['tones'].map((tone) => {

              if (tone['tone_name'] === 'Anger') {
                angerScore = tone['score']
              }
              var toneObj = {}
              toneObj.tone_name = tone['tone_name']
              toneObj.score = tone['score']
              tonesArr.push(toneObj)
            })
          })
          console.log('checktone is' + angerScore)

          this.renderGraph(tonesArr, angerScore)
          // this.setState({
          //   searchResult: json.Search.map((movies) => movies.Title ),
          // })
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }

    renderGraph(data, angerScore) { // seth
      var svg = d3.select("#sentiment-graph"),
        margin = {top: 20, right: 20, bottom: 100, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
      var y = d3.scaleLinear().rangeRound([height, 0]);

      // Define the axes
      // var xAxis = d3.svg.axis().scale(x)
          // .orient("bottom").ticks(5);

      // var yAxis = d3.svg.axis().scale(y)
          // .orient("left").ticks(5);
      if(document.getElementsByTagName("rect").length === 0) {

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function(d) { return d.tone_name; }));
        y.domain([0, d3.max(data, function(d) { return d.score; })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "%"))
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Score");

        g.selectAll(".svg")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.tone_name); })
            .attr("y", function(d) { return y(d.score); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.score); });
      } else {
        // udpate the graph

        x.domain(data.map(function(d) { return d.tone_name; }));
        y.domain([0, d3.max(data, function(d) { return d.score; })]);

        svg.selectAll("rect")
            .data(data)
            // .enter()
        		// .append("rect")
        		// .attr("class", "bar")
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x(d.tone_name); })
            .attr("y", function(d) { return y(d.score); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.score); })

        // y axis
        svg.select(".axis--y")
          .transition()
          .duration(1000)
          .call(d3.axisLeft(y).ticks(10, "%"))

      }
      this.props.handleLoadingDone(angerScore, data) // seth
    }

    componentWillReceiveProps(nextProps) {
      // console.log("called receive props!")
      // console.log(this.props.opened)
      // console.log(nextProps.opened)
      // console.log(this.props.opened !== nextProps.opened)
      if (this.props.response !== nextProps.response) {
        this.checktone(nextProps.response)
      }
    }

    render() {
      return (
          <div className="graph">
            {/* <input type="text" placeholder="type something" id="message" /> */}
            {/* <button onClick={ (e) => this.checktone(e, this.props.response)}>Check Tone!</button> */}

            {/* <div> */}
              <CustomerServiceChat />
              <svg id="sentiment-graph" width="480" height="300"></svg>
            {/* </div> */}
              {/* write logic for sentiment bot here  */}
          </div>
      );
    }
}
