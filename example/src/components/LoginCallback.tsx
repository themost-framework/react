import React from 'react';
import { UserService } from '../services/UserService';


export default class LoginCallback extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount () {
    const location = (this.props as any).location;
    const queryParams = new URLSearchParams(location.search);
    const access_token = queryParams.get('access_token');
    if (access_token != null) {
      // try current user
      new UserService().tryCurrentUser(access_token).then((user) => {
        this.setState({
          user
        });
      });
    }
  }

   render() {
    return <>
      </>;
  }
}
