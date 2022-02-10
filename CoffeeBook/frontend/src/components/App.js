import React from "react";
import { SearchCategory } from "./category/SearchCategory";
import Home from './home/Home';
import Login from './login/Login';
import Subscribe from './subscribe/Subscribe';
import { Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="containers d-flex">
        <div className="row align-items-start">
          <div className="col">
            <div>Category</div>
            <div>{SearchCategory}</div>
          </div>
          <div className="col">
          {this.state.user ? <Redirect to={{ pathname: '/' }} /> : <Redirect to={{ pathname: '/login' }} />}
            <div>Main</div>
          </div>
          <div className="col">
            <div>Contact</div>
          </div>
        </div>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/subscribe'>
          <Subscribe />
        </Route>
      </div>
    );
  }
}
export default App;
