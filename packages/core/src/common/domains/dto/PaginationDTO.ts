export interface IPaginationParameters {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  from: number
  to: number
}

export interface IPaginationDTO {
  readonly total: number
  readonly perPage: number
  readonly currentPage: number
  readonly lastPage: number
  readonly from: number
  readonly to: number
}

class PaginationDTO implements IPaginationDTO {
  readonly total: number
  readonly perPage: number
  readonly currentPage: number
  readonly lastPage: number
  readonly from: number
  readonly to: number

  constructor(parameters: IPaginationParameters) {
    this.total = parameters.total
    this.perPage = parameters.perPage
    this.currentPage = parameters.currentPage
    this.lastPage = parameters.lastPage
    this.from = parameters.from
    this.to = parameters.to
  }
}

export default PaginationDTO
