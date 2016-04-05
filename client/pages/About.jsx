import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class About extends Component {

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
        <h1>About Us</h1>
        <p>Authentic semiotics neutra, you probably haven't heard of them post-ironic kitsch pabst fashion axe green juice craft beer dreamcatcher crucifix actually selfies heirloom. Schlitz helvetica wayfarers, 3 wolf moon green juice fixie banjo. Photo booth heirloom gentrify typewriter, polaroid keytar forage godard XOXO kitsch hella mumblecore cornhole yuccie. Bespoke chicharrones pabst gastropub, hammock pop-up direct trade literally hella intelligentsia. Chicharrones pork belly kombucha jean shorts trust fund. Keytar disrupt pug, lumbersexual celiac DIY knausgaard tattooed flannel everyday carry actually cliche. Church-key intelligentsia iPhone farm-to-table butcher, next level occupy sartorial yuccie.</p>
        <button onClick={this.setVar}>Sign Up</button>
      </ReactCSSTransitionGroup>
    )
  }
}