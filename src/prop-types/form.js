
const formPropTypes = {}

formPropTypes.inputId = {
  type: String,
  required: true
}

formPropTypes.inputValue = {
  type: String
}

formPropTypes.inputName = {
  type: String,
  required: true
}

formPropTypes.inputLabel = {
  type: String
}

formPropTypes.inputPlaceholder = {
  type: String
}

formPropTypes.inputMessage = {
  type: String
}

formPropTypes.inputIsTextarea = {
  type: Boolean
}

formPropTypes.inputIsPassword = {
  type: Boolean
}

formPropTypes.inputHasFocus = {
  type: Boolean
}

formPropTypes.inputIsChecked = {
  type: Boolean
}

formPropTypes.inputHasError = {
  type: Boolean
}

formPropTypes.inputHasSuccess = {
  type: Boolean
}

formPropTypes.isDisabled = {
  type: Boolean,
  default: false
}
export { formPropTypes }
