import {
  ClientDataContextOptions
} from '@themost/client'
import { BasicDataService } from '@themost/client/common'
/**
 * A client data service for MOST Web Framework
 */
export class ReactDataService extends BasicDataService {
  // eslint-disable-next-line no-useless-constructor
  constructor(base: string, options?: ClientDataContextOptions) {
    super(base, options)
  }
}
