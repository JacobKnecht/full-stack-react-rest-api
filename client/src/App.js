import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';

import Header from './components/Header';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    baseURL: "http://localhost:5000/api",
    courses: [],
    isLoading: true,
  }

  componentDidMount() {
    fetch(`${this.state.baseURL}/courses`)
      .then(response => response.json())
      .then(courses => this.setState({
        courses : courses,
        isLoading : false
      }))
      .then(() => console.log(this.state.courses))
      .catch(err => console.log("There was an error loading the courses: " + err))
  }

  render() {
    return this.state.isLoading ? (<h2>Loading...</h2>) : (
      <BrowserRouter>
      <div id="root">
        <div>
          <Header />
          <hr />
          <Switch>
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
