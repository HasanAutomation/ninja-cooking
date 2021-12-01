import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { projectFirestore } from '../../firebase/config';
import './Recipe.css';

export default function Recipe() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { mode } = useTheme();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    projectFirestore
      .collection('recipes')
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          setData({ ...doc.data() });
          setLoading(false);
        } else {
          setLoading(false);
          setError('Not found');
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
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
