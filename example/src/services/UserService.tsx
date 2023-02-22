import React from 'react'
import { ReactDataContext } from '@themost/react'

export declare interface Group {
   id: number;
  name: string;
  alternateName: string;
  dateCreated?: Date;
  dateModified?: Date;
}

export declare interface User {
  id: number;
  name: string;
  alternateName?: string;
  dateCreated?: Date;
  dateModified?: Date;
  groups: Group[];
  // eslint-disable-next-line camelcase
  access_token?: string;
}

export class UserService {
  getCurrentUser(): User {
    const currentUserValue = localStorage.getItem('currentUser')
    let currentUser = null
    if (currentUserValue) {
      currentUser = JSON.parse(currentUserValue)
    }
    return currentUser
  }

  // eslint-disable-next-line camelcase
  async tryCurrentUser(access_token: string): Promise<User | null> {
    const context = new ReactDataContext('/api/')
    context.setBearerAuthorization(access_token)
    // get user
    const user = await context.model('Users/Me').asQueryable().expand('groups').getItem()
    if (user == null) {
      return null
    }
    // assign the given access token
    Object.assign(user, {
      // eslint-disable-next-line camelcase
      access_token: access_token
    })
    // set user
    localStorage.setItem('currentUser', JSON.stringify(user))
    // and return
    return user as User
  }

  redirectToLogin() {
    window.location.href = '/auth/login?client_id=9165351833584149&scope=profile&redirect_uri=/login/callback'
    return (
      <></>
    )
  }
}
