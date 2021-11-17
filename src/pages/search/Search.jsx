import React from 'react';
import { useLocation } from 'react-router-dom';
import Recipes from '../../components/recipes/Recipes';
import { useFetch } from '../../hooks';

export default function Search() {
  const queryString = useLocation().search;

  const query = queryString.split('?')[1];

  const url = `http://localhost:3000/recipes?${query}`;

  const { loading, error, data } = useFetch(url);

  return (
    <div>
      <h2 className='page-title'>Recipes including {query.split('=')[1]}</h2>
      {loading && <p>Loading....</p>}
      {error && <p className='error'>{error}</p>}
      <Recipes recipes={data} />
    </div>
  );
}
