import {
  ClientDataService,
  ClientDataContextOptions,
  EdmSchema,
  DataServiceExecuteOptions,
  ResponseError
} from '@themost/client'
/**
 * A client data service for MOST Web Framework
 */
export class ReactDataService extends ClientDataService {
  // eslint-disable-next-line no-useless-constructor
  constructor(base: string, options?: ClientDataContextOptions) {
    super(base, options)
  }

  async execute(options: DataServiceExecuteOptions): Promise<any> {
    // get absolute url
    const finalUrl = this.resolve(options.url)
    const request: any = {
      method: options.method,
      url: finalUrl,
      credentials: 'include',
      headers: options.headers
    }
    if (options.method === 'POST' || options.method === 'PUT') {
      // add body
      Object.assign(request, {
        body: options.data
      })
    } else {
      // for HEAD, GET, OPTIONS, DELETE set query params
      if (options.data != null) {
        const queryParams = new URLSearchParams()
        Object.keys(options.data)
          .filter((key) => {
            return Object.prototype.hasOwnProperty.call(options.data, key)
          })
          .forEach((key) => {
            queryParams.append(key, options.data[key])
          })
        // assign url with params
        Object.assign(request, {
          url: finalUrl + queryParams.toString()
        })
      }
    }
    const response = await fetch(request)
    if (response.ok) {
      return await response.json()
    }
    // otherwise throw error
    throw new ResponseError(
      'An error occurred while getting service metadata',
      response.status
    )
  }

  /**
   * Gets service metadata
   */
  async getMetadata(): Promise<EdmSchema> {
    const request: any = {
      url: this.resolve('$metadata'),
      credentials: 'include'
    }
    // get response
    const response = await fetch(request)
    if (response.ok) {
      // and text
      const text = await response.text()
      // load schema
      return EdmSchema.loadXML(text)
    }
    // otherwise throw error
    throw new ResponseError(
      'An error occurred while getting service metadata',
      response.status
    )
  }
}
