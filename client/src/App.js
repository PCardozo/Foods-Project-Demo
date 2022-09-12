import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import CreateRecipePage from './components/createRecipePage/createRecipePage';
import Homepage from './components/homepage/homepage';
import RecipeDetail from './components/recipeDetail/recipeDetail';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/create" component={CreateRecipePage} />
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/recipe/:id" component={RecipeDetail}/>
    </Router>
  );
}

export default App;
