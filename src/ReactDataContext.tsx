import { ClientDataContext, TextUtils } from '@themost/client'
import { ReactDataService } from './ReactDataService'
export class ReactDataContext extends ClientDataContext {
  constructor(remote: string) {
    super(
      new ReactDataService(remote, {
        useMediaTypeExtensions: false,
        useResponseConversion: true,
        useJsonReviver: function jsonReviver(_key: string, value: any) {
          if (TextUtils.isDate(value)) {
            return new Date(value)
          }
          return value
        }
      })
    )
  }
}
