import React from 'react';
import NavigationBar from './navbar';
import Logo from './logo';
import { Container } from 'react-bootstrap'

export default function Share () {
        return(
            <div style={{backgroundColor: 'black'}}>
                <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
                    <Logo />
                    <NavigationBar />
                    Share webpage
                </Container>
            </div>
        )

}
 
