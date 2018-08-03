<template>
  <div class="company-search-val">
    公司：
    <el-select v-model="companySearchVal" filterable multiple placeholder="请选择">
      <el-option
        v-for="item in companySearchOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: 'company-search',
    data() {
      return {
        companySearchVal: '',
        companySearchOptions: [{
          value: '华为技术有限公司',
          label: '华为技术有限公司'
        }, {
          value: '海康技术有限公司',
          label: '海康技术有限公司'
        }]
      }
    },
    component: {
      // someComponent
    }
  }
</script>

<style scoped>
  .company-search-val {
    margin-left: 12px;
    float: left;
  }
</style>
