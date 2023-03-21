const request = require("postman-request");

const getForecast = (latitude, longitude, callback) => {
    const urlWeather = 'http://api.weatherstack.com/current?access_key=aed1b7b5deef98f04e5152b8457ed625&query=' + latitude + ',' + longitude + '&units=m';
    request({ url: urlWeather, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connetct to network!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location!', undefined);
        }
        else {
            temperature =body.current.temperature
            feelsLike = body.current.feelslike
            callback(undefined, {
                temperature,
                feelsLike
            })
        }
    })
}

module.exports = getForecast