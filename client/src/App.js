import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    baseURL: "http://localhost:5000/api",
  }

  render() {
    return this.state.isLoading ? (<h2>Loading Courses...</h2>) : (
      <BrowserRouter>
      <div id="root">
        <div>
          <Header />
          <hr />
          <Switch>
            {/*Homepage Route - Renders <Courses> Component/Courses List*/}
            <Route
              exact path="/"
              render={ () =>
                <Courses
                  baseURL={this.state.baseURL}
                  toggleLoad={this.toggleLoad}
                />
              }
            />
            {/*404/Not Found Route*/}
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
