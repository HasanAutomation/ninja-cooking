import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks';
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;

  const { loading, error, data } = useFetch(url);
  return (
    <div className='recipe'>
      {loading && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {data && (
        <>
          <h2 className='page-title'>{data.title}</h2>
          <p>Takes {data.cookingTime} to cook</p>
          <ul>
            {data.ingredients.map(ing => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p>{data.method}</p>
        </>
      )}
    </div>
  );
}
