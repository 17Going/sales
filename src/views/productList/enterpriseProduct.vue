<template>
  <div class="productCls">
      <div class="contentCls">
        <div class="toolbarCls">
          <div class="demo-input-suffix">
            <el-row>
              <el-col :xs="10" :md="9" :lg="6" :xl="5">
                {{productLabelObj.labelSearchTxt}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model='pName' :placeholder="productLabelObj.labelSearchTxt"></el-input>
               </el-col> 
                <el-col :xs="10" :md="9" :lg="6" :xl="5">
                    {{productLabelObj.labelStateTxt}}&nbsp;&nbsp;&nbsp;&nbsp; <el-select v-model="status" placeholder="请选择">
                      <el-option :label='productLabelObj.txtAll' value='' checked></el-option>
                      <el-option :label='productLabelObj.txtEnable' value='1'></el-option>
                      <el-option :label='productLabelObj.txtDisable' value='0'></el-option> 
                    </el-select>
                </el-col>
                <el-col :xs="4" :md="6" :lg="12" :xl="14">
                  <el-button type="danger" @click="queryMethod()" class="el-icon-search">{{productLabelObj.queryBtnTxt}}</el-button>
                </el-col>
            </el-row>
          </div>
          <div class="newTbarCls">
            <el-button type="danger" @click="addUsersFun()" class="el-icon-plus">{{productLabelObj.addBtnTxt}}</el-button>
          </div>
        </div>
        <div class="tableCls">
            <el-table v-loading="isLoading" :data="tableData" 
                :default-sort = "{prop: 'pName', order: 'descending'}" style="width: 100%" max-height="500" border>
              <!-- 产品名称 -->
              <el-table-column sortable  prop="pName" :label="productLabelObj.pName" >
                <template slot-scope='scope'>
                  <el-button type="text" @click="modifyUserFun(scope.row)">{{scope.row.pName}}</el-button>
                </template>
              </el-table-column>
              <!-- 产品编号 -->
              <el-table-column  prop="pNumber" :label="productLabelObj.pNumber">
                <template slot-scope='scope'>
                  <p>{{scope.row.pNumber}}</p>
                </template>
              </el-table-column>
              <!-- 价格 -->
              <el-table-column  prop="price" :label="productLabelObj.price" >
                <template slot-scope='scope'>
                  <p>{{scope.row.price}}</p>
                </template>
              </el-table-column>
              <!-- 状态 -->
              <el-table-column  prop="status" :label="productLabelObj.status">
                <template slot-scope='scope'>
                  <el-switch
                    v-model='scope.row.status'
                    :active-value='0'
                    :inactive-value='1'
                    active-color="#13ce66"
                    :active-text="productLabelObj.txtEnable"
                    :inactive-text="productLabelObj.txtDisable">
                  </el-switch>
                </template>
              </el-table-column>
              <!-- 操作 -->
              <el-table-column  :label="productLabelObj.operaTxt">
                <template slot-scope='scope'>
                  <el-row class='operaCls' :gutter="20">
                      <el-col :span='24'>
                        <el-button type="text" class="el-icon-edit" @click="modifyUserFun(scope.row)">{{productLabelObj.editBtnTxt}}</el-button>
                      </el-col>
                     <!-- <el-col :span='8'>
                        <el-button type="text">[禁用]</el-button>
                      </el-col>
                      <el-col :span='8'>
                        <el-button type="text">[离职]</el-button>
                      </el-col>-->
                  </el-row>

                </template>
              </el-table-column>

            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>  
        <div class="addWinCls">
            <el-dialog :visible.sync="dialogCfgForm" @open='openCfgWin' @close="closeCfgWin">
                <span slot="title" class="el-dialog__title">{{productLabelObj.cfgTitle}}</span>
                <el-form :model="cfgForm" :rules="cfgRules" ref="cfgForm" label-width="80px" label-position="left">
                
                  <el-row :gutter="20">
                    <el-col :span="11">
                      <el-form-item :label="productLabelObj.pName">
                        <el-input   v-model='cfgForm.pName'></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item :label="productLabelObj.pNumber" >
                        <el-input   v-model='cfgForm.pNumber'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="11" v-if="tableData2.length < 1">
                      <el-form-item :label="productLabelObj.price" >
                        <el-input   v-model='cfgForm.price'></el-input>
                      </el-form-item>
                      </el-col>
                    <el-col :span="11">
                      <el-form-item :label="productLabelObj.status" >
                        <el-select v-model="cfgForm.status">
                          <el-option :label='productLabelObj.txtDisable' :value='0' ></el-option> 
                          <el-option :label='productLabelObj.txtEnable' :value='1' ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                 
                  <div>
                    <div class="ruleToolbarCls">
                      <el-button class="el-icon-plus" type="danger" @click="addRules()">{{productLabelObj.addBtnTxt}}</el-button>
                      <el-button class="el-icon-delete" type="danger" @click="delRules()">{{productLabelObj.delBtnTxt}}</el-button>
                    </div>
                    <div class="tableCls">
                    <el-table ref="multipleTable" v-loading="isLoadingRule" :data="tableData2" @selection-change="handleSelectionChange"
                      :default-sort = "{prop: 'pName', order: 'descending'}" style="width: 100%" max-height="500" border>
                      <!-- checkbox -->
                      <el-table-column type="selection" width="55">
                      </el-table-column>
                      <!-- index -->
                      <el-table-column type="index" width="50" >
                      </el-table-column>
                      <!-- 规格名称 -->
                      <el-table-column sortable  prop="ruleName" :label="productLabelObj.ruleName" >
                        <template slot-scope='scope'>
                          <el-input type="text" v-model="scope.row.ruleName"></el-input>
                        </template>
                      </el-table-column>
                      <!-- 价格 -->
                      <el-table-column  prop="price" :label="productLabelObj.price" >
                        <template slot-scope='scope'>
                          <el-input type="text" v-model="scope.row.price"></el-input>
                        </template>
                      </el-table-column>
                      <!-- 状态 -->
                      <el-table-column  prop="status" :label="productLabelObj.status">
                        <template slot-scope='scope'>
                            <el-switch
                              v-model='scope.row.status'
                              :active-value='0'
                              :inactive-value='1'
                              active-color="#13ce66"
                              :active-text="productLabelObj.activeOnText"
                              :inactive-text="productLabelObj.unActiveText">
                            </el-switch>
                        </template>
                      </el-table-column>
                        <!-- 图片 -->
                      <el-table-column  prop="img" :label="productLabelObj.ruleImg">
                        <template slot-scope='scope'>
                          <img/>
                        </template>
                      </el-table-column>
                      <!-- 操作列 -->
                      <el-table-column  :label="productLabelObj.operaTxt">
                        <template slot-scope='scope'>
                          <el-row class='operaCls' :gutter="20">
                              <el-col :span='24'>
                                <el-button type="primary" size="mini" @click="modifyUserFun(scope.row)">[{{productLabelObj.upBtnTxt}}]<i class="el-icon-upload el-icon--right"></i></el-button>
                              </el-col>
                            <!-- <el-col :span='8'>
                                <el-button type="text">[禁用]</el-button>
                              </el-col>
                              <el-col :span='8'>
                                <el-button type="text">[离职]</el-button>
                              </el-col>-->
                          </el-row>

                        </template>
                      </el-table-column>
                  </el-table>
                  </div>
                 </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="submitUserForm('cfgForm')">{{productLabelObj.labelBtnOK}}</el-button>
                </div>
              </el-dialog>
        </div>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import { userGetList } from '@/api/management'
/* eslint-disable */
import '@/utils/Underscore'

export default {
  name: 'table',
  props: ['depId', 'depName'],
  data() {
    return {
      undistributedCount: 0, /* 不在部门中的员工人数*/
      postsCount: 0, /* 在职人数统计*/
      searchPhoneORname: '', /* 根据姓名或电话查询*/
      userState: '', /* 根据状态查询*/
      ccsStateVal: '',
      currentPage: 1,
      pagesize: 10,
      totalCount: 1,
      timeVal: [new Date(), new Date()], /* 默认当天时间*/
      // 配置窗口的属性值
      dialogCfgForm: false, /* 控制窗口显示/隐藏 */
      /* begin: 查询参数*/
      pName: '',
      status: '',
      /* END: 查询参数*/
      cfgForm: {
        pName: '',
        pNumber: '',
        price: '',
        status: 0
      },
      cfgRules: {
        userName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      tableData2: [],
      isLoadingRule: false,
      productLabelObj: {
        pName: '产品名称',
        pNumber: '产品编号',
        price: '价格',
        status: '启用状态',
        operaTxt: '操作',
        labelSearchTxt: '产品名称',
        labelStateTxt: '启用状态',
        txtAll: '全部',
        txtEnable: '已启用',
        txtDisable: '未启用',
        queryBtnTxt: '立即查询',
        addBtnTxt: '新增',
        editBtnTxt: '修改',
        labelBtnOK: '确定',
        cfgTitle: '新增产品',
        addTitle: '新增产品',
        editTitle: '修改产品',
        delBtnTxt: '删除',
        ruleName: '规则名称',
        ruleImg: '照片',
        upBtnTxt: '上传',
        unActiveText: '关',
        activeOnText: '开'
      },
      isLoading: false,
      tableData: []
    }
  },
  mounted() {
    this.getPagedData();
    // 加载列表的数据
    this.getProRule();
  },
  methods: {
    /* Begin: 分页必备 */
    /* 分页触发*/
    handleSizeChange(val) {
      this.pagesize = val;
      this.getPagedData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPagedData();
    },
    // 获取所有的查询参数，如果有新加的，只需手动添加1个查询属性即可
    getQueryParams(queryObj, key, val) {
      // 定义查询对象，对象有值时对其赋值
      if (val) {
        queryObj[key] = val;
      }
      return queryObj;
    },
    /* 获取列表数据，代表查询*/
    getPagedData() {
      const _this = this;
      var params = {
        pageIndex: _this.currentPage,
        pageSize: _this.pagesize
      }
      let queryObj = {};
      // 根据产品名称进行查询
      queryObj = this.getQueryParams(queryObj, 'PName', this.pName)
      queryObj = this.getQueryParams(queryObj, 'status', this.status)
      if (JSON.stringify(queryObj) !== '{}') {
        params.query = queryObj;
      }
      // _this.isLoading = true;
      _this.tableData = [{
        pName: 'iphone',
        pNumber: 'plus-1000',
        price: '5899',
        status: 0
      }, {
        pName: 'Android',
        pNumber: 'p-1000',
        price: '2999',
        status: 1
      }, {
        pName: '小米',
        pNumber: 'p10',
        price: '1999',
        status: 0
      }, {
        pName: '华为',
        pNumber: 'ry-111',
        price: '999',
        status: 1
      }]
      /* userGetList(params).then(response => {
        _this.isLoading = false;
        if (response.data.code === '0') {
          _this.tableData = response.data.data.list;
          _this.totalCount = response.data.data.totalCount;
          _this.undistributedCount = response.data.data.undistributedCount;
          _this.postsCount = _this.totalCount - _this.undistributedCount;
        } else {
          _this.tableData = [];
          _this.totalCount = 0;
          _this.undistributedCount = 0;
          _this.postsCount = 0;
          _this.$message.error('error');
          // 扩展使用
        }
      }) */
    },
    /* END: 分页必备 */
    // 选中表格某一行时触发
    handleSelectionChange(val) {
      // 扩展代码
    },
    /* 获取产品规则的信息*/
    getProRule() {
      this.tableData2 = [{
        index: 0,
        ruleName: 'mate系列',
        price: '5899',
        status: 0,
        img: ''
      }, {
        index: 1,
        ruleName: 'P系列',
        price: '2999',
        status: 1,
        img: ''
      }, {
        index: 2,
        ruleName: '平板系列',
        price: '1999',
        status: 0,
        img: ''
      }, {
        index: 3,
        ruleName: '畅享系列',
        price: '999',
        status: 1,
        img: ''
      }]
    },
    addUsersFun() {
      this.productLabelObj.cfgTitle = this.productLabelObj.addTitle;
      this.dialogCfgForm = true;
    },
    modifyUserFun(records) {
      this.cfgForm = records;
      this.productLabelObj.cfgTitle = this.productLabelObj.editTitle;
      this.dialogCfgForm = true;
      // 加载列表的数据
      this.getProRule();
    },
    closeCfgWin() {
      this.cfgForm = {
        userName: '',
        phone: '',
        email: '',
        cap: ''
      }
      this.$refs['cfgForm'].resetFields();
      this.getPagedData();
    },
    openCfgWin() {
      // 扩展内容
    },
    submitUserForm() {
      this.dialog = false;
    },
    /* 转换状态 0-禁用 1-启用*/
    getStatus(state) {
      const objState = {
        1: this.productLabelObj.txtEnable,
        0: this.productLabelObj.txtDisable
      }
      return objState[state];
    },
    /* 获取列表数据，代表查询*/
    queryMethod() {
      this.getPagedData();
    },
    // 添加新的产品规则
    addRules() {
      // 扩展代码
    },
    // 删除选中的产品规则
    delRules() {
      // 扩展代码
      const selectRows = this.$refs.multipleTable.store.states.selection;
      // 使用Underscore.js中的方法删除数组
      this.tableData2 = _.without(this.tableData2, ...selectRows);
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .productCls {
    margin: 0px;
    .contentCls{
        border-radius:3px;
        background:rgba(255,255,255,1);
        .tableCls{
          padding: 9px 26px 20px 26px;
          .el-table th{
            background-color: #f7f7f7;
          }
          .el-dialog__header{
            background-color: #f7f7f7;
          }
          .operaCls{
            text-align: center;
            .el-button{
              background-color: #fef9f9;
              border-radius: 3px;
              border: 1px solid #f1afaf;
              color: #e15151;
              padding: 5px 10px;
            }
          }
        }
        .ruleToolbarCls{
           padding:15px 26px 5px 26px;
           .el-button{
              background-color: #fef9f9;
              border-radius: 3px;
              border: 1px solid #f1afaf;
              color: #e15151;
              padding: 5px 10px;
            }
        }
        .toolbarCls{
          padding:15px 26px 5px 26px;
          text-align: left;
          .el-date-editor{
          float: right;
          }
          .el-input{
            width: 210px;
          }
          .newTbarCls{
              margin-top: 15px;
          }
          .el-button{
            background-color: #fef9f9;
            border-radius: 3px;
            border: 1px solid #f1afaf;
            color: #e15151;
            padding: 5px 10px;
            margin-top: 5px;
          }
        }
        .el-cm {
            width: 100%;
            margin-top:10px;
            background:rgba(255,255,255,1);
            font-size:18px;
            font-family:MicrosoftYaHei;
            color:rgba(41,38,38,1);
        }
        .el-pagination{
            text-align: center;
        }
      }
  }
</style>
