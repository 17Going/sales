<template>
  <treeselect
    :options="options"
    :disable-branch-nodes="true"
    :show-count="true"
    placeholder="Where are you from?"
  />
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    // register the component
    components: { Treeselect },
    data() {
      return {
        // define default value
        value: null,
        // define options
        options: [{
          id: 'a',
          label: 'a',
          children: [{
            id: 'aa',
            label: 'aa'
          }, {
            id: 'ab',
            label: 'ab'
          }]
        }, {
          id: 'b',
          label: 'b'
        }, {
          id: 'c',
          label: 'c'
        }]
      }
    }
  }
</script>
