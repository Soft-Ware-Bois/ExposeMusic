import React, {useState, useEffect} from 'react';
import useAuth from './useAuth.js'
import SpotifyWebApi from 'spotify-web-api-node';
import Dropdown from './Dropdown.js'

const spotifyApi = new SpotifyWebApi({
    clientId: 'afde9650fee346a08da84885b8e4d3de',
})

export default function Temp({code}) {
    const accessToken = useAuth(code)

    const [dpArray, setDpArray] = useState([])
    const [dpValue, setDpValue] = useState('')

    const handleSelect=(e)=>{
        console.log(e)
    }

    useEffect(() =>{
        if(!accessToken) return;

        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() =>{
        if(!accessToken) return;


        spotifyApi.getAvailableGenreSeeds().then(
            data => {

                let genreSeeds = data.body.genres;
                setDpArray(genreSeeds);
                console.log(genreSeeds);
            }, err => {
                console.log('Something went wrong!', err)
            }
        )
    },[accessToken])
    return(
        <div style={{backgroundColor: 'black'}}>
            <Dropdown data={dpArray} onSelect={handleSelect}/>
        </div>
    )
}