<template>
  <div class="productCls">
      <div class="contentCls">
        <div class="toolbarCls">
          <div class="demo-input-suffix">
            <el-row>
              <el-col :xs="10" :md="9" :lg="6" :xl="4">
                {{productLabelObj.labelSearchTxt}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model='pName' :placeholder="productLabelObj.labelSearchTxt"></el-input>
               </el-col> 
                <el-col :xs="10" :md="9" :lg="6" :xl="4">
                    {{productLabelObj.labelStateTxt}}&nbsp;&nbsp;&nbsp;&nbsp; <el-select v-model="status" placeholder="请选择">
                      <el-option :label='productLabelObj.txtAll' value='' checked></el-option>
                      <el-option :label='productLabelObj.txtEnable' value='1'></el-option>
                      <el-option :label='productLabelObj.txtDisable' value='0'></el-option> 
                    </el-select>
                </el-col>
                <el-col :xs="4" :md="6" :lg="12" :xl="16">
                  <el-button type="danger" @click="queryMethod()">{{productLabelObj.queryBtnTxt}}</el-button>
                </el-col>
            </el-row>
          </div>
          <div class="newTbarCls">
            <el-button type="danger" @click="addUsersFun()">{{productLabelObj.addBtnTxt}}</el-button>
          </div>
        </div>
        <div class="tableCls">
            
            <el-table v-loading="isLoading" :data="tableData" 
                :default-sort = "{prop: 'pName', order: 'descending'}" style="width: 100%" max-height="500" border>

              <el-table-column sortable  prop="pName" :label="productLabelObj.pName" >
                <template slot-scope='scope'>
                  <el-button type="text" @click="modifyUserFun(scope.row)">{{scope.row.pName}}</el-button>
                </template>
              </el-table-column>

              <el-table-column  prop="pNumber" :label="productLabelObj.pNumber">
                <template slot-scope='scope'>
                  <p>{{scope.row.pNumber}}</p>
                </template>
              </el-table-column>

              <el-table-column  prop="price" :label="productLabelObj.price" >
                <template slot-scope='scope'>
                  <p>{{scope.row.price}}</p>
                </template>
              </el-table-column>

              <el-table-column  prop="status" :label="productLabelObj.status">
                <template slot-scope='scope'>
                  <p>{{getStatus(scope.row.status)}}</p>
                </template>
              </el-table-column>
              
              <el-table-column  :label="productLabelObj.operaTxt">
                <template slot-scope='scope'>
                  <el-row class='operaCls' :gutter="20">
                      <el-col :span='24'>
                        <el-button type="text" @click="modifyUserFun(scope.row)">[修改]</el-button>
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
                <el-form :model="cfgForm" :rules="cfgRules" ref="cfgForm" label-position="top">
                
                  <el-form-item :label="productLabelObj.pName" >
                    <el-input   v-model='cfgForm.pName'></el-input>
                  </el-form-item>

                  <el-form-item :label="productLabelObj.pNumber" >
                    <el-input   v-model='cfgForm.pNumber'></el-input>
                  </el-form-item>

                  <el-form-item :label="productLabelObj.price" >
                    <el-input   v-model='cfgForm.price'></el-input>
                  </el-form-item>

                  <el-form-item :label="productLabelObj.status" >
                    <el-select v-model="cfgForm.status">
                      <el-option :label='productLabelObj.txtDisable' :value='0' ></el-option> 
                      <el-option :label='productLabelObj.txtEnable' :value='1' ></el-option>
                    </el-select>
                  </el-form-item>

                  <div>
                    <p>{{productLabelObj.userCfgInfo}}</p>
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
import { userGetList } from '@/api/management'
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
        addBtnTxt: '新增产品',
        labelBtnOK: '确定',
        cfgTitle: '新增产品',
        addTitle: '新增产品',
        editTitle: '修改产品'
      },
      isLoading: false,
      tableData: []
    }
  },
  mounted() {
    this.getPagedData();
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
    addUsersFun() {
      this.productLabelObj.cfgTitle = this.productLabelObj.addTitle;
      this.dialogCfgForm = true;
    },
    modifyUserFun(records) {
      this.cfgForm = records;
      this.productLabelObj.cfgTitle = this.productLabelObj.editTitle;
      this.dialogCfgForm = true;
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
        }
        .toolbarCls{
          padding:15px 26px 5px 26px;
          text-align: left;
        }
        .toolbarCls .el-date-editor{
          float: right;
        }
        .toolbarCls .el-input{
          width: 210px;
        }
        .toolbarCls .newTbarCls{
            margin-top: 15px;
        }
        .tableCls.el-table th{
          background-color: #f7f7f7;
        }
        .tableCls .el-dialog__header{
          background-color: #f7f7f7;
        }
        .tableCls .operaCls{
          text-align: center;
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
