import React from 'react';
import Home from './home/Home';
import Login from './login/Login';
import Subscribe from './subscribe/Subscribe';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                {this.state.user ? <Redirect to={{ pathname: '/' }} /> : <Redirect to={{ pathname: '/login' }} />}
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/subscribe'>
                    <Subscribe />
                </Route>
            </>
        );
    }
}

export default App;
