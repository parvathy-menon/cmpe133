'use strict';
const express = require('express');
const yelp = require('yelp-fusion');
const router = express.Router();


const clientId = '_ectfG6zRqd-vflVHDH8ow';
const clientSecret = 'TOlwUcELMEJ5E9Yp5o2cCUxAPCDSvW5ivs7V8u9kGt0Xw5htYHwftiI7rnbRfqzW';



// address can be either city name or zip code
router.get('/:address', (req,res) => {
  new Promise((resolve,reject) => {
    yelp.accessToken(clientId, clientSecret).then(response => {
      const searchRequest = {
        term:'gym',
        location: req.params.address
      };
      const client = yelp.client(response.jsonBody.access_token);
      client.search(searchRequest).then(response => {
        var gyms = [];

        for (var i = 0; i < response.jsonBody.businesses.length; i++){
            gyms.push(response.jsonBody.businesses[i]);

        }
       // const prettyJson = JSON.stringify(gyms, null, 4);
        const prettyNames = JSON.stringify(gyms, null, 4);

    //    console.log(prettyNames);
        var result = {"list": gyms};
        console.log("succeed~");
        res.json(result);
        // Returns the full business info. For client side, to get the first gym name, use result.list[0].name);
        // see Yelp fusion api for more info
      });
    }).catch(function (err) {
        console.error(err);
        reject(err);
    });
  });
});

module.exports = router;
