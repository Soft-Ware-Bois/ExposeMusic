import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
    // Store the accessToken, refreshToken, and expiresIn
    // useState allows you to add state to your functional components
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    //
    useEffect( () => {
        // Post the code to localhost login page to the same port that the server is listening to
        axios.post('http://localhost:3001/login',{
            code,
        }).then(res => { // Then set the access token, refresh token, and expires in time with res.data
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(61)
            window.history.push({}, "home page", '/home')
        }).catch( () => {
            window.location = '/'
        })
    }, [code] ) // The input will be the code

    useEffect( () => {
        if(!refreshToken || !expiresIn) return 
        const interval = setInterval( () => {

            axios.post("http://localhost:3001/refresh",{
                refreshToken,
            }).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(61)
            // If there is an error redirect the user to root location or login page
            }).catch( () => {
                window.location = "/";
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    // return the access token
    return accessToken;
}