import React, { useEffect, useState } from 'react';
import Recipes from '../../components/recipes/Recipes';
import { projectFirestore } from '../../firebase/config';
import './Home.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    projectFirestore
      .collection('recipes')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setError('No Data found');
        } else {
          let recipes = [];
          snapshot.docs.forEach(doc => {
            recipes.push({ id: doc.id, ...doc.data() });
          });
          setData(recipes);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {loading && <p className='loading'>Loading...</p>}
      <Recipes recipes={data} />
    </div>
  );
}
