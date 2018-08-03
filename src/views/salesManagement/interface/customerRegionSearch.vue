<template>
  <div class="customer-regionSearch-val">
    客户所属区域：
    <el-select v-model="customerRegionSearchVal" placeholder="请选择客户所属区域">
      <el-option
        v-for="item in customerRegionSearchOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: 'customer-regionSearch',
    data() {
      return {
        customerRegionSearchVal: '',
        customerRegionSearchOptions: [{
          value: '北京',
          label: '北京'
        }, {
          value: '上海',
          label: '上海'
        }, {
          value: '安徽',
          label: '安徽'
        }]
      }
    },
    component: {
      // someComponent
    }
  }
</script>

<style scoped>
  .customer-regionSearch-val {
    margin-left: 12px;
    float: left;
  }
</style>
