import React from 'react'
import { UserService, User } from '../services/UserService'
import { Redirect } from 'react-router'

declare interface LoginStateCallbackState {
  user: User | null
}

export default class LoginCallback extends React.Component<
  {},
  LoginStateCallbackState
> {
  constructor(props: any) {
    super(props)
    this.state = { user: null }
  }

  componentDidMount() {
    const location = (this.props as any).location
    const queryParams = new URLSearchParams(location.search)
    const accessToken = queryParams.get('access_token')
    if (accessToken != null) {
      // try current user
      new UserService().tryCurrentUser(accessToken).then((user) => {
        this.setState({
          user
        })
      })
    }
  }

  render() {
    const hasUser = this.state.user
    if (hasUser) {
      return <Redirect to='/customers' />
    }
    return <></>
  }
}
