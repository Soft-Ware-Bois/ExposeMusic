import React from 'react';
import Dashboard from './dashboard';
import Explore from './explore';
import Habits from './habits';
import Share from './share';




class NavigationBar extends React.Component {
    render() { 
        return (
            <nav class="navbar navbar-light-bg-light">
                <a class="navbar-brand" href="/">
                    Home
                </a>
                <a class="navbar-brand" href="/explore">
                    Explore
                </a>
                <a class="navbar-brand" href="http://localhost:3000/habits">
                    Listening Habits
                </a>
                <a class="navbar-brand" href="http://localhost:3000/share">
                    Share
                </a>
            </nav>
        );
    }
}
 
export default NavigationBar;