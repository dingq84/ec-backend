// services
import getService from '.'

describe('test getService', () => {
  const OLD_ENV = process.env
  const baseUrl = 'test/api'

  beforeAll(() => {
    // Make a copy
    process.env = { ...OLD_ENV, API_URL: baseUrl }
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it(`the base url should be ${baseUrl}`, () => {
    // process.env.API_URL = baseUrl
    const service = getService()
    expect(service.defaults.baseURL).toBe(baseUrl)
  })

  it('the headers should not have Authorization default', () => {
    const service = getService()
    expect(service.defaults.headers).not.toEqual(
      expect.objectContaining({
        Authorization: expect.any(String)
      })
    )
  })

  it('the headers should have Authorization by passing withAuth: true', () => {
    const service = getService({ withAuth: true })
    expect(service.defaults.headers).toEqual(
      expect.objectContaining({
        Authorization: expect.any(String)
      })
    )
  })
})
