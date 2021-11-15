import React, { useState } from 'react';
import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    console.log(title, cookingTime, method);
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
          Add
        </button>
      </form>
    </div>
  );
}
