
// Relative path so it can be used outside the Nuxt.js build system.
import { deepFreeze } from '../utils/deep-freeze'

export const REGULAR_EXPRESSIONS = deepFreeze({
  PIXEL_VALUE_AS_QUOTED_STRING: /"([0-9]+)px"/, // See: https://regex101.com/r/fxoIv0/1
  UPPERCASE_LETTERS: /(?=[A-Z])/ // See: https://stackoverflow.com/questions/7888238/javascript-split-string-on-uppercase-characters
})
