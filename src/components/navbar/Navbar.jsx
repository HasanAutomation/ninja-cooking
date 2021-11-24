import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import SearchBar from '../searchBar/SearchBar';
import './Navbar.css';

export default function Navbar() {
  const { color } = useTheme();
  console.log('UPDATING NAVBAR...');
  return (
    <div className='navbar' style={{ backgroundColor: color }}>
      <nav>
        <Link to='/' className='brand'>
          <h1>Cooking Ninjas</h1>
        </Link>
        <SearchBar />
        <Link to='/create'>Create</Link>
      </nav>
    </div>
  );
}
