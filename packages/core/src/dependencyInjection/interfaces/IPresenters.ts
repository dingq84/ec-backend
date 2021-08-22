// interfaces
import { IAccountPresenter } from '@/admin/adapters/presenters/interfaces/IAccount'
import { IMePresenter } from '@/auth/adapters/presenters/interfaces/IMe'
import { ITokenPresenter } from '@/auth/adapters/presenters/interfaces/IToken'

export interface IPresenters {
  auth: {
    token: ITokenPresenter
    me: IMePresenter
  }
  admin: {
    account: IAccountPresenter
  }
}
