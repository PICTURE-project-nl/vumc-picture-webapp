<template>
  <div class="input-slider">
    <label>{{ label }}</label>
    <div
      class="input-slider__wrapper"
      :class="{'input-slider__wrapper--range': isRangeSlider }"
    >
      <VueSlider
        v-bind="settings"
        v-model="value"
        :marks="false"
        :data="data"
        ref="refSlider"
       />

      <template v-if="isRangeSlider">
        <p
          v-for="(number, index) in value"
          :key="`value-${index}`"
          class="input-slider__value-display"
        >
          {{ number }}
        </p>
      </template>
      <p v-else class="input-slider__value-display">
        {{ singleValue }}
      </p>
    </div>
  </div>
</template>

<script>
  import { getRandomId } from '@/assets/scripts/utils/random-id'
  import { formPropTypes } from '@/prop-types/form'
  import { colorGradientRedYellowGreen, colorUi } from '@/config/scss-config'
  import VueSlider from 'vue-slider-component'
  export default {
    name: 'AtomRangeSlider',
    components: {
      VueSlider
    },
    props: {
      label: {
        type: String,
        required: false
      },
      name: formPropTypes.inputName,
      singleValue: {
        type: Number
      },
      rangeValue: {
        type: Array
      },
      minValue: {
        type: [String,Number],
        required: true,
        description: 'Minimum value of the slider.'
      },
      maxValue: {
        type: [String,Number],
        required: true,
        description: 'Maximum value of the slider.'
      },
      hasGradient: {
        type: Boolean
      },
      isLazy: {
        type: Boolean
      },
      interval: {
        type: Number,
        default: 1
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      tooltip:{
        type: String,
        default:'none',
        required:false
      },
      tooltipPlacement:{
        type: Array,
        required:false
        },
        seriesCategory:{required:false},
    },
    data: function () {
      return {
        id: getRandomId(),
        hasFocus: false,
        data:this.seriesCategory

      }
    },
    methods:{
      resetSliderValue(){

        this.$refs.refSlider.setValue(this.rangeValue);
        let value = this.rangeValue//[0,100];
        this.$emit('change', {name: this.name, value})
      }
    },

    computed: {
      isRangeSlider: function () {
        return !!this.rangeValue
      },
      settings: function () {
        return {
          width: '100%',
          height: 5,
          dotSize: 16,
          min: this.minValue,
          max: this.maxValue,
          interval: this.interval,
          disabled: this.isDisabled,
          show: true,
          useKeyboard: true,
          tooltip: this.tooltip,
          formatter: '€{value}',
          lazy: this.isLazy,
          tooltipPlacement:this.tooltipPlacement,
          processStyle: {
            backgroundImage: this.hasGradient ? colorGradientRedYellowGreen : colorUi.dodgerBlue
          },
          bgStyle: {
            backgroundImage: this.hasGradient ? colorGradientRedYellowGreen : ''
          }
        }
      },
      value: {
        get: function () {
          return this.rangeValue || this.singleValue
        },
        set: function (value) {
          this.$emit('change', {
            name: this.name,
            value
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-slider {
    @include mq($from: tablet) {
      filter: grayscale(100%);
      opacity: 0.8;
      transition: 0.2s all;
    }
  }

  ::v-deep .vue-slider-dot {
    @include mq($from: tablet) {
      opacity: 0;
      transition: 0.4s all;
    }
  }

  .input-slider:hover,
  .input-slider:focus {
    filter: grayscale(0%);
    opacity: 1;
    ::v-deep .vue-slider-dot {
      opacity: 1;
    }
  }

  .input-slider__wrapper {
    align-items: flex-end;
    display: flex;
  }

  .input-slider__wrapper--range {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .input-slider__value-display {
    padding-left: $global-spacing-unit;
    white-space: nowrap;
    .input-slider__wrapper--range & {
      padding-left: 0;
    }
  }
</style>
