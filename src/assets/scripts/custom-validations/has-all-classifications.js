export const hasAllClassifications = (value) => {
  let tempArray = []
  let isValid = true
  value.map((item) => {
    if (tempArray.includes(item.value)) isValid = false
    tempArray.push(item.value)
  })
  return isValid
}
