
import { ICONS, ICON_TYPES } from '@/config/icons'

const iconPropTypes = {}

iconPropTypes.type = (component) => {
  const description = `Must be one of the <strong>icon</strong> types: <em>${ICON_TYPES.join(', ')}</em>`

  return {
    type: String,
    required: true,
    validator: function (value) {
      const isValidIcon = ICONS.hasOwnProperty(value)

      if (!isValidIcon) {
        console.error(`${component}: icon type '${value}' not recognized. ${description}`)
      }
      return isValidIcon
    },
    description
  }
}

export { iconPropTypes }
