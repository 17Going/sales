<template>
  <el-button style="margin-left: 0px"
             size="mini" :type="type" :icon="icon" plain @click="handleClick">{{text}}</el-button>
</template>

<script>
  export default {
    name: 'column-button',
    props: {
      icon: {
        default: 'el-icon-edit'
      },
      text: {
        default: '录入'
      },
      type: {
        default: 'danger'
      }
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>
