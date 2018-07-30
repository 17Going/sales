<template>
  <div class="components-container">
    <div class="toolbarCls">
      <div class="demo-input-suffix">
        <el-row class='operaCls' :gutter="20">
            <el-col :span='5'>
                <el-input v-model="cusName" :placeholder='labelObj.cusName'></el-input>
            </el-col>
            <el-col :span='10'>
                <el-button class="el-icon-search" type="danger" @click="addPostsFun()">{{labelObj.queryBtnText}}</el-button>
            </el-col>
        </el-row>
      
      </div>
    </div>

    <div class="tableCls">
        <el-table ref="multipleTable" v-loading="isLoading" :data="tableData" 
            style="width: 100%"  border>

             <!-- '客户名称' -->
            <el-table-column  prop="cusName" :label="labelObj.cusName" width="150px">
              <template slot-scope='scope'>
                <el-button type='text' >{{scope.row.cusName}}</el-button>
              </template>
            </el-table-column>
            <!-- '客户位置' -->
            <el-table-column  prop="cusLoc" :label="labelObj.cusLoc" >
              <template slot-scope='scope'>
                <span>{{scope.row.cusLoc}}</span>
              </template>
            </el-table-column>
             <!-- '剩余天数' -->
            <el-table-column  prop="restDays" :label="labelObj.restDays" >
              <template slot-scope='scope'>
                <span>{{scope.row.restDays}}</span>
              </template>
            </el-table-column>
             <!-- '最近跟进' -->
            <el-table-column  prop="latelyFollow" :label="labelObj.latelyFollow" >
              <template slot-scope='scope'>
                <span>{{scope.row.latelyFollow}}</span>
              </template>
            </el-table-column>
             <!-- '法人姓名' -->
            <el-table-column  prop="legalName" :label="labelObj.legalName" >
              <template slot-scope='scope'>
                <span>{{scope.row.legalName}}</span>
              </template>
            </el-table-column>
             <!-- '注册资本' -->
            <el-table-column  prop="regCapital" :label="labelObj.regCapital" >
              <template slot-scope='scope'>
                <span>{{scope.row.regCapital}}</span>
              </template>
            </el-table-column>
             <!-- '所属行业' -->
            <el-table-column  prop="regCapital" :label="labelObj.industry" >
              <template slot-scope='scope'>
                <span>{{scope.row.industry}}</span>
              </template>
            </el-table-column>
            <!-- '客户来源' -->
            <el-table-column  prop="cusSource" :label="labelObj.cusSource" >
              <template slot-scope='scope'>
                <span>{{scope.row.cusSource}}</span>
              </template>
            </el-table-column>
             <!-- '所属区域' -->
            <el-table-column  prop="area" :label="labelObj.area" >
              <template slot-scope='scope'>
                <span>{{scope.row.area}}</span>
              </template>
            </el-table-column>
              <!-- '电话跟进' -->
            <el-table-column  prop="phoneFollow" :label="labelObj.phoneFollow" >
              <template slot-scope='scope'>
                <el-button type='text' >{{scope.row.phoneFollow}}</el-button>
              </template>
            </el-table-column>

              <!-- '拜访跟进' -->
            <el-table-column  prop="visitFollow" :label="labelObj.visitFollow" >
              <template slot-scope='scope'>
                <el-button type='text' >{{scope.row.visitFollow}}</el-button>
              </template>
            </el-table-column>
              <!-- '理单记录' -->
            <el-table-column  prop="orderRecord" :label="labelObj.orderRecord" >
              <template slot-scope='scope'>
                <el-button type='text' >{{scope.row.orderRecord}}</el-button>
              </template>
            </el-table-column>
              <!-- '合同记录' -->
            <el-table-column  prop="contractRecord" :label="labelObj.contractRecord" >
              <template slot-scope='scope'>
                <el-button type='text' >{{scope.row.contractRecord}}</el-button>
              </template>
            </el-table-column>
          <el-table-column  :label="labelObj.opera" width="160">
            <template slot-scope='scope'>
              <el-row class='operaCls' :gutter="20">
                <!-- <el-col :span='12'>
                    <el-button type="text" @click="bindPosts(scope.row)">[绑定部门]</el-button>
                </el-col> -->
            
                <el-col :span='24'>
                   <!-- <el-button class="el-icon-edit" v-if='!scope.row.editJobName' type="text" @click="modifyPostsFun(scope.row)">{{labelObj.editText}}</el-button>
                    <el-button class="el-icon-check" v-if='scope.row.editJobName' type="text" @click="modifyApply(scope.row)">{{labelObj.confirmText}}</el-button>
                  -->
                </el-col>
            </el-row>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'splitpane-demo',
  components: { },
  data() {
    return {
      cusName: '',
      isLoading: false,
      tableData: [{
        cusName: '华为技术有限公司',
        cusLoc: '	私海',
        restDays: '6',
        latelyFollow: '电话跟进 | 小强 | 2018-07-15 15:06:51 | 联系中',
        legalName: '任正非',
        regCapital: '1111111111',
        industry: '	家电数码',
        cusSource: '线上渠道',
        area: '北京-北京',
        phoneFollow: '1',
        visitFollow: '0',
        orderRecord: '0',
        contractRecord: '0',
        opera: '操作'
      }],
      labelObj: {
        queryBtnText: '立即查询',
        cusName: '客户名称',
        cusLoc: '客户位置',
        restDays: '剩余天数',
        latelyFollow: '最近跟进',
        legalName: '法人姓名',
        regCapital: '注册资本',
        industry: '所属行业',
        cusSource: '客户来源',
        area: '所属区域',
        phoneFollow: '电话跟进',
        visitFollow: '拜访跟进',
        orderRecord: '理单记录',
        contractRecord: '合同记录',
        opera: '操作'
      }
    }
  },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style  scoped>
  .components-container {
    position: relative;
    height: 100vh;
  }
  .components-container .toolbarCls{
    padding-bottom: 10px;
  }
  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
</style>
