import React, {useState, useEffect} from 'react';
import useAuth from './useAuth.js'
import SpotifyWebApi from 'spotify-web-api-node';

import {Dropdown, Container} from 'react-bootstrap';

const spotifyApi = new SpotifyWebApi({
    clientId: 'afde9650fee346a08da84885b8e4d3de',
})

export default function Temp({code}) {
    const accessToken = useAuth(code)

    const [dpArray, setDpArray] = useState([])
    const [dpValue, setDpValue] = useState('')

    const handleGenre=(e)=>{
        setDpValue(e)
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
                //console.log(genreSeeds);
            }, err => {
                console.log('Something went wrong!', err)
            }
        )
    },[accessToken])
    return(
        <div style={{backgroundColor: 'black', color: 'white'}}>
            {/* <Container
                className='d-flex flex-column py-2' 
                style={{height: '100vh', backgroundColor: (33, 35, 36), color: 'white'}}
            >
                <Dropdown onSelect={handleGenre}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Search based on genres
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                    style={{overflowY: 'auto', height:'500%', width:'50%'}}
                    >
                    {dpArray.map(
                        (item, idx) => 
                            <Dropdown.Item 
                                eventKey={item}  
                            >
                                {item}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Container> */}
            <Container className='d-flex py-2' style={{height: '100vh', backgroundColor: 'black'}}>
                <div style={{float:'left', marginRight: '.5rem'}}>
                    <input 
                        className="form-control"
                        type="search"
                        placeholder="Search based on artist"
                        style={{width: '30%', marginRight: '.5rem',}}
                    />
                </div>
                <div style={{float:'left', marginRight: '.5rem' }}>
                    <Dropdown onSelect={handleGenre}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Search based on genres
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            style={{overflowY: 'auto', height:'500%'}}
                        >
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{float: 'right'}}>
                <a 
                    className="btn btn-success btn-lg"
                >
                    Get Recommendation
                </a>
                </div>
            </Container>
        </div>
    )
}