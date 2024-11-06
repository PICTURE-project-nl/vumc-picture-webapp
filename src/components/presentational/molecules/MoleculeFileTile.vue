<template>
  <div class="o-ratio u-margin-bottom">
    <div
      class="file-tile o-ratio__content"
      :class="{ 'file-tile--disabled': isDisabled }"
      @click="toggleOverlay"
    >
      <AtomMedia
        :src="thumbnailUrl"
        :alt="`Thumbnail of ${name}`"
      ></AtomMedia>
      <div class="tags-container">
        <p v-for="tag in tags" :key="tag" >{{ tag }}</p>
      </div>
      <div class="file-tile__content">
        <AtomTextBody
          color="white"
        >
          {{ name }}
        </AtomTextBody>
        <!--<AtomTextBody-->
        <!--color="ghost"-->
        <!--&gt;-->
        <!--{{ content.complexity }} {{ subText }}-->
        <!--</AtomTextBody>-->
      </div>

      <div
        class="file-tile__overlay"
        :class="{ 'file-tile__overlay--is-active': overlayIsVisible }"
      >
        <div v-if="!isResearch" class="file-tile__button">
          <AtomButton
            isSmall
            isGhost
            @click.native="setPopupFileId(fileId)"
          >
            <template :slot="AtomButton.slotConfig.iconLeft.name">
              <AtomIcon :type="buttonIcon" />
            </template>
            <template v-if="isResearch">
              {{ content.info }}
            </template>
            <template v-else>
              {{ content.edit }}
            </template>
          </AtomButton>
        </div>
        <div v-if="externalLink !== ''" class="file-tile__button">
          <AtomButton
            isSmall
            isGhost
            :href="externalLink"
            isExternalLink
          >
            Go to journal
          </AtomButton>
        </div>
        <div class="file-tile__button">
          <AtomButton
            isSmall
            :toName="toName"
            :toParams="toParams"
          >
            <template :slot="AtomButton.slotConfig.iconLeft.name">
              <AtomIcon type="pen" />
            </template>
            {{ content.view }}
          </AtomButton>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import {
    AtomTextBody,
    AtomIcon,
    AtomButton,
    AtomMedia
  } from '@/components/presentational/atoms'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'MoleculeFileTile',
    components: {
      AtomTextBody,
      AtomIcon,
      AtomButton,
      AtomMedia
    },
    props: {
      fileId: {
        type: String,
        required: true,
        description: 'Unique file id from api'
      },
      name: {
        type: String,
        description: 'File name'
      },
      subText: {
        type: String
      },
      toName: {
        type: String,
        description: 'Returns an <strong>router-link</strong> component instead of a <strong>button</strong>'
      },
      toParams: {
        type: Object
      },
      thumbnailUrl: {
        type: String,
        default: 'https://tool.pictureproject.nl/brain-volumes/1/brain-thumbnail.png'
      },
      isResearch: {
        type: Boolean
      },
      isDisabled: {
        type: Boolean
      },
      tags: {
        type: Array
      },
      externalLink: {
        type: String
      }
    },
    data () {
      return {
        AtomButton,
        overlayIsVisible: false,
        content: {
          ...staticContent.fileTile
        }
      }
    },
    computed: {
      buttonIcon: function () {
        return this.isResearch ? 'visibility' : 'settings'
      }
    },
    methods: {
      setPopupFileId: function (fileId) {
        this.$emit('setPopupFileId', fileId)
      },
      toggleOverlay: function () {
        if (!this.isDisabled) {
          this.overlayIsVisible = !this.overlayIsVisible
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .file-tile {
    background-color: $color-ebony-clay;
    border-radius: $global-radius;
    cursor: pointer;
    overflow: hidden;
  }

  .file-tile--disabled {
    cursor: default;
  }

  .file-tile__content {
    background-color: rgba($color-ebony-clay, 0.5);
    bottom: 0;
    left: 0;
    padding: $global-spacing-unit-small $global-spacing-unit-tiny;
    position: absolute;
    right: 0;
    text-align: center;
  }

  .file-tile__overlay {
    align-items: center;
    background-color: $color-ebony-clay;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: $global-transition;
  }

  .file-tile__overlay--is-active {
    opacity: 1;
    pointer-events: initial;
  }

  .file-tile__button {
    &:not(:first-child) {
      margin-top: $global-spacing-unit-small;
    }
  }

  .tags-container {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;

    > p {
      display: block;
      padding: 3px 6px;
      margin: 3px 5px;
      background-color: rgba(254, 161, 103, 0.8);
      border-radius: 5px;
    }
  }
</style>
