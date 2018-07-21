<template>
  <div class="mainCls">
     <div class="contentCls">
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane :label="labelObj.tabPriTitle" name="privateSeaTab">
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
            <el-tab-pane :label="labelObj.tabTitle" name="assumeTab">
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
                      <el-switch
                        v-model='scope.row.enableStatus'
                        :active-value='0'
                        :inactive-value='1'
                        active-color="#13ce66"
                        :active-text="labelObj.labelEnable"
                        :inactive-text="labelObj.labelDisable">
                      </el-switch>
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
                    <el-select v-model='protectForm.protectType'>
                        <el-option :value="1" :label="labelObj.labelAddCus"></el-option>
                        <el-option :value="2" :label="labelObj.labelAddFollw"></el-option>
                        <el-option :value="3" :label="labelObj.labelAddRecord"></el-option>
                    </el-select>
                       
                  </el-form-item>
                  <!-- 使用部门 -->
                  <el-form-item :label="labelObj.useDept" >
                    <treeselect :normalizer="normalizer" :multiple="true" :default-expand-level='2' @focus="getSelectList" v-model="protectForm.parentName"  :options="deptData" />
                      <label  slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
                        {{ node.depName}} 
                      </label>
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
                     <el-radio v-model="orderForm.protectStartTime" :label="0" >{{labelObj.labelStartTim}}</el-radio>
                     <el-radio v-model="orderForm.protectStartTime" :label="1" >{{labelObj.labelEndTim}}</el-radio>
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
import { departmentGetList } from '@/api/management'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  components: {
    Treeselect
  },
  data() {
    return {
      activeName: 'privateSeaTab',
      rules: {},
      temp: {},
      dataForm: {},
      deptData: [], // 部门的数据
      // 格式化数据键的格式
      normalizer(node) {
        return {
          id: node.id,
          label: node.depName,
          children: node.children
        }
      },
      labelObj: {
        tabPriTitle: '私海保护期',
        tabTitle: '成单客户保护期',
        addProtect: '新增保护期',
        protectInfo: '开放池客户冻结期（同一销售人员在此期间不得拉回之前属于自己的客户） 0 天 ',
        assumeInfo: '成单客户保护期过期后将自动变为流失客户，届时可在公海拉入。',
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
        labelAddCus: '添加新客户',
        labelAddFollw: '新增跟进记录',
        labelAddRecord: '新增理单记录',
        labelStartTim: '合同签订日期',
        labelEndTim: '合同结束日期',
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
        protectType: 1,
        useDept: '全公司',
        protectDays: '15',
        continueUpdate: '更新保护期'
      }],
      // 成单客户列表数据
      assumeData: [{
        protectType: 1,
        protectDays: '30',
        protectStartTime: 1,
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
        parentName: '',
        protectDays: '',
        continueUpdate: ''
      },
      protectRules: {},
      dialogOrderForm: false,
      orderForm: {
        protectStartTime: 0,
        protectDays: '',
        enableStatus: 0
      },
      orderRules: {}
    }
  },
  mounted() {
    this.getDeptList();
  },
  methods: {
    // 获取列表的数据
    getDeptList() {
      const _this = this;
      departmentGetList().then(response => {
        if (response.data.code === '0') {
          _this.deptData = JSON.parse(JSON.stringify([response.data.data]));
        } else {
          _this.$message.error();
          // 扩展使用
        }
      })
    },
    // 获取移动下拉框的数据
    getSelectList() {
      const _this = this;
      // _this.isLoading = true;
      departmentGetList().then(response => {
        //  _this.isLoading = false;
        if (response.data.code === '0') {
          window.abc = response.data.data;
          _this.deptData = JSON.parse(JSON.stringify([response.data.data]));
        } else {
          // 扩展使用
        }
      })
    },
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
        parentName: '',
        useDept: '',
        protectDays: '',
        continueUpdate: ''
      }
    },
    modifyOrder(records) {
      this.dialogOrderForm = true;
      this.orderForm = {
        protectDays: '30',
        protectStartTime: 1,
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
