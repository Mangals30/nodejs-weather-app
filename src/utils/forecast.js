const request = require('request')
const forecast = (longitude, lattitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c278bc3437cce08e8402f7c17fcc20ba&query=' + encodeURIComponent(lattitude) + ',' + encodeURIComponent(longitude) + ' '
  request({url, json:true},(err, {body}) => {
    const {error,current} = body
   if(err) {
     callback('Unable to connect!', undefined)
   }
   else if (error) {
     callback('Unable to find the location!',undefined)
   }
   else {
     const {temperature,feelslike,weather_descriptions,weather_icons} = current
    // callback(undefined,`${weather_descriptions[0]}. It is ${temperature} degrees. It feels like ${feelslike} degrees out.`,weather_icons[0])
    callback(undefined,{
      forecast : `${weather_descriptions[0]}. It is ${temperature} degrees. It feels like ${feelslike} degrees out.`,
      icon : weather_icons[0]
    })
   }
  })
}
module.exports = forecast