import React from 'react';
import WeatherCard from './WeatherCard';
import Header from './Header';
import About from './About';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';

const App = () => {
    return( 
        <div>
            <video className="videoContainer" autoPlay loop muted >
                <source src="/video.mp4" type="video/mp4"></source>
            </video>
            <div className="mainContent" >
                <Header className="header" />
                <BrowserRouter>
                    <Link className="ui button" to='/'>Home</Link>
                    <Link className="ui button" to='/About'>About</Link>
                    <Route path='/' exact component={WeatherCard}/>
                    <Route path='/About' className="ui vertical segment"  component={About}/>
                </BrowserRouter>
            </div>
            <footer >Developed by Abhinav</footer>
        </div>
    )
}

export default App