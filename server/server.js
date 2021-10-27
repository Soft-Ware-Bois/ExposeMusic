const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json);

app.post('/refresh', (req, res) =>{
    const refreshToken = req.body.refreshToken
    console.log("hi")
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "dd37f5158f4d4f5eb0c40f0d05c95121",
        clientSecret: "{Your Secret Key}", 
        refreshToken,
    })

    spotifyApi.refreshToken().then(
        (data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
        }).catch( (err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

// Post a login application
app.post('/login', (req, res) =>{
    // Get the code from the request
    const code = req.body.code;
    // Create a new spotify api
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "dd37f5158f4d4f5eb0c40f0d05c95121",
        clientSecret: "{Your Secret Key}"
    })
    // Authorize the code with the spotify api can get the access token,
    // refresh token, and expires in time.
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({ 
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    // Catch the error if the is one and send the error to the console
    .catch( err => {
        res.sendStatus(400)
    })
})

// listen to a port
app.listen(3001)