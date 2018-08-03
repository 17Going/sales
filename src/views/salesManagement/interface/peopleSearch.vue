<template>
  <div class="people-search-val">
    人员：
    <el-select v-model="peopleSearchVal" filterable multiple placeholder="请选择">
      <el-option
        v-for="item in peopleSearchOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.value }}:</span>
        <span style="float: left; color: #8492a6;">{{ item.label }}</span>
      </el-option>
    </el-select>
  </div>
  <!--<someComponent></someComponent>-->
</template>

<script>
  // import someComponent from './someComponent'
  export default {
    name: 'people-search',
    data() {
      return {
        peopleSearchVal: '',
        peopleSearchOptions: [{
          value: '业务员',
          label: '小强'
        }, {
          value: '董事长',
          label: '小刘'
        }, {
          value: '经理',
          label: '小黄'
        }, {
          value: '人事经理',
          label: '小艾'
        }]
      }
    },
    component: {
      // someComponent
    }
  }
</script>

<style scoped>
  .people-search-val {
    margin-left: 12px;
    float: left;
  }
</style>
