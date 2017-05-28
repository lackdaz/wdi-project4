import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';

class DBPedia extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.loading)
    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.search.value;
    const endpoint = encodeURI('https://dbpedia.org');
    const query = encodeURI(`
      select * where {
      ?x rdfs:label "${search}"@en .
      ?x rdfs:comment ?comment .
      FILTER (lang(?comment) = 'en')
      } LIMIT 100
    `);

// http://lookup.dbpedia.org/api/search.asmx/PrefixSearch?QueryClass=&MaxHits=5&QueryString=berlin&format=json

    const queryUrl = `https://dbpedia.org/sparql/?default-graph-uri&query=${query}&format=json`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText);
        const bindings = data.results.bindings;
        if (bindings && bindings.length > 0) {
          self.setState({ loading: false, result: bindings[0].comment.value });
        } else {
          self.setState({ loading: false, result: 'Not found.' });
        }
      }
    }

    xhr.open('GET', queryUrl);
    xhr.send();
  }

  triggetNext(end) {
    this.setState({ trigger: true }, () => {
      // this.props.triggerNextStep(null,{ end });
       this.props.triggerNextStep({ value: null, trigger: end });
    });
  }

  render() {
    const { loading, result, trigger } = this.state;

    return (
      <div className="dbpedia">
        { loading ? <Loading /> : result }
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
              <button
                onClick={() => this.triggetNext(this.props.steps.search.value)}
              >
                Search Again
              </button>
            }
          </div>
        }
      </div>
    );
  }
}

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const ExampleDBPedia = () => (
  <ChatBot
    steps={[
      {
        id: '1',
        message: 'Type something to search on Wikipédia. (Ex.: Brazil)',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        component: <DBPedia loading={true} result="" trigger="" />,
        waitAction: true,
        trigger: '1',
      },
      {
        id: 'end',
        message: 'Thank you so much react-simple-chatbot!',
        end: true,
      },
      {
        id: 'brazil',
        message: 'This is insane!',
        trigger: '1',
      },
    ]}
  />
);

export default ExampleDBPedia;
