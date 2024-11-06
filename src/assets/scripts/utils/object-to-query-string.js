
export const objectToQueryString = (object) => {
  const str = []
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]))
    }
  }
  return str.join('&')
}
