//instatiate intializing packages
require('dotenv').config()
const ngrok = require('ngrok')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('superagent')
const app = express()
const port = process.env.PORT
const contactApiBase = `https://driftapi.com/contacts/`
const conversationApiBase = 'https://driftapi.com/conversations/'
const token = process.env.MYTOKEN

//leverage middleware for response/request objects
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//serve server locally
app.listen(port, () => {
    console.log(`App running locally on: http://localhost:${port}`);
});
//expose local webserver to internet
startNgrok = async () => {
    const url = await ngrok.connect(port)
    console.log(`Public facing URL is: ${url}`)
    console.log(`Payload digestion URL is: ${url}/api`)
}
startNgrok()

//define overall routing logic to and from Drift
app.post('/api', async (req, res) => {
    try {
        const driftContact = req.body.data.contactId
        const driftConversation = req.body.data.conversationId
        console.log(`This is the unique ID of the contact that just submitted data: ${driftContact}`)
        console.log(`This is the unique ID of the conversation: ${driftConversation}`)
        const contactDetails = await getContactData(driftContact)
        console.log(contactDetails)
        const monthlyPayment = Math.floor(contactDetails.homeCost * ((contactDetails.interestRate * (Math.pow(1 + contactDetails.interestRate, contactDetails.loanLength))) / (Math.pow(1 + contactDetails.interestRate, contactDetails.loanLength) - 1)))
        console.log(monthlyPayment)
        request.post(`${conversationApiBase}${driftConversation}/messages`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "type": "chat",
                "body": `Thank you for being patient! Your calculated monthly mortgage payment is ${monthlyPayment} dollars a month!`
            })
            .then(res => {
                return res
            })
            .catch(err => {
                return {
                    error: err.message
                }
            })

    } catch (error) {
        console.error(error)
    }
})

//helper function using superagent to query Drift to retrieve data input from in order to calculate loan
const getContactData = (driftContact) => {
    return request.get(`${contactApiBase}${driftContact}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            const homeCost = res.body.data.attributes.cost_of_home
            const loanLength = (res.body.data.attributes.length_of_loan) * 12
            const interestRate = ((res.body.data.attributes.interest_rate) * .01) / 12
            return {
                homeCost, loanLength, interestRate
            }

        })
        .catch(err => {
            return {
                error: err.message
            }
        })
}





