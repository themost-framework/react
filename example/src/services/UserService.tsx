import React from 'react';
import { ReactDataContext } from '@themost/react';

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
  access_token?: string;
}

export class UserService {
  getCurrentUser() {
    const currentUserValue = localStorage.getItem('currentUser');
    let currentUser = null;
    if (currentUserValue) {
      currentUser = JSON.stringify(currentUserValue)
    }
    return currentUser;
  }

  async tryCurrentUser(access_token: string): Promise<User | null> {
    const context = new ReactDataContext('/api/');
    context.setBearerAuthorization(access_token);
    // get user
    const user = await context.model(`Users/Me`).asQueryable().expand('groups').getItem();
    if (user == null) {
      return null;
    }
    // assign the given access token
    Object.assign(user, {
      access_token: access_token
    });
    // set user
    localStorage.setItem('currentUser', JSON.stringify(user));
    // and return
    return user as User;
  }

  redirectToLogin() {
    window.location.href = "/auth/login?client_id=9165351833584149&scope=profile&redirect_uri=/login/callback";
    return (
      <></>
    )
  }

}
