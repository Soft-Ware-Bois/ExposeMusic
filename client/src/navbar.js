import React from 'react';

class NavigationBar extends React.Component {
    render() { 
        return (
            <nav className="navbar navbar-light-bg-light">
                <a className="navbar-brand" href="/home" style={{color: "white"}}>
                    Home
                </a>
                <a className="navbar-brand" href="/explore" style={{color: "white"}}>
                    Explore
                </a>
                <a className="navbar-brand" href="/habits" style={{color: "white"}}>
                    Habits
                </a>
                <a className="navbar-brand" href="/share" style={{color: "white"}}>
                    Share
                </a>
            </nav>
        );
    }
}
 
export default NavigationBar;