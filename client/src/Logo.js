
import React from 'react';
import logo from './logo.png'

class Logo extends React.Component {
    render() { 
        return (
            <div
                style={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'Center',
                }}
            >
                <img
                    src={logo}
                    alt='Logo'
                />
            </div>
        );
    }
}
 
export default Logo;