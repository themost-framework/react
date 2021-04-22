import {
  ClientDataContext,
  TextUtils,
  ClientDataContextOptions
} from '@themost/client'
import { ReactDataService } from './ReactDataService'
export class ReactDataContext extends ClientDataContext {
  constructor(remote: string, options?: ClientDataContextOptions) {
    super(
      new ReactDataService(
        remote,
        Object.assign(
          {},
          {
            useMediaTypeExtensions: false,
            useResponseConversion: true,
            useJsonReviver: function jsonReviver(_key: string, value: any) {
              if (TextUtils.isDate(value)) {
                return new Date(value)
              }
              return value
            }
          },
          options
        )
      )
    )
  }
}
