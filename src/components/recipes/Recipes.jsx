import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Trashcan from '../../assets/delete.svg';
import './Recipes.css';
import { projectFirestore } from '../../firebase/config';

export default function Recipes({ recipes, onDeleteRecipe }) {
  const { mode } = useTheme();

  const handleDelete = async id => {
    try {
      if (window.confirm('Are you sure?')) {
        await projectFirestore.collection('recipes').doc(id).delete();
        onDeleteRecipe(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='recipes'>
      {recipes?.length === 0 && <p className='page-title'>No Recipes found</p>}
      {recipes?.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make..</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img
            src={Trashcan}
            alt='Delete Icon'
            className='delete'
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
