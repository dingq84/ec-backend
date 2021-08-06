// interfaces
import { IMePresenter } from '@/auth/adapters/presenters/interfaces/IMe'
import { ITokenPresenter } from '@/auth/adapters/presenters/interfaces/IToken'

export interface IPresenters {
  auth: {
    token: ITokenPresenter
    me: IMePresenter
  }
}
