import { createContext, useContext, useReducer } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const CHANGE_COLOR = 'CHANGE_COLOR';
const CHANGE_MODE = 'CHANGE_MODE';
export const THEME = 'THEME';

function themeReducer(state, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return { ...state, color: action.payload };
    case CHANGE_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}

export function ThemeContextProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: '#58249C',
    mode: localStorage.getItem(THEME) ? localStorage.getItem(THEME) : 'light',
  });

  function changeColor(color) {
    dispatch({ type: CHANGE_COLOR, payload: color });
  }
  function changeMode(mode) {
    console.log('MODE==', mode);
    dispatch({ type: CHANGE_MODE, payload: mode });
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
