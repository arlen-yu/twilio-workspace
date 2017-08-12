const express = require('express');

const router = express.Router();
const config = require('../config.json');
const AccessToken = require('twilio').jwt.AccessToken;

const VideoGrant = AccessToken.VideoGrant;

/* GET users listing. */
router.get('/', (req, res) => {
  const token = new AccessToken(config.account_SID, config.api_key, config.api_secret);
  token.identity = req.params.identity;

  const grant = new VideoGrant();
  token.addGrant(grant);
  res.send({ identity: req.params.identity, token: token.toJwt() });
}, (error) => {
  console.log(error);
});

module.exports = router;
