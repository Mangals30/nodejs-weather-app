const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFuZ2FsczMwIiwiYSI6ImNrY2VzYTg0YzA4eHIyeHBmMno1bjdyMngifQ.XVio8YW1XEE9ds8ur_2qXg&limit=1'
  request({url, json : true},(error,{body}={}) => {
    const {features} = body
    if(error) {
      callback('Unable to reach the geoURL',undefined)
    }
    else if(features.length == 0) {
      callback('Unable to find the location',undefined)
    }
    else {
      const {center,place_name} = features[0]
      const longitude = center[0]
      const lattitude = center[1]
      callback(undefined, {longitude,lattitude,place_name})
    }
  })
}

module.exports = geocode