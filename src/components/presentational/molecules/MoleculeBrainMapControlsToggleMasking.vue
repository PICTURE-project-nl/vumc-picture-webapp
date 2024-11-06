<template>
  <div class="togglebox">

       <AtomTextBody  isMedium>
      {{ content.masking }}
    </AtomTextBody>

    <div class="boss" style="padding-left:5px">
      <v-select class="myDropdown"
      id="mySelect"
      :loading="options.length <= 0"
      v-model="selected"
      :options="options"
      :clearable="false"
      :reduce="options => options.id"
       key="id"
      label="name"
      @input="changeMasking(selected)"
    /></div>

  </div>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { MoleculeBrainViewerSectionHeading } from "@/components/presentational/molecules";
import { staticContent } from "@/data/static-content";
import { AtomFormInputDropdownlist } from "@/components/presentational/atoms";
import AtomTextBody from '../atoms/AtomTextBody';

import OpenIndicator from '../../../assets/openIndicator.vue';
vSelect.props.components.default = () => ({ OpenIndicator });

export default {
  name: "MoleculeBrainMapControlsToggleMasking",
  components: {
    AtomTextBody,
    MoleculeBrainViewerSectionHeading,
    AtomFormInputDropdownlist,
    vSelect

  },
  props: {
    maskingValue: {
      type: String,
    },
    probabilityValue: {
      type: Number,
    },
    patientAmountValue: {
      type: Number,
    },
  },
  data: function () {
    return {
      content: {
        ...staticContent.brainMapControls,
      },

      options: [
        { id: "probabilityMap", name: staticContent.brainMapControls.probabilityMap},

        { id: "patientAmount", name:staticContent.brainMapControls.patientAmount },
      ],
      selected: "probabilityMap",
      niftiTypeToggle: {
        labels: [
          staticContent.brainMapViewer.probability,

        ],
        values: ["probabilityMap"],
      },
    };
  },

  methods: {
    resetMasking: function () {
      this.$emit("resetMasking");
    },
    changeMasking: function (payload) {
      this.$emit("setMasking", payload);
    },
  },
};
</script>

<style >
.togglebox {
  display: flex;
}

.label_space {
  padding-right: 5px;
}

 .myDropdown{
  width:max-content;
  min-width: 220px;
  border-radius: 4px;
  background-color: #1C1B21;

}

.myDropdown .vs__selected {
      padding:6px;
      font-size:12px;

}

.boss  .vs__selected-options{
  font:12px;
  padding:1px 3px;
}

.boss .vs__dropdown-toggle{
  padding:0 4px 2px 2px;
}
.v-select
{
 --vs-selected-color: #fff;
   --vs-border-color:#51525C;
     --vs-search-input-bg: #1C1B21;
    --vs-dropdown-bg: #1C1B21;
    --vs-border-width: 1px;
    --vs-border-style: solid;
    --vs-border-radius: 4px;
    --vs-actions-padding: 3px 8px -2px 1px;
    --vs-font-size: 9px;
    --vs-line-height: 0.4px;
    font-size:12px;
}

.v-select.vs__search{
  margin: 0px 0 0;
      padding: 0 14px;
}
</style>
