import React from 'react';
import logo from './logo.png';

class Logo extends React.Component {
    render() { 
        return(
        <div
            style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img 
                src={logo}
                alt="logo"
            />
        </div>
        )}
}
 
export default Logo;