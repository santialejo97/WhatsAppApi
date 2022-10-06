const { response, request } = require('express')
const express = require('express')
const body_parse = require('body-parser')
const axios = require('axios')
require('dotenv').config()


const app = express().use(body_parse.json())

const tokenApi = process.env.TOKEN

const tokenParam = process.env.TOKENPARAM

app.listen(1337, () => {
    console.log('El servidor Arriba')
})

// Router

app.get('/webhook', (req = request, res = response) =>{
    let mode = req.query['hub.mode']
    let challenge = req.query['hub.challenge']
    let toke = req.query['hub.verify_token']


    if(mode && token){
        if(model ==='subscribe' && toke === tokenParam){
            res.status(200).send(challenge)
        }else{
            res.status(403)
        }
    }
})

app.post('/webhook', (req = request, res = response) =>{
    let body = req.body;
    console.log(JSON.stringify(body, null, 2))
    if (body.object) {
        if (
          body.entry &&
          body.entry[0].changes &&
          body.entry[0].changes[0] &&
          body.entry[0].changes[0].value.messages &&
          body.entry[0].changes[0].value.messages[0]
        ) {
            let phone_number_id =body.entry[0].changes[0].value.metadata.phone_number_id;
            let from = body.entry[0].changes[0].value.messages[0].from; 
            let msg_body = body.entry[0].changes[0].value.messages[0].text.body;

            axios({
                method: 'post',
                url: `https://graph.facebook.com/v14.0/${phone_number_id}/messages?access_token=${tokenApi}` ,
                data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text:{
                        body: "Buenas tardes"
                    }
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })

            res.sendStatus(200)

        }
    }
})