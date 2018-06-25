<template>
  <div>
  <p>1111111111111111111111</p>
  <treeselect
    :options="options"
    :disable-branch-nodes="true"
    :show-count="true"
    placeholder="Where are you from?"
    :normalizer="normalizer"
  />
  </div>
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
          aaa: 'a',
          children: [{
            id: 'aa',
            aaa: 'aa'
          }, {
            id: 'ab',
            aaa: 'ab'
          }]
        }, {
          id: 'b',
          aaa: 'b'
        }, {
          id: 'c',
          aaa: 'c'
        }],
         normalizer(node) {
          return {
            id: node.id,
            label: node.aaa,
            children: node.children
          }
        }
      }
    }
  }
</script>
