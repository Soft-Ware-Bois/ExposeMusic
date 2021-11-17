import { useState, useEffect } from 'react';
import useAuth from './useAuth.js';
import { Container, Form} from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult.js';
import Player from './Player.js';
import Logo from './Logo.js';
import NavigationBar from './NavigationBar.js';

const spotifyApi = new SpotifyWebApi({
    clientId: 'afde9650fee346a08da84885b8e4d3de',
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [username, setUsername] = useState('')

    function chooseTrack(track){
        setPlayingTrack(track)
        setSearch('')
    }

    useEffect(() =>{
        if (!accessToken) return 
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() =>{
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return
            console.log(res)
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if(image.height < smallest.height) return image

                        return smallest
                    }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })
        return () => cancel = true
    }, [search, accessToken])

    useEffect(() =>{
        if(!accessToken) return;

        spotifyApi.getMe().then(data => {
            setUsername(data.body.display_name);
        }, err => {
            console.log('Something went wrong!', err);
        });
    }, [accessToken])

    return (
        <div
            style={{backgroundColor: 'black'}}
        >
            <Container 
                className='d-flex flex-column py-2' 
                style={{height: '100vh', backgroundColor: (33, 35, 36), color: 'white'}}
            >
                <Logo />
                Welcome {username}!
                <br/>
                <NavigationBar />
                <Form.Control 
                    type='search'
                    placeholder='Search Songs/Artists'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <div 
                    className='flex-grow-1 my-2' 
                    style={{overflowY:'auto', backgroundColor:'grey', hover:''}}
                >
                    {searchResults.map(track =>(
                        <TrackSearchResult
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                        />
                    ))}
                </div>

                <div>
                    <Player 
                        accessToken={accessToken}
                        trackUri={playingTrack?.uri}
                    />
                </div>
            </Container>
        </div>
    )
}