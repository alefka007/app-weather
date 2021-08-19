const rp = require('request-promise')

module.exports = async function (city = '') {
    if (!city) {
        throw  new Error('Название города не может буть пустым')
    }

    const KEY = 'c1d257a37b7b4fecedee0340b33d989d'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data =  await rp(options)
        const celsius = (data.main.temp - 32) * 5/9
        
        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }

}