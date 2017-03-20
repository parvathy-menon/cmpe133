const Yelp = require('yelp');

const yelp = new Yelp({
  consumer_key: '9HmtA8JSGhJyhkzYC_07Eg',
  consumer_secret: 'NcDOmqldwulUxzNj1vcsZzErPQk',
  token: 'Ck_9Np3gLjbpEy1ks3vtHGJXYJDul3Oh',
  token_secret: 'uvVIsIpGYO7JbuciZhkoENmyO8A',
});

var gym_names = [];
var gym_url = [];
var gym_addr = [];
var gym_display = [];

// TODO: need client side url to get search location. so far testing for San Jose area.
//var req = require(url);
//var location = request.params.location
var location = 'san jose';

exports.getGyms = req =>
  new Promise((resolve,reject) => {
    yelp.search({ term: 'gym', location: location })
      .then(function (data) {
      //  console.log(data);
      for (i = 0; i < data.businesses.length; i++){
        gym_names.push(data.businesses[i].name);
        gym_url.push(data.businesses[i].url);
        gym_addr.push(data.businesses[i].location.display_address);
      }

      for (var i = 0; i < gym_names.length; i ++) {
        gym_display.push([gym_names[i], gym_addr[i], gym_url[i]]);
      }

      console.log(gym_display);
      resolve(gym_display);
    })
    .catch(function (err) {
      console.error(err);
      reject(err);
    });
  });
