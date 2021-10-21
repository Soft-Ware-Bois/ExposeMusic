const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login', (req, res) =>{
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "dd37f5158f4d4f5eb0c40f0d05c95121",
        clientSecret: "40d3b31ff0b742e3b433b0fb010f1f91"
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({ 
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch( (err) => {
        res.sendStatus(400)
    }
    )
})