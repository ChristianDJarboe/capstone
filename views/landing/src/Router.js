import React from 'react'
import { Switch, Route } from 'react-router'
import Landing from './containers/Landing'

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
        </Switch>
    );
};

export default Router;