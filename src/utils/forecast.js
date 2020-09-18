const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=96776f662136e009595c54aa31bfe81f&query=' + longitude + ',' + latitude + '&units=f'
    
    request({url, json: true}, (error , {body} ) => {
        if(error) {
            callback('No Network', undefined)
        } else if(body.error) {
            callback('No location', undefined)
        } else {
            callback (undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature + " degrees out. It feels like "+ body.current.feelslike +" degrees. Humidity is " + body.current.humidity
            )
        }
    })
}

module.exports = forecast