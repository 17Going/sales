<template>
  <div class="mainCls">
     <div class="contentCls">
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="私海保护期" name="privateSeaTab">
                <el-table v-loading="isLoading" :data="privateData" 
                 style="width: 100%" max-height="500" border>
                <!-- 保护期类型 -->
                <el-table-column prop="protectType" :label="labelObj.protectType" >
                    <template slot-scope='scope'>
                    <p>{{scope.row.protectType}}</p>
                    </template>
                </el-table-column>
                <!-- 使用部门 -->
                <el-table-column  prop="useDept" :label="labelObj.useDept">
                    <template slot-scope='scope'>
                    <p>{{scope.row.useDept}}</p>
                    </template>
                </el-table-column>
                <!-- 保护天数 -->
                <el-table-column  prop="protectDays" :label="labelObj.protectDays" >
                    <template slot-scope='scope'>
                    <p>{{scope.row.protectDays}}</p>
                    </template>
                </el-table-column>
                 <!-- 更新保护期 -->
                <el-table-column  prop="continueUpdate" :label="labelObj.continueUpdate" >
                    <template slot-scope='scope'>
                    <span class="continueUpdate">{{scope.row.continueUpdate}}</span>
                    </template>
                </el-table-column>
                 <!-- 操作 -->
                <el-table-column  prop="price" :label="labelObj.btnOperaText" >
                    <template slot-scope='scope'>
                        <el-button type='text'><i class="el-icon-edit"></i>{{labelObj.btnEditText}}</el-button>
                    </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="承担客户保护期" name="assumeTab">
               <el-table v-loading="isLoading" :data="assumeData" 
                 style="width: 100%" max-height="500" border>
                <!-- 保护期类型 -->
                <el-table-column prop="protectType" :label="labelObj.protectType" >
                    <template slot-scope='scope'>
                    <el-button type="text" @click="modifyUserFun(scope.row)">{{scope.row.protectType}}</el-button>
                    </template>
                </el-table-column>
                <!-- 保护期开始计算日期 -->
                <el-table-column  prop="protectStartTime" :label="labelObj.protectStartTime">
                    <template slot-scope='scope'>
                    <p>{{scope.row.protectStartTime}}</p>
                    </template>
                </el-table-column>
                <!-- 保护天数 -->
                <el-table-column  prop="protectDays" :label="labelObj.protectDays" >
                    <template slot-scope='scope'>
                    <p>{{scope.row.protectDays}}</p>
                    </template>
                </el-table-column>
                 <!-- 启用状态 -->
                <el-table-column  prop="enableStatus" :label="labelObj.enableStatus" >
                    <template slot-scope='scope'>
                    <p>{{scope.row.enableStatus}}</p>
                    </template>
                </el-table-column>
                 <!-- 操作 -->
                <el-table-column :label="labelObj.btnOperaText" >
                    <template slot-scope='scope'>
                        <el-button type='text'><i class="el-icon-edit"></i>{{labelObj.btnEditText}}</el-button>
                    </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
        </el-tabs>
       
      
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'privateSeaTab',
      rules: {},
      temp: {},
      dataForm: {},
      labelObj: {
        protectType: '保护期类型',
        useDept: '使用部门',
        protectDays: '保护天数',
        continueUpdate: '更新保护期',
        protectStartTime: '保护期开始计算日期',
        enableStatus: '启用状态',
        btnOperaText: '操作',
        btnEditText: '修改'
      },
      isLoading: false,
      privateData: [{
        protectType: '添加新客户',
        useDept: '全公司',
        protectDays: '15',
        continueUpdate: '更新保护期'
      }], // 私海保护列表数据
      assumeData: [{
        protectType: '添加新客户',
        protectDays: '30',
        protectStartTime: '合同签订日期',
        enableStatus: '启用'
      }] // 承担客户列表数据
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mainCls{
    .contentCls{
      margin: 20px;
      .dialog-footer{
        align: center;
        text-align: center;
      }
      .continueUpdate{
        background-color: #00da7b;
        color: #fff;
        border: 1px solid #00da7b;
        border-radius: 3px;
      }
    }
  }
</style>
