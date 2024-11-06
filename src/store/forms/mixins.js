
import { getInputValidationMessage } from '@/assets/scripts/utils/form-validation'
import { staticContent } from '@/data/static-content'
import { FORMS_ACTION_TYPES } from '@/store/forms'

const formsMixins = {}

formsMixins.all = {
  props: {
    formData: {
      type: Object,
      required: true
    },
    formName: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      localFormData: {
        ...this.formData
      }
    }
  },
  computed: {
    formState: function () {
      return this.$store.state.forms[this.formName]
    }
  },
  created: function () {
    this.$store.dispatch(FORMS_ACTION_TYPES.GET, {
      formName: this.formName
    })
  },
  watch: {
    formData: function (data) {
      this.localFormData = {
        ...data
      }
    }
  },
  methods: {
    getInputValue: function (name) {  
      
      return this.localFormData[name]
    },
    setInputValue: function ({ name, value }) {
     
      this.localFormData[name] = value

      // Validate a checkbox immediately on changes
      if (typeof value === 'boolean') {
        this.$v.localFormData[name].$touch()
      }
    },
    handleInputBlur: function ({ name }) {
      this.$v.localFormData[name].$touch()
    },
    getInputMessage: function (name, customText) {
      const input = this.$v.localFormData[name]

      if (!input.$error) return null

      return getInputValidationMessage({ input, customText })
    },
    hasInputError: function (name) {
      return this.$v.localFormData[name].$error
    },
    isInputValid: function (name) {
      const input = this.$v.localFormData[name]
      return !input.$invalid && !!input.$model && input.$dirty
    },
    submitForm: function () {
      this.$v.localFormData.$touch()
      if (!this.$v.localFormData.$invalid) {
        this.$store.dispatch(FORMS_ACTION_TYPES.UNSET_ERROR, {
          formName: this.formName
        })
        this.$emit('submit', {
          data: this.localFormData,
          formName: this.formName
        })
      } else {
        this.$store.dispatch(FORMS_ACTION_TYPES.SET_ERROR, {
          formName: this.formName,
          message: staticContent.formValidation.allFields
        })
      }
    }
  }
}

export { formsMixins }
