<template>
  <div>
    <MoleculeFormState v-bind="formState">
      <AtomBox isLong>
        <div class="o-wrapper o-wrapper--small u-padding-vertical-large" style="background:#292930">
          <MoleculeRichTextCard
            :intro="content.title"
          >
            <template slot="body">
              <AtomTextBody>
                {{ content.body }}
              </AtomTextBody>
            </template>
            <template slot="cta">
             <div style="padding-bottom:15px"></div>
              <AtomFormInputFile 
                name="userInputFile"
                :value="getInputValue('userInputFile')"
                :hasError="hasInputError('userInputFile')"
                :hasSuccess="isInputValid('userInputFile')"
                :message="getInputMessage('userInputFile')"
                @change="setInputValue"
                @blur="handleInputBlur"
              >
                {{ content.button }}
                <template slot="iconLeft">
                  <AtomIcon type="upload-cloud"></AtomIcon>
                </template>
              </AtomFormInputFile>

            </template>
          </MoleculeRichTextCard>
           <AtomTextBody isSmall style="padding-left:30px; padding-top:5px"> {{fileName}}</AtomTextBody>
          
          <div class="u-margin-top-large" >
            <MoleculeRichTextCard
              :intro="content.policyHeader"
            >
              <template slot="body">
                <AtomTextBody color="ghost">
                  {{ content.policyDescription }}
                </AtomTextBody>
              </template>
            </MoleculeRichTextCard>
            <div class="u-margin-top-large policy-msg">
              <!-- <AtomScrollBlock> -->
                <div v-html="content.policyContent">
                </div>
              <!-- </AtomScrollBlock> -->
            </div>
            <div class="u-margin-top-small">
              <AtomFormInputCheckbox
                :label="content.inputLabel"
                name="policiesAreAccepted"
                :isChecked="getInputValue('policiesAreAccepted')"
                :hasError="hasInputError('policiesAreAccepted')"
                :hasSuccess="isInputValid('policiesAreAccepted')"
                :message="getInputMessage('policiesAreAccepted', 'Please accept our policies')"
                @change="setInputValue"
              >
              </AtomFormInputCheckbox>
            </div>
          </div>
        </div>
      </AtomBox>
    </MoleculeFormState>
  </div>
</template>

<script>
  import { MoleculeRichTextCard, MoleculeFormState } from '@/components/presentational/molecules'
  import { staticContent } from '@/data/static-content'
  import { AtomTextBody, AtomBox, AtomIcon, AtomScrollBlock, AtomFormInputCheckbox, AtomFormInputFile } from '@/components/presentational/atoms'
  import { formsMixins } from '@/store/forms'
  import { getValidationProperties } from '@/assets/scripts/utils/form-validation'
  import { uploadBrainMapValidations } from '@/store/brain-map-upload'

  export default {
    name: 'OrganismUpload',
    components: {
      AtomTextBody,
      AtomIcon,
      AtomBox,
      AtomFormInputFile,
      AtomScrollBlock,
      AtomFormInputCheckbox,
      MoleculeRichTextCard,
      MoleculeFormState
    },
    mixins: [
      formsMixins.all
    ],
    props: {
      nextStepCallback: {
        type: Function
      }
    },
    computed:{
      fileName(){
        let file = this.getInputValue('userInputFile');
         if(file){
          
             return file.name
         }
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.upload
        }
      }
    },
    watch: {
      nextStepCallback: function () {
        this.submitForm()
      }
    },
    validations: function () {
      return {
        localFormData: getValidationProperties({
          formData: this.formData,
          validations: uploadBrainMapValidations.upload
        })
      }
    }
  }
</script>
<style>
.policy-msg{
   background:white;
    max-height:150px; 
    overflow-y:auto; 
    color:black;
     padding:20px; 
     font:poppins
         
}</style>
