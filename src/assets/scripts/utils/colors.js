
import _kebabCase from 'lodash/kebabCase'

import { colorUi } from '@/config/scss-config'

/*
Utilities for working with colors.
 */

// Transforms the colorUi object into an array of kebab cased strings.
export const getColorOptions = () => Object.keys(colorUi).map((key) => _kebabCase(key))
