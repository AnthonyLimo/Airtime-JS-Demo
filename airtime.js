// Initial airtime sending script

const credentials = {
    apiKey: '',
    username: 'sandbox'
}

const Africastalking = require('africastalking')(credentials)

const airtime = Africastalking.AIRTIME

async function sendAirtime() {
    const options = {
        recipients: [{
            phoneNumber: '+254722000000',
            currencyCode: 'KES',
            amount: '200'
        }]
    }

    response = await airtime.send(recipients)
}

sendAirtime()