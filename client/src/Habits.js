import { useState, useEffect } from "react";
import Logo from './Logo.js';
import NavigationBar from "./NavigationBar.js";
import useAuth from './useAuth.js'
import { Container} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import Dropdown from './Dropdown.js'


const spotifyApi = new SpotifyWebApi({
    clientId: 'afde9650fee346a08da84885b8e4d3de',
})

export default function Habits ({ code }) {
    const accessToken = useAuth(code)
    const [drop, setDrop] = useState('')
    const [results, setSearchResults] = useState([])

    useEffect(() =>{
        if (!accessToken) return 
        spotifyApi.setAccessToken(accessToken)
        console.log(accessToken)
    }, [accessToken])

    // useEffect(() =>{
    //     if(!accessToken) return;
    //     console.log(accessToken)

    //     spotifyApi.getMyTopArtists().then(
    //         res => {
    //             let topArtists = res.body.items;
    //             console.log(topArtists)
    //         }
    //     )
    // }, [drop, accessToken])

    useEffect( () => {
        spotifyApi.getMe()
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
    })
        

    return (
        <div style={{backgroundColor: 'black', color: 'white'}}>
            <Container
                className='d-flex flex-column py-2' 
                style={{height: '100vh', backgroundColor: 'black'}}
            >
            <Logo />
            <NavigationBar />
            <br/>
            <Dropdown/>
            {code}
            </Container>
        </div>
    )
}