# @themost/react

![MOST Web Framework Logo](https://github.com/themost-framework/common/raw/master/docs/img/themost_framework_v3_128.png)

> [@themost-framework](https://github.com/themost-framework/) client library for react based on [@themost/client](https://github.com/themost-framework/client)

[![NPM](https://img.shields.io/npm/v/@themost%2Fnode.svg)](https://www.npmjs.com/package/@themost/react) ![GitHub top language](https://img.shields.io/github/languages/top/themost-framework/react) [![License](https://img.shields.io/npm/l/@themost/react)](https://github.com/themost-framework/react/blob/master/LICENSE) ![GitHub last commit](https://img.shields.io/github/last-commit/themost-framework/react) ![GitHub Release Date](https://img.shields.io/github/release-date/themost-framework/react)

## Install

```bash
npm install --save @themost/react
```

## Usage

Create application data context

```tsx
import React from 'react'
import { ReactDataContext } from '@themost/react'
export const context = React.createContext(new ReactDataContext('http://api.example.com/api/'))
```

where `new ReactDataContext(string)` is being used for defining the remote api server

and use context in any component e.g.

```tsx
import React from 'react'
import { context } from './context'

interface CustomersState {
  items: any[]
}

export default class Customers extends React.Component<{}, CustomersState> {
  constructor(props: any) {
    super(props)
    this.state = { items: [] }
  }

  componentDidMount() {
    context
        .model('People')
        .asQueryable()
        .getItems()
        .then((items) => {
          this.setState({
            items
          })
        })
  }

  render() {
    return (
      <>
        ...
      </>
    )
  }
}
```

## License

BSD-3-Clause © [THEMOST LP](License)
