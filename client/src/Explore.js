import {useState, useEffect} from "react";
import Logo from './Logo.js';
import NavigationBar from './NavigationBar.js'
import useAuth from './useAuth.js'
import { Container, Form, Dropdown} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import ArtistSearchResult from "./ArtistSearchResult.js";
import Player from './Player.js';
import GenreSearchResult from "./GenreSearchResult.js";


const spotifyApi = new SpotifyWebApi({
    clientId: 'afde9650fee346a08da84885b8e4d3de',
})

export default function Explore({code}){
    const accessToken = useAuth(code)
    const [genre, setGenre] = useState('')
    const [genreResults, setGenreResults] = useState([])
    const [artistResults, setArtistResults] = useState([])
    const [playingGenre, setPlayingGenre] = useState()
    const [artist, setArtist] = useState('')
    const [playingArtist, setPlayingArtist] = useState()
    const [trackUri, setTrackUri] = useState()
    const [artistId, setArtistId] = useState('')
    console.log(artistResults, artist, artistId)

    function chooseGenre(genres) {
        setPlayingGenre(genres)
        setGenre(genres)
    }
    const handleGenre=(e)=>{
        setGenre(e)
    }

    const chooseArtist=(e)=>{
        setPlayingArtist(e)
        setArtist(e)
    }

    useEffect(() =>{
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    // Search genre handling
    useEffect(() =>{
        if(!accessToken) return;

        spotifyApi.getAvailableGenreSeeds().then(
            data => {
                let genreSeeds = data.body.genres;
                setGenreResults(genreSeeds);
            }, err => {
                console.log('Something went wrong!', err)
            }
        )
    },[accessToken])

    function getRecommendations(){
        if (!accessToken) return;

        if(!genre && !artist) return;

        if(artist === "" && genre){
            spotifyApi.getRecommendations({
                min_energy: 0.4,
                min_popularity: 50,
                seed_genres: genre
            }).then(
                res =>{
                    setTrackUri(res.body.tracks[0])
                }, err =>{
                    console.log(err);
                }
            )
        }

        if(artist && genre === ""){
            spotifyApi.getRecommendations({
                min_energy: 0.4,
                min_popularity:50,
                seed_artists: artistId
            }).then(
                res =>{
                    setTrackUri(res.body.tracks[0])
                }, err =>{
                    console.log(err);
                })
        }

        if(artist && genre){
            spotifyApi.getRecommendations({
                min_energy: 0.4,
                min_popularity: 50,
                seed_artists: artistId,
                seed_genres: genre,
            }).then(
                res=>{
                    setTrackUri(res.body.tracks[0])
                }, err =>{
                    console.log(err);
                }
            )
        }

    }

    useEffect(() =>{
        if(!accessToken) return;
        if(!artist) return setArtistResults([]);

        let cancel = false;
        spotifyApi.searchArtists(artist).then(
            res =>{
                if(cancel) return;
                //console.log(res.body.artists.items[14]);
                setArtistId(res.body.artists.items[0].id)
                setArtistResults(res.body.artists.items.map(artists => {
                    if(artists.images === []){
                        //console.log(artists.name);
                        return
                    }
                    //console.log(artists)
                    return {
                        artist: artists.name,
                        imageUrl: artists.images
                    }
                }))
            }, err =>{
                console.log(err);
            })
        return () => cancel = true
    }, [accessToken, artist])

    return(
        <div style={{backgroundColor: 'black', color: 'white'}}>
            <Container
                 className='d-flex flex-column py-2' 
                 style={{height: '95vh', backgroundColor: 'black'}}
            >
            <Logo />
            <NavigationBar />
            <hr/>
            <div>
                <input 
                    className="form-control"
                    type="search"
                    placeholder="Search based on artist"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                    style={{width: '35%', marginRight: '2rem', float: 'left'}}
                />

                <Dropdown onSelect={handleGenre} style={{float: 'left', width:'30%'}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Search based on genres
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                        style={{overflowY: 'auto', height:'500%', width:'40%'}}
                    >
                        {genreResults.map(
                            (item, idx) => 
                                <Dropdown.Item 
                                    eventKey={item}  
                                >
                                    {item}
                                </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                <a 
                    className="btn btn-success btn-lg"
                    onClick={getRecommendations}
                    style={{width: '32%', float: 'right', height: '40px', textAlign: 'center', alignItems: 'center'}}
                >
                    Get Recommendation
                </a>
            </div>

            <div 
                className="flex-grow-1 my-2"
                style={{overflowY:'auto', height: '75%', float:'left', backgroundColor:'white'}}
            >
                {artistResults.map(artists => {
                    return <ArtistSearchResult
                        artist={artists}
                        chooseArtist={chooseArtist}
                    />
                })}
            </div>
            </Container>
            <div>
                <Player accessToken={accessToken} trackUri={trackUri?.uri}/>
            </div>
        </div>
    )
}