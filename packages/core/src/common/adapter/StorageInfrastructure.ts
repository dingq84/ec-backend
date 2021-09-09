/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStorageInfrastructure } from '@/common/adapter/interface/iStorageInfrastructure'

class Storage implements IStorageInfrastructure {
  private storage: any

  constructor(storage: any) {
    this.storage = storage
  }

  get(name: string): Promise<string | null> {
    return new Promise(resolve => {
      resolve(this.storage.getItem(name))
    })
  }

  set(name: string, value: string): void {
    this.storage.setItem(name, value)
  }

  remove(name: string): void {
    this.storage.removeItem(name)
  }
}

export default Storage
