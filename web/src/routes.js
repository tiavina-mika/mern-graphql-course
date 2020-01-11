import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Login from './components/pages/login';
// import Register from './components/pages/register';
import Home from './components/pages/home';

const Routes = () => {
    return <Router>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/login" component={Login}/>
                    {/* <Route path="/register" component={Register}/>
                    <Route path="/logout" component={Logout}/> */}
                </Switch>    
            </Router>
};

export default Routes;
