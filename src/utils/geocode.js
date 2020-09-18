const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVoYXIwNiIsImEiOiJja2Yyd2FlcHIwNmltMnlrMmx0aHA4d3Z3In0.ZEqbuiNTTz39QaSKOS_Jew&limit=1'
    
    request({url, json: true}, (error , {body} ) => {
        if(error) {
            callback('No Network', undefined)
        } else if(body.features.length === 0) {
            callback('No location', undefined)
        } else {
            callback (undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode