import React from 'react'
import { UserService } from '../services/UserService';
import { ReactDataContext } from '@themost/react';

interface CustomersState {
  items: any[]
}


export default class Customers extends React.Component<{}, CustomersState> {
  constructor(props: any) {
    super(props);
    this.state = { items: [] };
  }

  componentDidMount () {
    const user = new UserService().getCurrentUser();
    if (user != null) {
      const context = new ReactDataContext('/api/')
      context.setBearerAuthorization(user.access_token as string);
      context.model('People').asQueryable().getItems().then((items) => {
        this.setState({
          items
        });
      })
    }

  }

   render() {
    return <>
            <h2>Customers</h2>
            <ul className="list-group list-group-flush">
              {this.state.items.map((item: any) => {
                return <li className="list-group-item">{item.givenName} {item.familyName}</li>
              })}
            </ul>
        </>;
  }
}

