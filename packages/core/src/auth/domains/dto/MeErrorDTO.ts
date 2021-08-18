import ErrorDTO, { IErrorParameters } from '@/common/domains/dto/ErrorDTO'

class MeErrorDTO extends ErrorDTO {
  constructor(parameter: IErrorParameters) {
    super(parameter)
  }

  convertErrorToViewMessage(): string {
    switch (this.statusCode) {
      default:
        return super.convertErrorToViewMessage()
    }
  }
}

export default MeErrorDTO
