
export const findObjectsInArrayWithKeyValue = function (string, key, array) {
  let found = array.filter(obj => {
    return obj[key] === string
  })
  return found
}
