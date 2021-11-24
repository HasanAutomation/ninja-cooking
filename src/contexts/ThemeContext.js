import { createContext, useContext, useReducer } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const CHANGE_COLOR = 'CHANGE_COLOR';

function themeReducer(state, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return { ...state, color: action.payload };
    default:
      return state;
  }
}

export function ThemeContextProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: '#58249C',
  });

  function changeColor(color) {
    dispatch({ type: CHANGE_COLOR, payload: color });
  }

  return (
    <ThemeContext.Provider value={{ ...state, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
