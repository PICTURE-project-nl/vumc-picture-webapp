
/*
Replace a key with a value within a string.
Example: {example} will be replaced in the string 'This is an example of {example}' with the value of replaceWith
 */
export const replaceKeyInString = ({ key, replaceWith, string }) => {
  return string.replace(new RegExp(`{${key}}`, 'g'), replaceWith)
}
