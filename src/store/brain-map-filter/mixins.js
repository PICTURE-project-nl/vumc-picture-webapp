const brainMapFilterMixins = {
    methods:{
        getFilterStatus: function(){
            return this.$store.state.brainMapFilter.status;
        },
        getFilterData: function(){
            return this.$store.state.brainMapFilter.filterData;
        },
        getFilterableOptions: function(){
            return this.$store.state.brainMapFilter.filterableOptions;
        }
    }
}
export {brainMapFilterMixins}