import {useState, useEffect} from "react";
import Logo from './Logo.js';
import NavigationBar from './NavigationBar.js'
import useAuth from './useAuth.js'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: 'afde9650fee346a08da84885b8e4d3de',
})

export default function Explore({code}){
    const accessToken = useAuth(code)
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState('')
    return(
        <div className="ml-3"style={{backgroundColor: 'black', color:'white'}}>
            <Container
                className='d-flex flex-column py-2' 
                style={{height: '100vh', backgroundColor: 'black'}}
            >
            <Logo />
            <NavigationBar />
            <Form.Control 
                type="search" 
                placeholder="Search based on artist" 
            /> <br/>
            <Form.Control 
                type="search" 
                placeholder="Search based on genre" 
            />
            <br/>
            Explore page
            </Container>
        </div>
    )
}