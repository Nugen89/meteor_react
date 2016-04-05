var AccessToken = require('../node_modules/twilio/lib').AccessToken;

// Substitute the following values using the details from your Twilio Account
var ACCOUNT_SID = Meteor.settings.public.twilio-account-sid;
var API_KEY_SID = Meteor.settings.public.twilio-api-sid;
var API_KEY_SECRET = Meteor.settings.public.twilio-api-key-secret;
var CONFIGURATION_PROFILE_SID = CONFIGURATION_PROFILE_SID;

// Create an Access Token
var accessToken = new AccessToken(
  ACCOUNT_SID,
  API_KEY_SID,
  API_KEY_SECRET
);

// Set the Identity of this token
accessToken.identity = 'example-user';

// Grant access to Conversations
var grant = new AccessToken.ConversationsGrant();
grant.configurationProfileSid = CONFIGURATION_PROFILE_SID;
accessToken.addGrant(grant);

// Serialize the token as a JWT
var jwt = accessToken.toJwt();
console.log(jwt);