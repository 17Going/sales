<template>
  <div class="usersCls">
      <div class="contentCls">
        <div class="mainTopCls">
          {{userCompany}}在职人员{{postsCount}}人,其中<el-button type="text">未分配部门人员{{undistributedCount}}人</el-button>
          <p @upDepId='loadUser(id)' v-if=false></p>
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
                  <p>{{scope.row.phone}}</p>
                </template>
              </el-table-column>

              <el-table-column sortable  prop="userName" :label="usersLabelObj.userName" >
                <template slot-scope='scope'>
                  <el-button type="text">{{scope.row.userName}}</el-button>
                </template>
              </el-table-column>

              <el-table-column  prop="depName" :label="usersLabelObj.userDpm" >
                <template slot-scope='scope'>
                  <p>{{scope.row.depName+"["+scope.row.jobName+"]"}}</p>
                </template>
              </el-table-column>

              <!-- <el-table-column  prop="userPartTimeDpm" :label="usersLabelObj.userPartTimeDpm" >
                <template slot-scope='scope'>
                  <p>{{scope.row.userPartTimeDpm}}</p>
                </template>
              </el-table-column> -->

              <el-table-column  prop="email" :label="usersLabelObj.userEmail">
                <template slot-scope='scope'>
                  <p>{{scope.row.email}}</p>
                </template>
              </el-table-column>

              <el-table-column sortable prop="cap" :label="usersLabelObj.userCapacity" >
                <template slot-scope='scope'>
                  <p>{{scope.row.cap}}</p>
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
                        <el-button type="text" @click="modifyUserFun(scope.row)">[修改]</el-button>
                      </el-col>
                      <el-col :span='8'>
                        <el-button type="text">[禁用]</el-button>
                      </el-col>
                      <el-col :span='8'>
                        <el-button type="text">[离职]</el-button>
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
                <el-form :model="userCfgForm" :rules="userCfgRules" ref="userCfgForm" label-width="200px" label-position="top">
                
                  <el-form-item :label="usersLabelObj.labelName" >
                    <el-input   v-model='userCfgForm.userName'></el-input>
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
                </div>
              </el-dialog>
        </div>
      </div>
  </div>
</template>
<script>
import { userGetAll } from '@/api/management'
export default {
  name: 'table',
  props: ['depId'],
  data() {
    return {
      userCompany: '华为公司',
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
      dialogUserCfgForm: false, /* 控制窗口显示/隐藏 */
      userCfgForm: {
        userName: '',
        userPhone: '',
        userEmail: '',
        userCapacity: ''
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
        userCfgTitle: '新增用户',
        userAddTitle: '新增用户',
        userEditTitle: '修改用户',
        labelName: '姓名',
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
    /* 获取列表数据，代表查询*/
    getPagedData() {
      const _this = this;
      var params = {
        pageIndex: _this.currentPage,
        pageSize: _this.pagesize
      }
      if (_this.depId) {
        params.query = {
          depId: _this.depId
        }
      }
      console.log(params);
      _this.isLoading = true;
      userGetAll(params).then(response => {
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
    addUsersFun() {
      this.usersLabelObj.userCfgTitle = this.usersLabelObj.userAddTitle;
      this.dialogUserCfgForm = true;
    },
    modifyUserFun(records) {
      this.userCfgForm = records;
      this.usersLabelObj.userCfgTitle = this.usersLabelObj.userEditTitle;
      this.dialogUserCfgForm = true;
    },
    closeUserCfgWin() {
      this.userCfgForm = {
        userName: '',
        phone: '',
        email: '',
        cap: ''
      }
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
<style>
  .usersCls {
   
  }
  .usersCls .mainTopCls{
    margin-left: 26px;
  }
  .usersCls .contentCls{
      border-radius:3px;
      background:rgba(255,255,255,1);
    }
   
  .usersCls .contentCls  .tableCls{
    padding: 9px 26px 20px 26px;
  }
  .usersCls .contentCls .toolbarCls{
     padding:15px 26px 5px 26px;
     text-align: left;
  }
  .usersCls .contentCls .toolbarCls .el-input{
     width: 210px;
  }
  .usersCls .contentCls .toolbarCls .newTbarCls{
      margin-top: 15px;
  }
  .usersCls .contentCls .tableCls.el-table th{
    background-color: #f7f7f7;
  }
  .usersCls .contentCls .tableCls .el-dialog__header{
    background-color: #f7f7f7;
  }
  .usersCls .contentCls .tableCls .operaCls{
    text-align: center;
  }
  .usersCls .toolbarCls .el-date-editor{
    float: right;
  }
 
  .usersCls .contentCls .el-cm {
      width: 100%;
      margin-top:10px;
      background:rgba(255,255,255,1);
      font-size:18px;
      font-family:MicrosoftYaHei;
      color:rgba(41,38,38,1);
  }
 
  .usersCls .contentCls .el-pagination{
      text-align: center;
  }
</style>
