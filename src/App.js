import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';
import Navbar from './components/navbar/Navbar';
import './App.css';
import ThemeSelector from './components/themeSelector/ThemeSelector';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/create' element={<Create />} />
          <Route path='/recipes/:id' element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
