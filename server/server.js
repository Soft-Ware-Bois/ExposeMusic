const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/',
        clientId: 'afde9650fee346a08da84885b8e4d3de',
        clientSecret: '73c316bffe8a4f30b65f74e84d25a80d',
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(
        data => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
        }).catch( (err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/login', (req, res) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
        redirectUri:'http://localhost:3000/',
        clientId:'afde9650fee346a08da84885b8e4d3de',
        clientSecret:'73c316bffe8a4f30b65f74e84d25a80d',
    })

    spotifyApi.authorizationCodeGrant(code).then( data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)