import {
  ClientDataService,
  ClientDataContextOptions,
  EdmSchema,
  DataServiceExecuteOptions,
  ResponseError
} from '@themost/client'
import axios from 'axios'
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
    const config: any = {
      method: options.method,
      url: this.resolve(options.url),
      headers: this.getHeaders() // set service headers
    }
    // assign options headers if any
    if (options.headers) {
      Object.assign(config.headers, options.headers)
    }

    if (options.method === 'POST' || options.method === 'PUT') {
      // add body
      Object.assign(config, {
        data: options.data
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
        Object.assign(config, {
          url: config.url + '?' + queryParams.toString()
        })
      }
    }
    const reviver = this.getOptions().useJsonReviver
    if (typeof reviver === 'function') {
      Object.assign(config, {
        responseType: 'arraybuffer'
      })
    }
    const response = await axios(config)
    if (response.status === 204) {
      return null
    } else if (response.status === 200) {
      if (typeof reviver === 'function') {
        const buffer = Buffer.from(response.data, 'binary')
        return JSON.parse(buffer.toString(), reviver)
      }
      return response.data
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
    const config: any = {
      method: 'GET',
      url: this.resolve('$metadata'),
      headers: this.getHeaders()
    }
    // get response
    const response = await axios(config)
    if (response.status === 200) {
      // load schema
      return EdmSchema.loadXML(response.data)
    }
    // otherwise throw error
    throw new ResponseError(
      'An error occurred while getting service metadata',
      response.status
    )
  }
}
