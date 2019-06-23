import React, { Component } from 'react';
import { Switch, Route} from "react-router-dom";
import Home from './home';
import Schedule from './schedule'
import ToDo from './todo';
import Vote from './vote';
class Main extends Component {

    render() 
    {
      return (
        <div className = "main_section">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/todo" component={ToDo} />
            <Route exact path="/vote" component={Vote} />
          </Switch>
        </div>

      )
    }

}

export default Main;