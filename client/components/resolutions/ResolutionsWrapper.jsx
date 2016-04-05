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

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();     
  }

  getMeteorData() {
    var data = {
      canShow: !!Meteor.user()
    }
  }

  noAuthMessage() {
    return (
      <p>You are notauthorised to view this page.</p>
    );
  }

  resolutions() {
    return Resolutions.find().fetch();
  }

  render() {
    return (
      <ReactCSSTransitionGroup
          component="div"
          transitionName="route"
          transitionEnterTimeout={600}
          transitionAppearTimeout={600}
          transitionLeaveTimeout={400} 
          transitionAppear={true}>

        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <ResolutionsForm />
          </div>
        </div>

        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
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
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

// if (Meteor.isClient) {
//   Meteor.startup(function(){
//     React.render(<App />, document.getElementById("render-target"));
//   });
// }