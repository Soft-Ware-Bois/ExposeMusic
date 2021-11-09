import { useState, useEffect } from 'react';
import useAuth from './useAuth.js';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import NavigationBar from './navbar.js';
import Logo from './logo.js';
import TrackSearchResult from './TrackSearchResult.js';
import Player from './Player.js';

const spotifyApi = new SpotifyWebApi({
    clientId: 'dd37f5158f4d4f5eb0c40f0d05c95121'
})

export default function Dashboard({ code }) {
    // get the accessToken using useAuth
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    console.log(searchResults)

    useEffect( () => { 
        // If there is no access token then return
        if(!accessToken) return
        // Use access token otherwise for future queries 
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() =>{ 
        // If we dont have a search then set search results to empty array
        if(!search) return setSearchResults([])
        // Return if we dont have an access token then
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                //console.log(res)
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    url: track.url,
                    albumUrl: track.albumUrl.images.url
                }
            })
        )
    })
        return () => cancel = true
    }, [search, accessToken])
    
    return (
        <div style={{backgroundColor: 'black'}}>
        <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
            <Logo />
            <NavigationBar />
            <Form.Control 
                type="search" 
                placeholder="Search Songs/Artists" 
                value={search}
                onChange={e => setSearch(e.target.value)}
            /> 
            <div className="flex-grow-1 my-2" style={{overflowY: "auto"}}>
                { searchResults.map(track => (
                    <TrackSearchResult track={track} key={track.uri} />
                ))}
            </div>
            <div>
                <Player/>
            </div>  
        </Container>
        </div>
    );
}