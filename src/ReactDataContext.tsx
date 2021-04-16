import { ClientDataContext } from '@themost/client'
import { ReactDataService } from './ReactDataService'
export class ReactDataContext extends ClientDataContext {
  constructor(remote: string) {
    super(
      new ReactDataService(remote, {
        useMediaTypeExtensions: false,
        useResponseConversion: true
      })
    )
  }
}
