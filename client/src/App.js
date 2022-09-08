import './App.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import LandingPage from './components/landingPage';
import CreateRecipePage from './components/createRecipePage';
import Homepage from './components/homepage';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/create" component={CreateRecipePage} />
      <Route exact path="/home" component={Homepage} />
    </Router>
  );
}

export default App;
