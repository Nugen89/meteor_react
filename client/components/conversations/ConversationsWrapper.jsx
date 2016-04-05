import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Resolutions = new Mongo.Collection("resolutions");

export default class ConversationsWrapper extends TrackerReact(React.Component) {

  constructor() {
    super();
    // this.state = {
    //   subscription: {
    //     resolutions: Meteor.subscribe('userResolutions')
    //   }
    // }
    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      alert('WebRTC is not available in your browser.');
    }
  }

  // componentWillUnmount() {
  //   this.state.subscription.resolutions.stop();     
  // }

  browserCompatible() {
    if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
      return false;
    } else {
      return true;
    }
  }

  browserIncompatibleMsg() {
    return (
      <div>
        <h2>Sorry your browser is not compatibile with WebRTC</h2>
        <p>Try a supported browser like Chrome.</p>
      </div>
    );
  }

  videoPreview() {
    var previewMedia;
    previewMedia = new Twilio.Conversations.LocalMedia();
    Twilio.Conversations.getUserMedia().then(
      function (mediaStream) {
        previewMedia.addStream(mediaStream);
        previewMedia.attach('#local-media');
      },
      function (error) {
        console.error('Unable to access local media', error);
        log('Unable to access Camera and Microphone');
      }
    );
  }

  twilioQuickstart() {
    // generate an AccessToken in the Twilio Account Portal - https://www.twilio.com/user/account/video/testing-tools
    var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM5MzNiOTViZDcwMGU3MzRmOTczZTcwZmU4MmQ2MGM1LTE0NTk4NTQ2NTYiLCJpc3MiOiJTSzM5MzNiOTViZDcwMGU3MzRmOTczZTcwZmU4MmQ2MGM1Iiwic3ViIjoiQUMzZjVmYTI4YTlhNjE4NzcwNWYzNGU1MTYyNjg3M2RhMyIsImV4cCI6MTQ1OTg1ODI1NiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiTnVnZW4iLCJydGMiOnsiY29uZmlndXJhdGlvbl9wcm9maWxlX3NpZCI6IlZTZGNjNzcwNDEzMjMzNDM4Yjc1M2I3OThlMGMxOThiNDMifX19.SYamdgaZ9LzDH6vA6qDeu4y6_2FLQDWWi1GIRQajE-g";    // use our AccessToken to generate an AccessManager object
    var accessManager = new Twilio.AccessManager(accessToken);

    // create a Conversations Client and connect to Twilio
    conversationsClient = new Twilio.Conversations.Client(accessManager);
    conversationsClient.listen().then(
      this.clientConnected(),
      function (error) {
        console.log('Could not connect to Twilio: ' + error.message);
      }
    );
  }

  clientConnected() {
    document.getElementById('invite-controls').style.display = 'block';
    this.log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");

    conversationsClient.on('invite', function (invite) {
      console.log('Incoming invite from: ' + invite.from);
      invite.accept().then(this.conversationStarted);
    });

    // bind button to create conversation
    document.getElementById('button-invite').onclick = function () {
      var inviteTo = document.getElementById('invite-to').value;

      if (activeConversation) {
        // add a participant
        activeConversation.invite(inviteTo);
      } else {
        // create a conversation
        var options = {};
        if (previewMedia) {
          options.localMedia = previewMedia;
        }
        conversationsClient.inviteToConversation(inviteTo, options).then(
          this.conversationStarted,
          function (error) {
            console.log('Unable to create conversation');
            console.error('Unable to create conversation', error);
          }
        );
      }
    };
  }

  log(message) {
    document.getElementById('log-content').innerHTML = message;
  }

  conversationStarted(conversation) {
    log('In an active Conversation');
    activeConversation = conversation;
    // draw local video, if not already previewing
    if (!previewMedia) {
      conversation.localMedia.attach('#local-media');
    }
    // when a participant joins, draw their video on screen
    conversation.on('participantConnected', function (participant) {
      log("Participant '" + participant.identity + "' connected");
      participant.media.attach('#remote-media');
    });
    // when a participant disconnects, note in log
    conversation.on('participantDisconnected', function (participant) {
      log("Participant '" + participant.identity + "' disconnected");
    });
    // when the conversation ends, stop capturing local video
    conversation.on('ended', function (conversation) {
      log("Connected to Twilio. Listening for incoming Invites as '" + conversationsClient.identity + "'");
      conversation.localMedia.stop();
      conversation.disconnect();
      activeConversation = null;
    });
  }

  getVideoForm() {
    return (
      <div className="ui two column centered grid">
        <div className="column">
          <h2 className="instructions">Get started by finding a match.</h2>
          <div id="log">
            <p>&gt;&nbsp;<span id="log-content">Preparing to listen</span>...</p>
          </div>
          <div className="ui hidden divider"></div>

          <div id="controls">
            <button 
              id="button-preview"
              onClick={this.videoPreview.bind(this)} 
              className="ui primary button">Preview My Camera</button>
            <button 
              id="twilio-connect"
              onClick={this.twilioQuickstart.bind(this)} 
              className="ui primary button">Twilio Connect</button>
          </div>

          <div className="ui hidden divider"></div>

          <div id="local-media"></div>

          <div className="ui section divider"></div>

          <div id="remote-media"></div>

          <div className="ui hidden divider"></div>

          <div id="invite-controls">
            <div className="ui action input">
              <input id="invite-to" type="text" placeholder="Identity to invite"/>
              <button 
                id="button-invite"
                className="ui primary button">Send Invite</button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.browserCompatible() ? this.getVideoForm() : this.browserIncompatibleMsg()}
      </div>
    );
  }
}







