import React from 'react';
import Recipes from '../../components/recipes/Recipes';
import { useFetch } from '../../hooks';
import './Home.css';

export default function Home() {
  const { loading, error, data } = useFetch('http://localhost:3000/recipes');
  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {loading && <p className='loading'>Loading...</p>}
      <Recipes recipes={data} />
    </div>
  );
}
