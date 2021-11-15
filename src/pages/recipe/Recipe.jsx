import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks';

export default function Recipe() {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;

  const { loading, error, data } = useFetch(url);
  return (
    <div className='recipe'>
      {loading && <p className='loading'>Loading...</p>}
      {error && <p className='error'>{error}</p>}
      {data && (
        <div className='card'>
          <h3>{data.title}</h3>
        </div>
      )}
    </div>
  );
}
