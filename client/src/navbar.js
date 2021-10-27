import React from 'react';
import Dashboard from './dashboard';
import explore from './explore';
import habits from './habits';
import share from './share';
import { Link } from 'react-router-dom';




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
                <a class="navbar-brand" href="/habits">
                    Habits
                </a>
                <a class="navbar-brand" href="/share">
                    Share
                </a>
            </nav>
        );
    }
}
 
export default NavigationBar;