import { ReactDataContext } from '.'
import axios from 'axios'

async function getToken(): Promise<{
  // eslint-disable-next-line camelcase
  access_token: string
  // eslint-disable-next-line camelcase
  refresh_token?: string
}> {
  const data = new URLSearchParams({
    client_id: '9165351833584149',
    client_secret: 'hTgqFBUhCfHs/quf/wnoB+UpDSfUusKA',
    username: 'alexis.rees@example.com',
    password: 'secret',
    grant_type: 'password',
    scope: 'profile'
  })

  const response = await axios.post('http://localhost:4000/auth/token', data, {
    headers: {
      Accept: 'application/json',
      Origin: 'http://localhost:4000/',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return response.data
}

describe('ReactDataContext', () => {
  beforeAll(async () => {
    //
  })
  it('create context', () => {
    expect(new ReactDataContext('http://localhost:4000/api/')).toBeTruthy()
  })
  it('should get metadata', async () => {
    const token = await getToken()
    const context = new ReactDataContext('http://localhost:4000/api/')
    context.setBearerAuthorization(token.access_token)
    const schema = await context.getMetadata()
    expect(schema).toBeTruthy()
    expect(schema.EntityContainer).toBeTruthy()
    expect(schema.EntityContainer.EntitySet).toBeTruthy()
    expect(
      schema.EntityContainer.EntitySet.find(
        (entitySet) => entitySet.Name === 'Users'
      )
    ).toBeTruthy()
  })
  it('should query user', async () => {
    const token = await getToken()
    const context = new ReactDataContext('http://localhost:4000/api/')
    context.setBearerAuthorization(token.access_token)
    const item = await context
      .model('Users')
      .where('name')
      .equal('alexis.rees@example.com')
      .getItem()
    expect(item).toBeTruthy()
    expect(item.name).toBe('alexis.rees@example.com')
  })

  it('should query persons', async () => {
    const token = await getToken()
    const context = new ReactDataContext('http://localhost:4000/api/')
    context.setBearerAuthorization(token.access_token)
    const result = await context.model('People').take(10).getList()
    expect(result).toBeTruthy()
    expect(result.value).toBeTruthy()
    expect(result.skip).toBe(0)
    expect(result.total).toBeGreaterThan(0)
  })

  it('should parse dates', async () => {
    const token = await getToken()
    const context = new ReactDataContext('http://localhost:4000/api/')
    context.setBearerAuthorization(token.access_token)
    const item = await context
      .model('Users')
      .where('name')
      .equal('alexis.rees@example.com')
      .getItem()
    expect(item).toBeTruthy()
    expect(item.name).toBe('alexis.rees@example.com')
    expect(item.dateCreated).toBeInstanceOf(Date)
  })

  it('should use expand', async () => {
    const token = await getToken()
    const context = new ReactDataContext('http://localhost:4000/api/')
    context.setBearerAuthorization(token.access_token)
    const item = await context
      .model('Users')
      .where('name')
      .equal('alexis.rees@example.com')
      .expand('groups')
      .getItem()
    expect(item).toBeTruthy()
    expect(item.groups).toBeInstanceOf(Array)
  })

  it('should use select', async () => {
    const token = await getToken()
    const context = new ReactDataContext('http://localhost:4000/api/')
    context.setBearerAuthorization(token.access_token)
    const item = await context
      .model('Users')
      .where('name')
      .equal('alexis.rees@example.com')
      .select('id', 'name')
      .getItem()
    expect(item).toBeTruthy()
    const keys = Object.keys(item)
    expect(keys.length).toBe(2)
    expect(keys[0]).toBe('id')
    expect(keys[1]).toBe('name')
  })

})
