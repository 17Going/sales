<template>
  <div class="components-container">
    <div class="toolbarCls">
      <div class="demo-input-suffix">
        <el-row  :gutter="20">
            <!-- 客户名称 -->
            <el-col :span='8'>
                {{labelObj.cusName}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="cusName" :placeholder='labelObj.cusName'></el-input>
            </el-col>
             <!-- 注册资本 -->
            <el-col :span='8'>
                {{labelObj.regCapital}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="regCapital" :placeholder='labelObj.regCapital'></el-input>
            </el-col>
             <!-- 行业 -->
            <el-col :span='8'>
                {{labelObj.industry}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="industry" :placeholder='labelObj.industry'></el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20">
           <!-- 客户来源 -->
            <el-col :span='8'>
                {{labelObj.cusSource}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="cusSource" :placeholder='labelObj.cusSource'></el-input>
            </el-col>
            <!-- 客户所属区域 -->
            <el-col :span='8'>
                {{labelObj.area}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="area" :placeholder='labelObj.area'></el-input>
            </el-col>
             <!-- 跟进情况 -->
            <el-col :span='8'>
                {{labelObj.followSituation}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="followSituation" :placeholder='labelObj.followSituation'></el-input>
            </el-col>
        </el-row>
        <el-row class='operaCls' :gutter="20">
           <!-- 个人评级 -->
            <el-col :span='8'>
                {{labelObj.personalRating}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="personalRating" :placeholder='labelObj.personalRating'></el-input>
            </el-col>
            <!-- 经理评级 -->
            <el-col :span='8'>
                {{labelObj.managerRating}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="managerRating" :placeholder='labelObj.managerRating'></el-input>
            </el-col>
            <!-- 电话数 -->
            <el-col :span='8'>
                {{labelObj.phoneNum}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="phoneNum" :placeholder='labelObj.phoneNum'></el-input>
            </el-col>
        </el-row>
        <el-row class='operaCls' :gutter="20">
           <!-- 拜访数 -->
            <el-col :span='8'>
                {{labelObj.visitNum}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="visitNum" :placeholder='labelObj.visitNum'></el-input>
            </el-col>
             <!-- 理单次数-->
            <el-col :span='8' class="specialCls">
                {{labelObj.orderNum}}&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input v-model="orderNum" :placeholder='labelObj.orderNum'></el-input> ~ 
                <el-input v-model="orderNum2" ></el-input>
            </el-col>
            <!-- 流入开始 -->
            <el-col :span='8'>
                {{labelObj.startTime}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="startTime" :placeholder='labelObj.startTime'></el-input>
            </el-col>
        </el-row>
         
        <el-row class='operaCls' :gutter="20">
            <!-- 流入结束 -->
            <el-col :span='8'>
                {{labelObj.endTime}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="endTime" :placeholder='labelObj.endTime'></el-input>
            </el-col>
            <el-col :span='10'>
                <el-button class="el-icon-search" type="danger" @click="queryFun()">{{labelObj.queryBtnText}}</el-button>
                <el-button type="danger" @click="clearQueryFun()">{{labelObj.resetBtnText}}</el-button>
            </el-col>
        </el-row>
      </div>
    </div>

    <div class="tableCls">
        <el-table ref="multipleTable" v-loading="isLoading" :data="tableData" 
            style="width: 100%"  border>

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
             <!-- '客户名称' -->
            <el-table-column  prop="cusName" :label="labelObj.cusName" width="150px">
              <template slot-scope='scope'>
                <el-button type='text' >{{scope.row.cusName}}</el-button>
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
            <!-- '个人评级' -->
            <el-table-column  prop="personalRating" :label="labelObj.personalRating" >
              <template slot-scope='scope'>
                <span>{{scope.row.personalRating}}</span>
              </template>
            </el-table-column>
             <!-- '经理评级' -->
            <el-table-column  prop="managerRating" :label="labelObj.managerRating" >
              <template slot-scope='scope'>
                <span>{{scope.row.managerRating}}</span>
              </template>
            </el-table-column>
            <!-- '流入时间' -->
            <el-table-column  prop="inflowTime" :label="labelObj.inflowTime" >
              <template slot-scope='scope'>
                <span>{{scope.row.inflowTime}}</span>
              </template>
            </el-table-column>
              <!-- '扔出原因' -->
            <el-table-column  prop="throwReason" :label="labelObj.throwReason" >
              <template slot-scope='scope'>
                <el-button type='text' >{{scope.row.throwReason}}</el-button>
              </template>
            </el-table-column>
         
        </el-table>
    </div>
    <div class="filter-container">
      <el-button type="danger" class="filter-item">{{labelObj.privateSea}}</el-button>
      <el-button type="danger" class="filter-item">{{labelObj.allot}}</el-button>
      <el-button type="danger" class="filter-item">{{labelObj.cusArea}}</el-button>
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
      regCapital: '',
      industry: '',
      cusSource: '',
      area: '',
      followSituation: '',
      personalRating: '',
      managerRating: '',
      phoneNum: '',
      visitNum: '',
      orderNum: '',
      orderNum2: '',
      startTime: '',
      endTime: '',
      labelObj: {
        queryBtnText: '立即查询',
        resetBtnText: '重置查询',
        cusName: '客户名称',
        cusLoc: '客户位置',
        restDays: '剩余天数',
        followSituation: '跟进情况',
        latelyFollow: '最近跟进',
        legalName: '法人姓名',
        regCapital: '注册资本',
        industry: '行业',
        cusSource: '客户来源',
        area: '所属区域',
        phoneFollow: '电话跟进',
        visitFollow: '拜访跟进',
        orderRecord: '理单记录',
        orderNum: '理单次数',
        contractRecord: '合同记录',
        personalRating: '个人评级',
        managerRating: '经理评级',
        phoneNum: '电话数',
        visitNum: '拜访数',
        startTime: '开始时间',
        endTime: '结束时间',
        inflowTime: '流入时间',
        throwReason: '扔掉原因',
        opera: '操作',
        cusArea: '批量设置客户区域',
        allot: '批量分配',
        privateSea: '批量拉入私海'
      }
    }
  },
  methods: {
    resize() {
      console.log('resize')
    },
    // 查询方法
    queryFun() {
      // 查询传参代码
    },
    // 清空查询
    clearQueryFun() {
      // 清空查询条件并调取getpagedData方法
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss"  scoped>
  .components-container {
    position: relative;
    height: 100vh;
  }
  .components-container .toolbarCls{
    text-align: left;
    .el-row{
      margin-bottom: 10px;
    }
    .el-input{
      width: 70%;
    }
     .specialCls .el-input{
      width: 32%;
    }
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
  .filter-container{
    margin-top: 10px;
  }
 
</style>
