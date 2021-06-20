function setFormData(data: [string, unknown][]): FormData {
  const formData = new FormData()

  data.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(insideValue => formData.append(key, insideValue))
    } else if (value instanceof Blob || typeof value === 'string') {
      formData.append(key, value)
    } else {
      console.error(`unknown value type ${typeof value}`)
    }
  })

  return formData
}

export default setFormData
