import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import config from './config';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';

import { Provider } from './components/Context';
import PrivateRoute from './PrivateRoute';

import withContext from './components/Context';
const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

class App extends Component {
  state = {
    baseURL: config.baseURL,
  }

  render() {
    return (
      <Provider>
        <BrowserRouter>
        <div id="root">
          <div>
            <HeaderWithContext />
            <hr />
            <Switch>
              {/*Homepage/Course List Route*/}
              <Route
                exact path="/"
                render={ () => <Courses baseURL={this.state.baseURL} /> }
              />
              {/*Create Course Route*/}
              <PrivateRoute
                path="/courses/create"
                component={CreateCourseWithContext}
                baseURL={this.state.baseURL}
              />
              {/*Course Update Route*/}
              <PrivateRoute
                path="/courses/:id/update"
                component={UpdateCourseWithContext}
              />
              {/*Course Details Route*/}
              <Route
                path="/courses/:id"
                render={ props =>
                  <CourseDetail
                    {...props}
                    baseURL={this.state.baseURL}
                  />
                }
              />
              {/*User Sign-In Route*/}
              <Route path="/signin" component={UserSignInWithContext} />
              {/*User Sign-Up Route*/}
              <Route path="/signup" component={UserSignUpWithContext} />
              {/*User Sign-Out Route*/}
              <Route path="/signout" component={UserSignOut} />
              {/*Unhandled Error Route*/}
              <Route path="/error" component={UnhandledError} />
              {/*Forbidden/Unauthorized Route*/}
              <Route path="/forbidden" component={Forbidden} />
              {/*404/Not Found Route*/}
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
