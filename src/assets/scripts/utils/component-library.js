
import _reduce from 'lodash/reduce'

/*
Utilities for component library pages.
 */

// Transforms a component prop object into an array of strings.
export const getLibraryComponentPropAsArray = (prop) => {
  if (typeof prop === 'function') return [`type: ${prop.name}`]

  return _reduce(prop, (result, value, key) => {
    if (key === 'type') {
      result.push(`type: ${prop[key].name}`)
    } else if (key === 'required') {
      result.push(key)
    } else if (key === 'default') {
      result.push(`${key}: ${value}`)
    } else if (key === 'description') {
      result.push(value)
    }

    return result
  }, [])
}

// Transforms a component slotConfig object into an array of strings.
export const getLibraryComponentSlotConfigAsArray = (slot) => _reduce(slot, (result, value, key) => {
  if (key === 'expects') {
    result.push(`${key}: ${value}`)
  } else if (key === 'description') {
    result.push(value)
  }

  return result
}, [])
