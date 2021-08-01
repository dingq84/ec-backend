/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @author Ding.Chen 2021-07-29
 * 建立一個 Storage 去集中管控對 localStorage 或 sessionStorage 的操作
 */

import { IStorage } from './interfaces/IStorage'

class Storage implements IStorage {
  private storage: any

  constructor(storage: any) {
    this.storage = storage
  }

  get(name: string): Promise<string> {
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
