import React from 'react';
import NavigationBar from './navbar';
import Logo from './logo';
import { Container, Form } from 'react-bootstrap'

export default function Habits() {
        return (
            <div style={{backgroundColor: 'black'}}>
                <Container className="d-flex flex-column py-2" style={{height: "100vh", color: 'white'}}>
                    <Logo />
                    <NavigationBar />
                    <Form.Control 
                        type="search" 
                        placeholder="Search based on artist" 
                    /> <br/>
                    <Form.Control 
                        type="search" 
                        placeholder="Search based on genre" 
                    />
                    Habits webpage
                </Container>
            </div>
        )
}