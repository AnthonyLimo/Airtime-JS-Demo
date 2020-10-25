// Set up airtime notifications

// Create your express app

const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')


const port = 3000//process.env.PORT

// Initialize Africa's Talking

const credentials = {
    apiKey: '',
    username: 'sandbox'
}

const Africastalking = require('africastalking')(credentials)

const airtime = Africastalking.AIRTIME

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ROUTES

app.get('/', (req, res) => {
    res.render('index', { title: 'Airtime Demo App' })
})

app.post('/', (req, res) => {
    
    phoneNumber = req.body.phoneNumber
    amount = req.body.amount

    const options = {
        recipients: [{
            phoneNumber: phoneNumber,
            currencyCode: 'KES',
            amount: amount
        }]
    }

    try {
        response = airtime.send(options).then(msg => {
            console.log(msg)
            if (msg.errorMessage == 'None') {
                res.render('success')
            } else {
                res.render('error')
            }
        })
    } catch(e) {
        console.log(`Houston we have an issue: ${e}`)
        res.render('error')
    }
})

// Notification routes

app.post('/validation', (req, res) => {

    // This function allows you to validate
    // airtime requests from the application

    // Check if the transaction id matches what you
    // have on your DB/app-state

    // Save the data if you need to
    if (req.body) {
        res.send({
            status: 'Validated'
        })
    }
})

app.post('/status', (res, req) => {

    // This function checks whether the airtime
    // sent was delivered
    
    if (req.body.status == 'Success') {

        // You can add a new field to your DB
        // that allows you to add a record on whether
        // the airtime was delivered
        res.status(200)
    } else {
        // The only other option is Failed
        // so we only return a not delivered
        // status

        res.status(400)
    }
})

app.listen(port, () => {
    console.log(`Port running on: ${port}`)
})