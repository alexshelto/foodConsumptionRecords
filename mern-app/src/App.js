import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/navbar';
import CreateUser from './components/createUser';
import CreateMeal from './components/createMeal';
import EditMeal from './components/editMeal';
import MealList from './components/MealList';


function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br/>
          <Route path="/" exact component={MealList} />
          <Route path="/edit/:id" exact component={EditMeal} />
          <Route path="/create" exact component={CreateMeal} />
          <Route path="/user" exact component={CreateUser} />
        </div>
    </Router>
  );
}

export default App;
