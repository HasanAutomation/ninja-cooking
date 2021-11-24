import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Recipes.css';

export default function Recipes({ recipes }) {
  const { mode } = useTheme();

  return (
    <div className='recipes'>
      {recipes?.length === 0 && <p className='page-title'>No Recipes found</p>}
      {recipes?.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make..</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
}
