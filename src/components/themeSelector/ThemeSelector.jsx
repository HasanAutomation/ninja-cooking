import React from 'react';
import { THEME, useTheme } from '../../contexts/ThemeContext';
import modeIcon from '../../assets/mode.svg';
import './ThemeSelector.css';

const colors = ['#58249c', '#249c6b', '#b70233'];

function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  function handleMode() {
    localStorage.setItem(THEME, mode === 'light' ? 'dark' : 'light');
    changeMode(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <div className='theme-selector'>
      <div className='toggle-mode'>
        <img
          onClick={handleMode}
          src={modeIcon}
          alt='Dark mode'
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
        />
      </div>
      <div className='theme-buttons'>
        {colors.map(color => (
          <div
            className='swatch'
            onClick={() => changeColor(color)}
            key={color}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
