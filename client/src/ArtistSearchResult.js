import React from "react";

export default function ArtistSearchResult( { artist, chooseArtist } ) {
    function handleArtist() {
        chooseArtist(artist)
    }
    console.log(artist.name, artist.images)
    return(
        <div 
            className="d-flex m-2 align-items-center"
            style={{cursor: 'pointer', backgroundColor: 'white', color: 'white'}}
            onClick={handleArtist}
        >
            <img 
                src={artist.images}
                style={{height: '64px', width: "64px"}}
            />
            <div 
                className="ml-3"   
            >
                <div className='text-muted' style={{color: 'black'}}>
                    {artist.name}
                </div>
            </div>
        </div>
    )
}