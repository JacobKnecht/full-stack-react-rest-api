import React, { Component } from 'react';

const UserContext = React.createContext();

export class Provider extends Component {
  state = {};

  signIn(emailAddress, password) {}

  signOut() {}

  render() {
    return (
      <UserContext.Provider value={{
        authenticatedUser: "",
        actions: {

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
        {context => {
          <Component {...props} context={context} />
        }}
      </UserContext.Consumer>
    );
  }
}
