
import { getColorOptions } from '@/assets/scripts/utils/colors'

const colorOptions = getColorOptions()

const colorPropTypes = {}

colorPropTypes.color = (component) => {
  const description = `Must be one of the <strong>$color-ui</strong> options: <em>${colorOptions.join(', ')}</em>`

  return {
    type: String,
    validator: function (value) {
      const isValidColor = colorOptions.includes(value)

      if (!isValidColor) {
        console.error(`${component}: color '${value}' not recognized. ${description}`)
      }
      return isValidColor
    },
    description
  }
}

export { colorPropTypes }
