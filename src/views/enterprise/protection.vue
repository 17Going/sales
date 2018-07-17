<template>
  <div class="mainCls">
     <div class="contentCls">
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="私海保护期" name="privateSeaTab">
            <div class="tabCls">
              <div class="toolbarCls">
                <el-row>
                  <el-col :span="22">
                    <i class="el-icon-warning"></i>{{labelObj.protectInfo}}
                    <el-button type='text' class="el-icon-edit" @click="cfgFreezeDays"></el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type='danger' class="el-icon-plus" @click="newProtect">{{labelObj.addProtect}}</el-button>
                  </el-col>
                </el-row>
              </div>            
              <div class="tableCls">
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
                <el-table-column  :label="labelObj.btnOperaText" >
                    <template slot-scope='scope'>
                        <el-button type='text' @click="modifyProtect(scope.row)"><i class="el-icon-edit"></i>{{labelObj.btnEditText}}</el-button>
                    </template>
                </el-table-column>
              </el-table>
              </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="承担客户保护期" name="assumeTab">
               <div class="toolbarCls"><i class="el-icon-warning"></i>{{labelObj.assumeInfo}}</div>
               <div class="tableCls">
               <el-table v-loading="isLoading" :data="assumeData" 
                 style="width: 100%" max-height="500" border>
                <!-- 保护期类型 -->
                <el-table-column prop="protectType" :label="labelObj.protectType" >
                    <template slot-scope='scope'>
                    <p>{{scope.row.protectType}}</p>
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
                    <p>{{scope.row.enableStatus === 1 ? labelObj.labelEnable : labelObj.labelDisable}}</p>
                    </template>
                </el-table-column>
                 <!-- 操作 -->
                <el-table-column :label="labelObj.btnOperaText" >
                    <template slot-scope='scope'>
                        <el-button type='text' @click="modifyOrder(scope.row)"><i class="el-icon-edit"></i>{{labelObj.btnEditText}}</el-button>
                    </template>
                </el-table-column>
              </el-table>
               </div>
            </el-tab-pane>
        </el-tabs>
         <div class="dialogCls">
            <div>
            <el-dialog :visible.sync="dialogFreezeForm" :title="labelObj.freezeTitle">
               <el-form :model="freezeForm" :rules="freezeRules" ref="freezeForm" label-width="138px" label-position="left">
                  <!-- 冻结天数 -->
                  <el-form-item :label="labelObj.protectDays" >
                    <el-input v-model='freezeForm.protectDays'></el-input>
                  </el-form-item>
               </el-form>
               <div>
                  {{labelObj.descInfo}}
               </div>
               <div slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="cfgFreezeDays">{{labelObj.btnSaveText}}</el-button>
                  <el-button type="info" @click="closeFreezeDays">{{labelObj.btnCancelText}}</el-button>
                </div>
            </el-dialog>
            </div>
            <div>
             <el-dialog :visible.sync="dialogProtectForm" :title="labelObj.freezeTitle" @close="closeProtect">
               <el-form :model="protectForm" :rules="protectRules" ref="protectForm" label-width="138px" label-position="left">
                  <!-- 类型 -->
                  <el-form-item :label="labelObj.protectType" >
                    <el-input v-model='protectForm.protectType'></el-input>
                  </el-form-item>
                  <!-- 使用部门 -->
                  <el-form-item :label="labelObj.useDept" >
                    <el-input v-model='protectForm.useDept'></el-input>
                  </el-form-item>
                  <!-- 保护天数 -->
                  <el-form-item :label="labelObj.protectDays" >
                    <el-input v-model='protectForm.protectDays'></el-input>
                  </el-form-item>
                   <!-- 更新保护期 -->
                  <el-form-item :label="labelObj.continueUpdate" >
                    <el-input v-model='protectForm.continueUpdate'></el-input>
                  </el-form-item>
               </el-form>
               <div>
                  {{labelObj.descInfo}}
               </div>
               <div slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="submitProtect">{{labelObj.btnSaveText}}</el-button>
                  <el-button type="info" @click="closeProtect">{{labelObj.btnCancelText}}</el-button>
                </div>
            </el-dialog>
          </div>
           <div>
             <el-dialog :visible.sync="dialogOrderForm" :title="labelObj.orderTitle" @close="closeOrder">
               <el-form :model="orderForm" :rules="orderRules" ref="orderForm" label-width="138px" label-position="left">
                  <!-- 保护期开始计算日期 -->
                  <el-form-item :label="labelObj.protectStartTime" >
                    <el-input v-model='orderForm.protectStartTime'></el-input>
                  </el-form-item>
                  <!-- 保护天数 -->
                  <el-form-item :label="labelObj.protectDays" >
                    <el-input v-model='orderForm.protectDays'></el-input>
                  </el-form-item>
                  <!-- 启用状态 -->
                  <el-form-item :label="labelObj.enableStatus" >
                     <el-radio v-model="orderForm.enableStatus" :label="0" >{{labelObj.labelDisable}}</el-radio>
                     <el-radio v-model="orderForm.enableStatus" :label="1" >{{labelObj.labelEnable}}</el-radio>
                  </el-form-item>
                 
               </el-form>
               <div slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="submitOrder">{{labelObj.btnSaveText}}</el-button>
                  <el-button type="info" @click="closeOrder">{{labelObj.btnCancelText}}</el-button>
                </div>
            </el-dialog>
          </div>
         </div>
      
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
        addProtect: '新增保护期',
        protectInfo: '开放池客户冻结期（同一销售人员在此期间不得拉回之前属于自己的客户） 0 天 ',
        assumeInfo: '承担客户保护期过期后将自动变为流失客户，届时可在公海拉入。',
        descInfo: '注：同一销售人员（主跟进人）在此期间不得拉回之前属于自己的客户。',
        protectType: '保护期类型',
        useDept: '使用部门',
        protectDays: '保护天数',
        continueUpdate: '更新保护期',
        protectStartTime: '保护期开始计算日期',
        enableStatus: '启用状态',
        labelDisable: '禁用',
        labelEnable: '启用',
        /* BEGIN: 冻结窗口*/
        freezeTitle: '开放池客户冻结期',
        // protectDays: '保护天数',
        /* END: 冻结窗口*/
        /* BEGIN: 保护期配置窗口*/
        protectNewTitle: '新增保护期',
        protecEditTitle: '修改保护期',
        // protectType: '保护期类型',
        // useDept: '使用部门',
        // protectDays: '保护天数',
        // continueUpdate: '更新保护期',
        /* END: 保护期配置窗口*/
        orderTitle: '成单客户保护期',
        btnSaveText: '保存',
        btnCancelText: '取消',
        btnOperaText: '操作',
        btnEditText: '修改'
      },
      isLoading: false,
      // 私海保护列表数据
      privateData: [{
        protectType: '添加新客户',
        useDept: '全公司',
        protectDays: '15',
        continueUpdate: '更新保护期'
      }],
      // 承担客户列表数据
      assumeData: [{
        protectType: '添加新客户',
        protectDays: '30',
        protectStartTime: '合同签订日期',
        enableStatus: 1
      }],
      dialogFreezeForm: false,
      freezeForm: {
        protectDays: ''
      },
      freezeRules: {},
      dialogProtectForm: false,
      protectForm: {
        protectType: '',
        useDept: '',
        protectDays: '',
        continueUpdate: ''
      },
      protectRules: {},
      dialogOrderForm: false,
      orderForm: {
        protectStartTime: '',
        protectDays: '',
        enableStatus: 0
      },
      orderRules: {}
    }
  },
  methods: {
    cfgFreezeDays() {
      this.dialogFreezeForm = true;
    },
    closeFreezeDays() {
      this.dialogFreezeForm = false;
    },
    newProtect() {
      this.dialogProtectForm = true;
    },
    modifyProtect(records) {
      this.dialogProtectForm = true;
      this.protectForm = records;
    },
    submitProtect() {
      this.dialogProtectForm = false;
    },
    closeProtect() {
      this.dialogProtectForm = false;
      this.protectForm = {
        protectType: '',
        useDept: '',
        protectDays: '',
        continueUpdate: ''
      }
    },
    modifyOrder(records) {
      this.dialogOrderForm = true;
      this.orderForm = {
        protectDays: '30',
        protectStartTime: '合同签订日期',
        enableStatus: 1
      }
    },
    submitOrder() {
      this.dialogOrderForm = false;
    },
    closeOrder() {
      this.dialogOrderForm = false;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mainCls{
    .contentCls{
      margin: 20px;
      .toolbarCls{
        margin: 10px 0px;
        .el-icon-warning{
          padding-right: 5px;
          color: #ffb71b;
        }
        .el-button{
          background-color: #fef9f9;
          border-radius: 3px;
          border: 1px solid #f1afaf;
          color: #e15151;
          padding: 5px 10px;
        }
      }
      .tableCls {
        .el-button{
          background-color: #fef9f9;
          border-radius: 3px;
          border: 1px solid #f1afaf;
          color: #e15151;
          padding: 5px 10px;
        }
      }
      .dialog-footer{
        text-align: right;
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
