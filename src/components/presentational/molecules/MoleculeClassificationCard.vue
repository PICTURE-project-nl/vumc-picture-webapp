<template>
  <div class="classification-card">
    <AtomTextHeading
      :level="3"
      isSmall
    >
      {{ fileName }} - {{ fileSizeToMb }}MB
    </AtomTextHeading>
    <div class="img-container u-margin-top-small">
      <AtomMedia
        :src="imageUrl"
        :alt="imageAltText"
        isRounded
        hasShadow
      />
    </div>
    <div class="u-margin-top-small">
      <AtomFormInputCheckbox
        name="classificationConform"
        :label="content.classificationConform"
        :isChecked="isEnabled"
        :isDisabled="checkSelectedFileLength"
        @change="updateChooseFileToggle"
      ></AtomFormInputCheckbox>
    </div>
    <div class="u-margin-top-small">
      <AtomFormInputToggle
        :groupModel="selectedClassification"
        :labels="toggleLabels"
        :values="getToggleValues"
        isHighlight
        :isDisabled="!isEnabled"
        @change="updateSelectedFiles"
      ></AtomFormInputToggle>
    </div>
  </div>
</template>

<script>
import {staticContent} from '@/data/static-content'
import {
  AtomTextHeading,
  AtomMedia,
  AtomFormInputToggle,
  AtomFormInputCheckbox
} from '@/components/presentational/atoms'

export default {
  name: 'MoleculeClassificationCard',
  components: {
    AtomTextHeading,
    AtomMedia,
    AtomFormInputToggle,
    AtomFormInputCheckbox
  },
  props: {
    id: {
      type: Number
    },
    selectedFiles: {
      type: Array
    },
    fileName: {
      type: String
    },
    fileSize: {
      type: Number
    },
    imageUrl: {
      type: String
    },
    imageAltText: {
      type: String
    },
    classifications: {
      type: Array
    }
  },
  data: function () {
    return {
      content: {
        ...staticContent.uploadProcess
      },
      isEnabled: false,
      selectedClassification: '',
      toggleLabels: ['T1c', 'T1w', 'T2w', 'FLAIR'],
      toggleValues: ['t1c', 't1w', 't2w', 'flair']
    }
  },
  computed: {
    fileSizeToMb: function () {
      return Math.round(this.fileSize / 1000)
    },
    checkSelectedFileLength: function () {
      return this.selectedFiles.length > 3 && !this.isEnabled
    },
    getToggleValues: function () {
      return this.toggleValues.filter((value) => {
        return this.selectedFiles.filter(file => file.value !== value)
      })
    }
  },
  methods: {
    updateSelectedFiles: function (value) {
      this.selectedClassification = value
      this.$emit('updateSelectedFiles', {id: this.id, value: value})
    },
    updateChooseFileToggle: function (payload) {
      this.isEnabled = payload.value
      if (payload.value) {
        this.updateSelectedFiles(this.toggleValues[0])
      } else {
        this.updateSelectedFiles('')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .media {
  max-height: 300px;
  width: 100%;
}

.classification-card {
  max-width: 320px;
}

.img-container {
  background-color: black; /* Zwarte achtergrond */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 300px; /* Max hoogte van de afbeelding */
  overflow: hidden; /* Zorg ervoor dat de afbeelding netjes blijft */
}

.img-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;
}
</style>
