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

  static isChineseCharacters(value: string): boolean {
    const REGEX_CHINESE = /^[\u4e00-\u9fa5]+$/g
    return REGEX_CHINESE.test(value)
  }

  static checkIsEmpty<K extends string>(data: Record<K, string>): Array<Partial<K>> {
    const keys = Object.keys(data) as Array<K>
    return keys.filter(key => Validator.isStringEmpty(data[key]))
  }
}

export default Validator
