<template>
  <div class="customer-peopleSearch-val">
    客户名称：
    <el-input @keyup.enter.native="handleFilter" v-model="customerPeopleSearchVal"
              style="width: 200px;"
              placeholder="请输入客户名称">
    </el-input>
  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: '',
    data() {
      return {
        customerPeopleSearchVal: ''
      }
    },
    component: {
      // someComponent
    },
    methods: {
      handleFilter() {

      }
    }
  }
</script>

<style scoped>
  .customer-peopleSearch-val {
    margin-left: 12px;
    float: left;
  }
</style>
