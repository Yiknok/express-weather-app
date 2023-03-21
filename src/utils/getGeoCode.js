const request = require('postman-request')

const getGeoCode = (adress, callback) =>{
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoieWlrbm9rIiwiYSI6ImNsZXpyeWd5ODAyNDIzc3M4OGZwampmN28ifQ.FU-IylfN5nYUihhmlWrTPw&limit=1'
    request({url:geoCodeUrl, json:true}, (error,{body}) =>{
        if(error){
            callback('Unable to connect to network!',undefined)
        }
        else if(body.features.length === 0){
            callback('Input data is wrong!', undefined)
        }
        else{
            latitude = body.features[0].center[1]
            longitude = body.features[0].center[0]
            location = body.features[0].place_name
            callback(undefined,{
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = getGeoCode;