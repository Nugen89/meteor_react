import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ResolutionsForm from './ResolutionsForm.jsx';
import ResolutionSingle from './ResolutionSingle.jsx';
import ConversationsWrapper from '../conversations/ConversationsWrapper.jsx';

Resolutions = new Mongo.Collection("resolutions");

export default class ResolutionsWrapper extends TrackerReact(React.Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        resolutions: Meteor.subscribe('userResolutions')
      }
    }

    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      alert('WebRTC is not available in your browser.');
    }
  }

  // componentDidMount() {
  // }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();     
  }

  resolutions() {
    return Resolutions.find().fetch();
  }

  render() {
    return (
      <div className="wrapper">
        <ReactCSSTransitionGroup
            component="div"
            transitionName="route"
            transitionEnterTimeout={600}
            transitionAppearTimeout={600}
            transitionLeaveTimeout={400} 
            transitionAppear={true}>
          <h1>Hello World</h1>
          <ResolutionsForm />
          <ReactCSSTransitionGroup
            component="ul"
            className="resolutions"
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400} >
            {this.resolutions().map( (resolution)=>{
              return <ResolutionSingle key={resolution._id} resolution={resolution} />
            })}
          </ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>

        <ConversationsWrapper />
      </div>
    );
  }
}

// if (Meteor.isClient) {
//   Meteor.startup(function(){
//     React.render(<App />, document.getElementById("render-target"));
//   });
// }