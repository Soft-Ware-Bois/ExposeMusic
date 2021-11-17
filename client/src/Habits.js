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
    const arr= [
        {value: 1, name: 'Most played song'},
        {value: 2, name: 'Most played artist'},
        {value: 3, name: 'Most played album'},
    ]
    const accessToken = useAuth(code)
    const [drop, setDrop] = useState('')
    const [results, setSearchResults] = useState([])

    useEffect(() =>{
        if (!accessToken) return 
        spotifyApi.setAccessToken(accessToken)
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
        if (!accessToken) return;
        spotifyApi.getMe().then(
            (data) => {
                console.log(data.body);
            }, (err) => {
                    console.log('Something went wrong!', err);
                });
        }, [accessToken])
        

    return (
        <div style={{backgroundColor: 'black', color: 'white'}}>
            <Container
                className='d-flex flex-column py-2' 
                style={{height: '100vh', backgroundColor: 'black'}}
            >
            <Logo />
            <NavigationBar />
            <br/>
            <Dropdown data={arr}/>
            {code}
            </Container>
        </div>
    )
}