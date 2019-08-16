import React, { Component } from 'react';
import config from '../../config';
import Cookies from 'js-cookie';

const UserContext = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  signUp = async (user) => {
    const response = await fetch(`${config.baseURL}/users`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(user),
    });
    if(response.status === 201) {
      return [];
    } else if(response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error("There was an error in the sign-up process -- signUp Provider method");
    }
  }

  signIn = async (emailAddress, password) => {
    const credentials = btoa(`${emailAddress}:${password}`);
    const user = await fetch(`${config.baseURL}/users`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${credentials}`,
      },
    });
    if(user.status === 200) {
      return user.json().then(data => data);
    } else if(user.status === 401) {
      return null;
    } else {
      throw new Error("There was an error in the sign-in process -- signIn Provider method");
    }
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  setAuthenticatedUser = (authUser) => {
    Cookies.set('authenticatedUser', JSON.stringify(authUser), { expires: 1 });
    this.setState({ authenticatedUser: Cookies.getJSON('authenticatedUser') });
  }

  render() {
    return (
      <UserContext.Provider value={{
        authenticatedUser: this.state.authenticatedUser,
        actions: {
          signUp: this.signUp,
          signIn: this.signIn,
          signOut: this.signOut,
          setAuthenticatedUser: this.setAuthenticatedUser,
        },
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const Consumer = UserContext.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <UserContext.Consumer>
        {context => <Component {...props} context={context} /> }
      </UserContext.Consumer>
    );
  }
}
