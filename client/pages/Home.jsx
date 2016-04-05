import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Home extends Component {

  setVar() {
    Session.set('Meteor.loginButtons.dropdownVisible', true);
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
        <h1>Welcome to Speakr</h1>
        <p>Learn to speak new languages faster by finding native and fluent speakrs with the click of a button.</p>
        <div className="ui animated primary button" tabindex="0">
          <div className="visible content">Get Started.</div>
          <div className="hidden content">
            <a href="videoChat">Find me a speakr!</a>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}
//         <button className="ui primary button" onClick={this.setVar}>Get Started.</button>
