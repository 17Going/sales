<template>
  <div class="usersCls">
      <div class="contentCls">
        <div class="mainTopCls">
          {{depName}}在职人员{{postsCount}}人,其中<el-button type="text">未分配部门人员{{undistributedCount}}人</el-button>
        </div>
        <div class="toolbarCls">
          <div class="demo-input-suffix">
            <el-row>
              <el-col :xs="8" :md="11" :lg="9" :xl="6">
                {{usersLabelObj.labelSearchTxt}}&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model='searchPhoneORname' :placeholder="usersLabelObj.labelSearchTxt"></el-input>
               </el-col> 
                <el-col :xs="8" :md="11" :lg="8" :xl="6">
                    {{usersLabelObj.labelStateTxt}}&nbsp;&nbsp;&nbsp;&nbsp; <el-select v-model="userState" placeholder="请选择">
                      <el-option :label='usersLabelObj.txtAll' value='' checked></el-option>
                      <el-option :label='usersLabelObj.txtNormal' value='0'></el-option>
                      <el-option :label='usersLabelObj.txtDisable' value='2'></el-option>
                      <el-option :label='usersLabelObj.txtDeleted' value='1'></el-option>
                    </el-select>
                </el-col>
                <el-col :xs="8" :md="2" :lg="7" :xl="8">
                  <el-button type="danger" @click="searchUsersFun()">立即查询</el-button>
                </el-col>
            </el-row>
          </div>
          <div class="newTbarCls">
            <el-button type="danger" @click="addUsersFun()">新增用户</el-button>
          </div>
        </div>
        <div class="tableCls">
            
            <el-table v-loading="isLoading" :data="userData" 
                :default-sort = "{prop: 'phone', order: 'descending'}" style="width: 100%" max-height="500" border>

              <el-table-column sortable  prop="phone" :label="usersLabelObj.userPhone">
                <template slot-scope='scope'>
                  <p>{{(scope.row.phone || "")}}</p>
                </template>
              </el-table-column>

              <el-table-column sortable  prop="userName" :label="usersLabelObj.userName" >
                <template slot-scope='scope'>
                  <el-button type="text">{{(scope.row.userName || "")}}</el-button>
                </template>
              </el-table-column>

              <el-table-column  prop="depName" :label="usersLabelObj.userDpm" >
                <template slot-scope='scope'>
                  <p>{{scope.row.depName + (scope.row.jobName ? "[" + scope.row.jobName + "]" : "")}}</p>
                </template>
              </el-table-column>

              <!-- <el-table-column  prop="userPartTimeDpm" :label="usersLabelObj.userPartTimeDpm" >
                <template slot-scope='scope'>
                  <p>{{scope.row.userPartTimeDpm}}</p>
                </template>
              </el-table-column> -->

              <el-table-column  prop="email" :label="usersLabelObj.userEmail">
                <template slot-scope='scope'>
                  <p>{{scope.row.email || ""}}</p>
                </template>
              </el-table-column>

              <el-table-column sortable prop="cap" :label="usersLabelObj.userCapacity" >
                <template slot-scope='scope'>
                  <p>{{scope.row.cap || 0}}</p>
                </template>
              </el-table-column>

              <el-table-column  prop="status" :label="usersLabelObj.userStatus">
                <template slot-scope='scope'>
                  <p><el-tag :type="getCSSStatus(scope.row.status)">{{getStatus(scope.row.status)}}</el-tag></p>
                </template>
              </el-table-column>
              
              <el-table-column  prop="userOpera" :label="usersLabelObj.userOpera" width="160">
                <template slot-scope='scope'>
                  <el-row class='operaCls' :gutter="20">
                      <el-col :span='8'>
                        <el-button type="text" @click="modifyUserFun(scope.row)">{{usersLabelObj.labelBtnEdit}}</el-button>
                      </el-col>
                      <el-col :span='8'>
                        <el-button type="text">{{usersLabelObj.labelBtnDis}}</el-button>
                      </el-col>
                      <el-col :span='8'>
                        <el-button type="text">{{usersLabelObj.labelBtnDel}}</el-button>
                      </el-col>
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
            <el-dialog :visible.sync="dialogUserCfgForm" @open='openUserCfgWin' @close="closeUserCfgWin">
                <span slot="title" class="el-dialog__title">{{usersLabelObj.userCfgTitle}}</span>
                <el-form :model="userCfgForm" :rules="userCfgRules" ref="userCfgForm" label-width="138px" label-position="left">
                
                  <el-form-item :label="usersLabelObj.labelName" >
                    <el-input v-model='userCfgForm.userName'></el-input>
                  </el-form-item>

                   <el-form-item :label="usersLabelObj.labelJob">
                     <el-select class="filter-item" v-model="userCfgForm.jobName" placeholder="Please select" @focus='getJobFun' @change='newJobFun'>
                      <el-option v-for="item in jobData" :key="item.id" :label="item.jobName" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="" v-if="isShowJob">
                    <el-input v-model='userCfgForm.jobNewName'></el-input>
                  </el-form-item>

                  <el-form-item :label="usersLabelObj.labelPhone" >
                    <el-input   v-model='userCfgForm.phone'></el-input>
                  </el-form-item>

                  <el-form-item :label="usersLabelObj.labelEmail" >
                    <el-input   v-model='userCfgForm.email'></el-input>
                  </el-form-item>

                  <el-form-item :label="usersLabelObj.labelCapacity" >
                    <el-input  v-model='userCfgForm.cap'></el-input>
                  </el-form-item>

                  <div>
                    <p>{{usersLabelObj.userCfgInfo}}</p>
                  </div>
                 
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="submitUserForm('userCfgForm')">{{usersLabelObj.labelBtnOK}}</el-button>
                  <el-button type="danger" @click="submitUserForm('userCfgForm')">{{usersLabelObj.labelBtnOK}}</el-button>
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
      // 获取所有的职位
      jobData: [],
      isShowJob: false, // 控制配置职位的显示隐藏
      dialogUserCfgForm: false, /* 控制窗口显示/隐藏 */
      userCfgForm: {
        userName: '',
        phone: '',
        email: '',
        cap: '',
        jobNewName: '',
        jobName: ''
      },
      userCfgRules: {
        userName: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      usersLabelObj: {
        userPhone: '电话',
        userName: '姓名',
        userDpm: '部门[职位]',
        // userPartTimeDpm: '兼职部门[职位]',
        userEmail: '邮箱',
        userCapacity: '客户池容量',
        userStatus: '使用状态',
        userOpera: '操作',
        labelSearchTxt: '电话/姓名',
        labelStateTxt: '状态',
        txtAll: '全部',
        txtNormal: '正常',
        txtDeleted: '已离职',
        txtDisable: '禁用',
        labelBtnOK: '确定',
        labelBtnEdit: '[修改]',
        labelBtnDis: '[禁用]',
        labelBtnDel: '[离职]',
        userCfgTitle: '新增用户',
        userAddTitle: '新增用户',
        userEditTitle: '修改用户',
        labelName: '姓名',
        labelJob: '职位',
        labelPhone: '手机号码',
        labelEmail: '邮箱',
        labelCapacity: '客户池容量',
        userCfgInfo: '注：试用企业最多可添加10个用户，客户池容量最高30，开通正式版可享受更多权益。'
      },
      isLoading: false,
      userData: []
    }
  },
  mounted() {
    // 扩展代码
    // this.getPagedData();
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
    getQueryParams() {
      // 定义查询对象，对象有值时对其赋值
      const query = {
        'depId': '',
        'userName': '',
        'phone': '',
        'status': ''
      }
      // 循环获取值不为空的查询参数
      for (const queryKey in query) {
        if (this[queryKey]) {
          query[queryKey] = this[queryKey];
        } else {
          delete query[queryKey];
        }
      }
      return query;
    },
    /* 获取列表数据，代表查询*/
    getPagedData() {
      const _this = this;
      var params = {
        pageIndex: _this.currentPage,
        pageSize: _this.pagesize
      }
      const queryObj = _this.getQueryParams();
      if (JSON.stringify(queryObj) !== '{}') {
        params.query = JSON.stringify(queryObj);
        console.log(typeof params.query);
      }
      _this.isLoading = true;
      userGetList(params).then(response => {
        _this.isLoading = false;
        if (response.data.code === '0') {
          _this.userData = response.data.data.list;
          _this.totalCount = response.data.data.totalCount;
          _this.undistributedCount = response.data.data.undistributedCount;
          _this.postsCount = _this.totalCount - _this.undistributedCount;
        } else {
          _this.userData = [];
          _this.totalCount = 0;
          _this.undistributedCount = 0;
          _this.postsCount = 0;
          _this.$message.error('error');
          // 扩展使用
        }
      })
    },
    /* END: 分页必备 */
    // 获取所有职位的取数方法
    getJobFun() {
      // 等待取数归位
      if (this.isFrist) {
        this.jobData = [{
          id: 1,
          jobName: '董事长'
        }, {
          id: 2,
          jobName: 'CTO'
        }, {
          id: 3,
          jobName: 'CEO'
        }, {
          id: 4,
          jobName: '部门经理'
        }, {
          id: 5,
          jobName: '组长'
        }];
        this.jobData.unshift({
          id: '-1',
          jobName: '-- 新建职位 --'
        });
        this.jobData.unshift({
          id: '',
          jobName: '-- NONE --'
        });
        this.isFrist = false;
      }
    },
    // 新建职位接口
    newJobFun(item) {
      const val = item.id;
      if (val === '') {
        this.isShowJob = false;
      } else {
        this.isShowJob = true;
        if (val === '-1') {
          this.userCfgForm.jobName = '-- 新建职位 --';
          this.userCfgForm.jobNewName = '';
        } else {
          this.userCfgForm.jobName = item.jobName;
          this.userCfgForm.jobNewName = item.jobName;
        }
      }
    },
    addUsersFun() {
      this.usersLabelObj.userCfgTitle = this.usersLabelObj.userAddTitle;
      this.dialogUserCfgForm = true;
      this.isFrist = true;
    },
    modifyUserFun(records) {
      this.userCfgForm = records;
      this.usersLabelObj.userCfgTitle = this.usersLabelObj.userEditTitle;
      this.dialogUserCfgForm = true;
      this.isFrist = true;
    },
    closeUserCfgWin() {
      this.userCfgForm = {
        userName: '',
        phone: '',
        email: '',
        cap: '',
        jobNewName: '',
        jobName: ''
      }
      this.jobData = [];
      this.$refs['userCfgForm'].resetFields();
      this.getPagedData();
    },
    openUserCfgWin() {
      // 扩展内容
    },
    submitUserForm() {
      this.dialogUserCfgForm = false;
    },
    /* 转换状态 0-正常 1-删除 2-禁用*/
    getStatus(state) {
      const objState = {
        0: this.usersLabelObj.txtNormal,
        1: this.usersLabelObj.txtDeleted,
        2: this.usersLabelObj.txtDisable
      }
      // this.ccsStateVal = objState['css'+state];
      return objState[state];
    },
    getCSSStatus(state) {
      const objCSSState = {
        0: 'success',
        1: 'info',
        2: 'danger'
      }
      return objCSSState[state];
    },
    /* 获取列表数据，代表查询*/
    searchUsersFun() {
      this.getPagedData();
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .usersCls {
   .mainTopCls{
      margin-left: 26px;
    }
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
        }
      }
      .toolbarCls{
        padding:15px 26px 5px 26px;
        text-align: left;
        .el-input{
          width: 210px;
        }
        .newTbarCls{
            margin-top: 15px;
        }
        .el-date-editor{
          float: right;
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
      .addWinCls{
        .el-select{
          width: 100%;
        }
      }
    }
  }
</style>
