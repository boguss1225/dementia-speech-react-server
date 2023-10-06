'use strict';

//import utils
const speechLib = require("./utils/transcribeSpeech");
const bodyParser = require('body-parser');
const uploadBolb = require("./utils/UploadBlob");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// define express server vars
const express = require('express');
const app = express();
const port = 5000;

// debug : Access to XMLHttpRequest
var cors = require('cors')
app.use(cors())

// debug : Undefine body.element
app.use(bodyParser.json());

// speech2text api
app.get("/transcript", async (req, res) => {
    console.log("wating for response");
    // let transcript = await speechLib.transcribeSpeech();
    // let transciptJson = [{"transcript": transcript}]
    // res.json(transciptJson);
})

// fectchScore api
app.get("/fectchScore", async (req, res) => {
    let score = [{"score": 67}]
    res.json(score);
})

// post from browser to server
app.post('/postData', async (req, res) => {
    let data = req.body.message;
    console.log("post message in server: ",data);
});

// Upload audio from browser to server
app.post('/uploadAudio', upload.single('audio'), async (req, res) => {
    let audioData = req.body;
    console.log("post audio to bucket: ",audioData);
    const destFileName = 'audio-files/client-recording.wav';
    uploadBolb.uploadFromMemory(audioData, destFileName);
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}, at http://localhost:${port}/`);
});
