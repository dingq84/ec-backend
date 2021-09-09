import Joi from 'joi'

class Validator {
  static isNumber(value: unknown): boolean {
    return typeof value === 'number'
  }

  static isString(value: unknown): boolean {
    return typeof value === 'string'
  }

  static isStringEmpty(value: string): boolean {
    return value === ''
  }

  static isPasswordFormat(value: string): boolean {
    const schema = Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .regex(/\d/)
      .regex(/[a-z]/i)
      .min(6)
      .max(12)
    const result = schema.validate(value)
    return !result.error
  }

  static isEmail(value: string): boolean {
    const schema = Joi.string().email({ tlds: { allow: false } })
    const result = schema.validate(value)
    return !result.error
  }
}

export default Validator
