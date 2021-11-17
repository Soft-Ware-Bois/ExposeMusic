import React from 'react';

export default function GenreSearchResult ({genre, chooseGenre}) {
    function handleGenre(){
        chooseGenre(genre);
    }
    return (
        <div 
            className="d-flex m-2 align-items-center" 
            style={{color: 'white', backgroundColor: 'grey', cursor:'pointer'}}
            onClick={handleGenre}
        >
            {genre}
        </div>
    )
}