import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = '2d872b1d';
  const APP_KEY = '8883615fcd3c3dbf261fb5a44f23952b';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
 
  return (
    <div className="App">
     <form onSubmit={getSearch} className="search-form">
       <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button className="search-button" stype="submit">Search</button>
     </form>
     <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={Math.round(recipe.recipe.calories) + ' Calories'}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients} />
      ))};
     </div>
    </div>
  )
}

export default App;
 