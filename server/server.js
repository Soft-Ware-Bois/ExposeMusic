const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json);

app.post('/explore', (req, res) => {
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/home',
        clientId: 'dd37f5158f4d4f5eb0c40f0d05c95121',
        clientSecret: '40d3b31ff0b742e3b433b0fb010f1f91',
    })

    spotifyApi.getRecommendations({ 
        min_energy: 0.4,
        seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'],
        min_popularity: 50
    }).then(function(data){
        let recommendations = data.body
        console.log(recommendations)
    }), function(err) {
        console.log("something went wrong!", err)
    }
})

app.post('/refresh', (req, res) =>{
    const refreshToken = req.body.refreshToken
    console.log("hi")
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/home',
        clientId: "dd37f5158f4d4f5eb0c40f0d05c95121",
        clientSecret: "40d3b31ff0b742e3b433b0fb010f1f91", 
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
app.post('/', (req, res) =>{
    // Get the code from the request
    const code = req.body.code;
    // Create a new spotify api
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/home',
        clientId: "dd37f5158f4d4f5eb0c40f0d05c95121",
        clientSecret: "40d3b31ff0b742e3b433b0fb010f1f91"
    })
    // Authorize the code with the spotify api and get the access token,
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
        console.log(err)
        res.sendStatus(400)
    })
})

// listen to a port
app.listen(3001)