import React from 'react'
import { Container } from 'react-bootstrap'

const AUTH_URL = `https://accounts.spotify.com/authorize?
client_id=afde9650fee346a08da84885b8e4d3de&
response_type=code&
redirect_uri=http://localhost:3000/&
scope=streaming%20
user-read-email%20
user-read-private%20
user-library-read%20
user-library-modify%20
user-read-playback-state%20
user-top-read%20
user-modify-playback-state`

export default function Login() {
    return(
        <div style={{backgroundColor: 'black'}}>
            <Container 
            className="d-flex justify-content-center align-items-center" 
            style={{minHeight: "100vh"}}
        >
            <a 
                className="btn btn-success btn-lg"
                href={AUTH_URL}
            >
                Login With Spotify
            </a>
        </Container>
        </div>
    )
}