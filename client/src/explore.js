import React, { useState, useEffect }  from 'react';
import NavigationBar from './navbar';
import Logo from './logo';
import { Container } from 'react-bootstrap'
import DropDown from './dropdown'
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';



const spotifyApi = new SpotifyWebApi({
    clientId: 'dd37f5158f4d4f5eb0c40f0d05c95121'
})

export default function Explore(code) {
        // Get the code using the useAuth method 
        const accessToken = useAuth(code)
        // Create a useState for the search results
        const [searchResults, setSearchResults] = useState([])

        // check to see if the access token was successful
        useEffect( () => { 
            // If there is no access token then return
            if(!accessToken) return
            // Use access token otherwise for future queries 
            spotifyApi.setAccessToken(accessToken)
        }, [accessToken])

        
        return (
            <div style={{backgroundColor: 'black'}}>
                <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
                    <Logo />
                    <NavigationBar />
                    <DropDown />
                    <br/>
                    <button type="button" className="btn btn-success">Search</button>
                </Container>
            </div>
        )
}
 