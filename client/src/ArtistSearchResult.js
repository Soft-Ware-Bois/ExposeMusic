import React from "react";

export default function ArtistSearchResult( { artist, chooseArtist } ) {
    function handleArtist() {
        chooseArtist(artist.artist)
    }
    console.log(artist)

    // let img
    // artist.map(
    //     art=>{
    //         // return <div>{art.images[2].url}</div>
    //         //console.log(art.imageUrl[2].url)
    //         if(!art.imageUrl[2]){
    //             img=<img 
    //                         alt={art.artist}
    //                         style={{height:'64px', width:'64px', marginRight: '.5rem'}}
    //                     />
    //         }
    //         else img= <img 
    //                     src={art.imageUrl[2].url}
    //                     style={{height:'64px', width:'64px', marginRight: '.5rem'}}
    //               />
    //     }
    // )
    let img
    if(!artist.imageUrl[2]){
        img=<img
                alt={artist.artist}
                style={{height:'64px', width:'64px'}}
        />
    }
    else{
        img=<img
                alt={artist.artist}
                src={artist.imageUrl[2].url}
                style={{height:'64px', width:'64px'}}
        />
    }
    

    return(
        <div 
            className="d-flex m-2 align-items-center"
            style={{cursor: 'pointer', backgroundColor: 'white', color: 'black'}}
            onClick={handleArtist}
        >
        <div>
            {/* {artist.map(
                art=>{
                    // return <div>{art.images[2].url}</div>
                    //console.log(art.imageUrl[2].url)
                    if(!art.imageUrl[2]){
                        return <img 
                                    alt={art.artist}
                                    style={{height:'64px', width:'64px', marginRight: '.5rem'}}
                                />
                    }
                    else return <img 
                                src={art.imageUrl[2].url}
                                style={{height:'64px', width:'64px', marginRight: '.5rem'}}
                          />
                }
            )} */}
            {/* {img} */}
            
            
        </div>
            {/* <img 
                src={artist}
                style={{height: '64px', width: "64px", marginRight: '.5rem'}}

            /> */}
            {img}
            <div 
                className="ml-3"   
            >
                <div className='text-muted'>
                    {artist.artist}
                </div>
            </div>
        </div>
    )
}