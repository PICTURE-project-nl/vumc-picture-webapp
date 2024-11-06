
import _isArray from 'lodash/isArray'
import _isPlainObject from 'lodash/isPlainObject'

/**
 * Object.freeze() is shallow, this enables recursive (deep) freezing of properties which are objects themselves.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 *
 * @param object
 * @returns {*}
 */

export const deepFreeze = (object) => {
  if (!_isPlainObject(object)) return object

  Object.getOwnPropertyNames(object).forEach((name) => {
    const value = object[name]

    if (_isPlainObject(value)) {
      deepFreeze(value)
    } else if (_isArray(value)) {
      value.map(deepFreeze)
    }
  })

  return Object.freeze(object)
}
