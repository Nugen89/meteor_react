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
    var accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM5MzNiOTViZDcwMGU3MzRmOTczZTcwZmU4MmQ2MGM1LTE0NTk3MzU3NjkiLCJpc3MiOiJTSzM5MzNiOTViZDcwMGU3MzRmOTczZTcwZmU4MmQ2MGM1Iiwic3ViIjoiQUMzZjVmYTI4YTlhNjE4NzcwNWYzNGU1MTYyNjg3M2RhMyIsImV4cCI6MTQ1OTczOTM2OSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoicXVpY2tzdGFydCIsInJ0YyI6eyJjb25maWd1cmF0aW9uX3Byb2ZpbGVfc2lkIjoiVlNkY2M3NzA0MTMyMzM0MzhiNzUzYjc5OGUwYzE5OGI0MyJ9fX0.is5p2tDEoC14RQM4PqhGQRkV4hgUvWwenz8e2ydhvMc";    // use our AccessToken to generate an AccessManager object
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

  render() {
    return (
      <div className="video-wrapper">        
        <div id="remote-media"></div>
        <div id="controls">
          <div id="preview">
            <p className="instructions">Lookin good!</p>
            <div id="local-media"></div>
            <button id="button-preview" onClick={this.videoPreview.bind(this)}>Preview My Camera</button>
            <button id="twilio-connect" onClick={this.twilioQuickstart.bind(this)}>Twilio Connect</button>
          </div>
          <div id="invite-controls">
            <p className="instructions">Invite another Client</p>
            <input id="invite-to" type="text" placeholder="Identity to invite" />
            <button id="button-invite">Send Invite</button>
          </div>
          <div id="log">
            <p>&gt;&nbsp;<span id="log-content">Preparing to listen</span>...</p>
          </div>
        </div>
      </div>
    );
  }
}