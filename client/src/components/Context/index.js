import React, { Component } from 'react';
import config from '../../config'

const UserContext = React.createContext();

export class Provider extends Component {
  state = {};

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
      throw new Error();
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
      return user.json.then(data => data);
    } else if(user.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  signOut() {}

  render() {
    return (
      <UserContext.Provider value={{
        authenticatedUser: "",
        actions: {
          signIn: this.signIn,
        },
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <UserContext.Consumer>
        {context => <Component {...props} context={context} /> }
      </UserContext.Consumer>
    );
  }
}
