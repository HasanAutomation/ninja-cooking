import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const ingredientRef = useRef(null);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  async function postIngredient() {
    try {
      const url = 'http://localhost:3000/recipes';
      setIsPending(true);
      const body = {
        title,
        ingredients,
        method,
        cookingTime,
        id: Math.floor(Math.round(Math.random(100))),
      };
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      setIsPending(false);
      if (data) navigate('/');
      else throw new Error('Could not save');
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    await postIngredient();
  }
  function addIngredient(ingredient) {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients(prev => [...prev, ingredient]);
      setIngredient('');
    }
    ingredientRef.current.focus();
  }
  function deleteIngredient(ingredient) {
    setIngredients(prevs => prevs.filter(prev => prev !== ingredient));
  }

  return (
    <div className='create'>
      <h2 className='page-title'>Add a new Recipe</h2>
      <form onSubmit={onSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type='text'
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Recipe Ingredients:</span>
          <input
            type='text'
            onChange={e => setIngredient(e.target.value)}
            value={ingredient}
            ref={ingredientRef}
          />
          <div>
            {ingredients.map(ing => (
              <span
                className='ingredient'
                key={ing}
                onClick={() => deleteIngredient(ing)}
              >
                {ing}{' '}
              </span>
            ))}
          </div>

          <button className='btn' onClick={() => addIngredient(ingredient)}>
            Add
          </button>
        </label>
        <label>
          <span>Recipe method:</span>
          <input
            type='text'
            value={method}
            required
            onChange={e => setMethod(e.target.value)}
          />
        </label>
        <label>
          <span>Recipe Cooking Time:</span>
          <input
            type='text'
            value={cookingTime}
            required
            onChange={e => setCookingTime(e.target.value)}
          />
        </label>
        <button className='btn' type='submit'>
          {isPending ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
