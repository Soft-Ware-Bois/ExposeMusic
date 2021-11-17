import {useState, useEffect} from "react";
import Logo from './Logo.js';
import NavigationBar from './NavigationBar.js'
import useAuth from './useAuth.js'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import ArtistSearchResult from "./ArtistSearchResult.js";
import Player from './Player.js';
import GenreSearchResult from "./GenreSearchResult.js";
import Dropdown from './Dropdown.js';

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
    console.log(genre)

    function chooseGenre(genres) {
        setPlayingGenre(genres)
        setGenre(genres)
    }
    const handleGenre=(e)=>{
        setGenre(e)
    }

    function chooseArtist(artist) {
        setPlayingArtist(artist)
        setArtist(artist)
    }

    useEffect(() =>{
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    function getGenres(genreSearchResult){
        for(var i=0; i<genreSearchResult.length; i++){
            return genreSearchResult[i];
        }
    }

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
                seed_artists: artist
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
                seed_artists: artist,
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
                console.log(res.body.artists.items);
                setArtistResults(res.body.artists.items.map(artists => {

                        return {
                            artist: artists.name,
                            //imageUrl: artists.images[2].url
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
                 style={{height: '100vh', backgroundColor: 'black'}}
            >
            <Logo />
            <NavigationBar />
            <div>
                <input 
                    className="form-control"
                    type="search"
                    placeholder="Search based on artist"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                    style={{float:'left', width: '35%', marginRight: '.5rem',}}
                />
                <div>
                    <select style={{width: '35%', height: '38px', color: 'black'}} onselect={handleGenre}>
                        {genreResults.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
                    </select>

                    <a 
                        className="btn btn-success btn-lg"
                        onClick={getRecommendations}
                        style={{width: '24%', float: 'right'}}
                    >
                        Get Recommendation
                    </a>
                </div>
            </div>
            {/* <div 
                className="flew-grow-1 my-2"
                style={{overflowY: 'auto', width: '35%', float: 'left', height: '75%'}}
            >
                {genreResults.map(genre => {
                    return <GenreSearchResult
                        genre={genre}
                        chooseGenre={chooseGenre}
                    />
                })}

            </div> */}
            <div 
                className="flex-grow-1 my-2"
                style={{overflowY:'auto', height: '75%', float:'left', backgroundColor:'white'}}
            >
                {artistResults.map(artists => {
                    return <ArtistSearchResult
                        artist={artist}
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