import React from 'react';
import { Link } from 'react-router-dom';
import './Recipes.css';

export default function Recipes({ recipes }) {
  return (
    <div className='recipes'>
      {recipes?.map(recipe => (
        <div key={recipe.id} className='card'>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make..</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
}