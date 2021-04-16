import { ReactDataContext } from '.'

describe('ReactDataContext', () => {
  it('create context', () => {
    expect(new ReactDataContext('/')).toBeTruthy()
  })
})
