
import { STATUSES } from '@/assets/scripts/constants/statuses'

// Helper for toggling classes based on the status of the component.
export const getStatusClasses = ({ baseClass, status }) => ({
  [`${baseClass}--success`]: status === STATUSES.SUCCESS,
  [`${baseClass}--loading`]: status === STATUSES.LOADING,
  [`${baseClass}--error`]: status === STATUSES.ERROR
})
