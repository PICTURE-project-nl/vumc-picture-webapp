<template>
  <AtomFormInputWrapper
    :id="id"
    :message="message"
    :hasError="hasError"
    :hasSuccess="hasSuccess"
  >
    <div
      class="o-visually-hidden-input"
      @mouseenter="hasHover = true"
      @mouseleave="hasHover = false"
    >
      <input
        class="o-visually-hidden-input__input"
        type="file"
        :id="id"
        :name="id"
        @change="updateInput"
      >
      <AtomButton :hasHover="hasHover"
      class="file_upload_button">
       
        {{ buttonText }}
      </AtomButton>
    </div>
  </AtomFormInputWrapper>
</template>

<script>
  import { getRandomId } from '@/assets/scripts/utils/random-id'
  import AtomButton from './AtomButton.vue'
  import AtomIcon from './AtomIcon.vue'
  import { formPropTypes } from '@/prop-types/form'
  import AtomFormInputWrapper from './helpers/AtomFormInputWrapper.vue'

  export default {
    name: 'AtomFormInputFile',
    components: {
      AtomButton,
      AtomIcon,
      AtomFormInputWrapper
    },
    props: {
      buttonText: {
        type: String,
        default: 'File upload'
      },
      name: formPropTypes.inputName,
      hasError: formPropTypes.inputHasError,
      hasSuccess: formPropTypes.inputHasSuccess,
      isChecked: formPropTypes.inputIsChecked,
      message: formPropTypes.inputMessage
    },
    data: function () {
      return {
        hasHover: false,
        id: getRandomId()
      }
    },
    methods: {
      updateInput: function (event) {
        let files = event.target.files || event.dataTransfer.files
        if (!files.length) return

        this.$emit('change', {
          name: this.name,
          value: files[0]
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.file_upload_button{
  background-color:$color-input;
  color:#77ACFF;
  border: 1px solid #77ACFF; 
  padding: 5px
}
</style>