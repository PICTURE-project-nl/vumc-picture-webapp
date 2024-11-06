
import { STATUSES } from '@/assets/scripts/constants/statuses'

const statusPropTypes = {}

statusPropTypes.type = (component) => {
  const description = `Must be one of the <strong>status</strong> types: <em>${Object.values(STATUSES).join(', ')}</em>`

  return {
    type: String,
    validator: function (value) {
      const isValidStatus = Object.values(STATUSES).includes(value)

      if (!isValidStatus) {
        console.error(`${component}: status type '${value}' not recognized. ${description}`)
      }
      return isValidStatus
    },
    description
  }
}

export { statusPropTypes }
