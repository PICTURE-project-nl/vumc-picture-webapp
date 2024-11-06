<script>
  import { colorPropTypes } from '@/prop-types/color'

  export default {
    name: 'AtomTextHeading',
    props: {
      level: {
        type: Number,
        default: 2,
        validator: function (value) {
          return value >= 1 && value <= 6
        }
      },
      isVerySmall:Boolean,
      isSmall: Boolean,
      isLarge: Boolean,
      isMedium: Boolean,
      isTiny:Boolean,
      color: colorPropTypes.color('AtomTextHeading'),
      isUppercase: Boolean
    },
    render: function (createElement) {
      /*
      We need to dynamically render the HTML tag like h1 or h2, but this can only be done by using the createElement
      method.

      See: https://vuejs.org/v2/guide/render-function.html
       */
      return createElement(
        `h${this.level}`,
        {
          class: [
            'heading',
            {
              'heading--verysmall': this.isVerySmall,
              'heading--small': this.isSmall,
              'heading--large': this.isLarge,
              'heading--medium':this.isMedium,
              'heading--tiny':this.isTiny,

              [`heading--${this.color}`]: this.color,
              'heading--uppercase': this.isUppercase
            }
          ]
        },
        this.$slots.default || this.name
      )
    }
  }
</script>

<style lang="scss" scoped>
  .heading {
    @include font-size(24px);

    font-weight: $font-weight-bold;
  }

  .heading--large {
    @include font-size(32px);

    font-weight: $font-weight-semi-bold;
  }

  .heading--small {
    @include font-size(18px);

    font-weight: $font-weight-semi-bold;
  }

  .heading--verysmall {
    @include font-size(12px);
   font-weight: $font-weight-normal;
  }

  .heading--medium {

  @include font-size(14px);
   font-weight: $font-weight-bold;
   font-family: 'Poppins';
     
  }

  .heading--tiny{
    @include font-size(10px);
     font-family: 'Poppins';
     font-weight:400;
  }

   

  @each $name, $color in $color-ui {
    .heading--#{$name} {
      color: $color;
    }
  }

  .heading--uppercase {
    text-transform: uppercase;
  }
</style>
