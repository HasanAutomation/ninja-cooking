import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { projectFirestore } from '../../firebase/config';
import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const ingredientRef = useRef(null);
  const [isPending, setIsPending] = useState(false);

  const { mode } = useTheme();

  const navigate = useNavigate();

  async function postIngredient() {
    setIsPending(true);
    const body = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
    };
    try {
      await projectFirestore.collection('recipes').add(body);
      setIsPending(false);
      navigate('/');
    } catch (err) {
      setIsPending(false);
      console.log(err);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    ingredientRef.current.focus();
    await postIngredient();
  }
  function addIngredient(ingredient) {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients(prev => [...prev, ingredient]);
      setIngredient('');
    }
    //
  }
  function deleteIngredient(ingredient) {
    setIngredients(prevs => prevs.filter(prev => prev !== ingredient));
  }

  return (
    <div className={`create ${mode}`}>
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
            placeholder='Press Enter'
            type='text'
            onChange={e => setIngredient(e.target.value)}
            onKeyPress={e => {
              if (e.code === 'Enter') {
                addIngredient(e.target.value);
              }
            }}
            value={ingredient}
            ref={ingredientRef}
          />
          <div
            style={{
              marginBottom: 20,
            }}
          >
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

          {/* <button
            className='btn'
            onKeyPress={e => console.log(`Code==`, e.code)}
            onClick={e => {
              console.log(e);
              addIngredient(ingredient);
            }}
          >
            Add
          </button> */}
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
