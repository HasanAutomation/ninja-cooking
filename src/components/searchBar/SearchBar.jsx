import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/search?q=${term}`);
  };
  return (
    <div className='searchBar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>Search</label>
        <input
          type='text'
          value={term}
          onChange={e => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
