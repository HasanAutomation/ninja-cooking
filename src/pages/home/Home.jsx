import React, { useEffect, useState } from 'react';
import Recipes from '../../components/recipes/Recipes';
import { useTheme } from '../../contexts/ThemeContext';
import { projectFirestore } from '../../firebase/config';
import './Home.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const deleteRecipe = id => {
  //   setData(prev => prev.filter(recipe => recipe.id !== id));
  // };

  const { mode } = useTheme();

  // useEffect(() => {
  //   setLoading(true);
  //   projectFirestore
  //     .collection('recipes')
  //     .get()
  //     .then(snapshot => {
  //       if (snapshot.empty) {
  //         setError('No Data found');
  //       } else {
  //         let recipes = [];
  //         snapshot.docs.forEach(doc => {
  //           recipes.push({ id: doc.id, ...doc.data() });
  //         });
  //         setData(recipes);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    setLoading(true);
    const unsub = projectFirestore.collection('recipes').onSnapshot(
      snapshot => {
        if (snapshot.empty) {
          setError('No Data found');
          setLoading(false);
        } else {
          let recipes = [];
          snapshot.docs.forEach(doc => {
            recipes.push({ id: doc.id, ...doc.data() });
          });
          setData(recipes);
          setLoading(false);
        }
      },
      error => {
        setError(error.message);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className={`home ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {loading && <p className='loading'>Loading...</p>}
      {data?.length > 0 && <Recipes recipes={data} />}
    </div>
  );
}
