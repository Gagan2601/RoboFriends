import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js'
import './App.css';
import Scroll from '../components/Scroll.js'

const App = () => {

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)});
    }, [])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length ?
        <h1>Loading...</h1> :
        (
            <div className="tc">
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox SearchChange={onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        );
}
export default App;