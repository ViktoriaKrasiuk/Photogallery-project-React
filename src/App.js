import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import LoginForm from './components/Authorization/LoginForm';
import RegistrationForm from './components/Authorization/RegistrationForm';
import PhotoGallery from './components/PhotoGallery/PhotoGallery';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.js'
import CategoriesNavBar from './components/Categories/CategoriesPage'
import SingleCategory from './components/SingleCategory/SingleCategory'
import SingleImagePost from './components/SingleImagePost/SingleImagePost'


function App() {
  return (
    <div className="App">
     <Router>
        <Switch>
          <Route path="/login" component={LoginForm}/>
          <Route path="/registration" component={RegistrationForm}/>
          <PrivateRoute exact path="/my_gallery" component={PhotoGallery}/>
          <PrivateRoute  path="/my_gallery/:id" component={SingleImagePost}/>
          <PrivateRoute exact path="/categories" component={CategoriesNavBar}/>
          <PrivateRoute exact path="/categories/:id" component={SingleCategory}/>
          <Redirect to="/login" />
        </Switch>
     </Router>
     
    </div>
  );
}

export default App;
