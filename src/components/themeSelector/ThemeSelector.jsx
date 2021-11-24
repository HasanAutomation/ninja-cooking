import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './ThemeSelector.css';

const colors = ['#58249c', '#249c6b', '#b70233'];

function ThemeSelector() {
  const { changeColor } = useTheme();

  return (
    <div className='theme-selector'>
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
