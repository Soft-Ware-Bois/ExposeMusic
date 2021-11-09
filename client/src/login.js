import React from 'react';
import { Container } from 'react-bootstrap';

// Store the spotify login page url so the user can login to Spotify 
// Client id is public so its ok to hardcode it into the url
const AUTH_URL = `https://accounts.spotify.com/authorize?
client_id=dd37f5158f4d4f5eb0c40f0d05c95121&
response_type=code&redirect_uri=http://localhost:3000/home
&scope=streaming%20user-read-email%20user-read-private%20
user-library-read%20user-library-modify%20
user-read-playback-state%20user-modify-playback-state`

export default function Login() {
    return (
        // Create a simple container and align everything to the center
        // and a large success button from bootstrap that redirects the user to the url
    <div style={{backgroundColor: 'black'}}>
        <Container 
            className="d-flex justify-content-center align-items-center" 
            style={{ minHeight: "100vh"}}
        >
            <a 
                className="btn btn-success btn-lg" 
                href={AUTH_URL}
            >
                Login With Spotify
            </a>
        </Container>
    </div>
    );
}

 
