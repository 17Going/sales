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
   <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
   <el-submenu index="2-4" mode="horizontal">
      <template slot="title" mode="horizontal">选项4</template>
      <el-menu-item index="2-4-1" mode="horizontal">选项1</el-menu-item>
      <el-menu-item index="2-4-2" mode="horizontal">选项2</el-menu-item>
      <el-menu-item index="2-4-3" mode="horizontal">选项3</el-menu-item>
    </el-submenu>
</el-menu>
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
