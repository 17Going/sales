<template>
  <div class="usersCls">
      <div class="contentCls">
        <div class="mainTopCls">
          {{userCompany}}在职人员{{totalCount}}人,其中<el-button type="text">未分配部门人员{{noDeUser}}人</el-button>
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
                      <el-option :label='usersLabelObj.txtNormal' value='normal'></el-option>
                      <el-option :label='usersLabelObj.txtDisable' value='disable'></el-option>
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
            
            <el-table v-loading="isLoading" :data="fmData" 
                :default-sort = "{prop: 'userPhone', order: 'descending'}" style="width: 100%" max-height="500" border>

              <el-table-column sortable  prop="userPhone" :label="usersLabelObj.userPhone">
                <template slot-scope='scope'>
                  <p>{{scope.row.userPhone}}</p>
                </template>
              </el-table-column>

              <el-table-column sortable  prop="userName" :label="usersLabelObj.userName" >
                <template slot-scope='scope'>
                  <el-button type="text">{{scope.row.userName}}</el-button>
                </template>
              </el-table-column>

              <el-table-column  prop="userDpm" :label="usersLabelObj.userDpm" >
                <template slot-scope='scope'>
                  <p>{{scope.row.userDpm}}</p>
                </template>
              </el-table-column>

              <el-table-column  prop="userPartTimeDpm" :label="usersLabelObj.userPartTimeDpm" >
                <template slot-scope='scope'>
                  <p>{{scope.row.userPartTimeDpm}}</p>
                </template>
              </el-table-column>

              <el-table-column  prop="userEmail" :label="usersLabelObj.userEmail">
                <template slot-scope='scope'>
                  <p>{{scope.row.userEmail}}</p>
                </template>
              </el-table-column>

              <el-table-column sortable prop="userCapacity" :label="usersLabelObj.userCapacity" >
                <template slot-scope='scope'>
                  <p>{{scope.row.userCapacity}}</p>
                </template>
              </el-table-column>

              <el-table-column  prop="userStatus" :label="usersLabelObj.userStatus">
                <template slot-scope='scope'>
                  <p><el-tag :type="getCSSStatus(scope.row.userStatus)">{{getStatus(scope.row.userStatus)}}</el-tag></p>
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
                    <el-input   v-model='userCfgForm.userPhone'></el-input>
                  </el-form-item>

                  <el-form-item :label="usersLabelObj.labelEmail" >
                    <el-input   v-model='userCfgForm.userEmail'></el-input>
                  </el-form-item>

                  <el-form-item :label="usersLabelObj.labelCapacity" >
                    <el-input  v-model='userCfgForm.userCapacity'></el-input>
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
import axios from 'axios'

export default {
  name: 'table',
  data() {
    return {
      userCompany: '华为公司',
      noDeUser: 0,/*不在部门中的员工人数*/
      searchPhoneORname: '',/*根据姓名或电话查询*/
      userState: '',/*根据状态查询*/
      ccsStateVal: '',
      currentPage: 1,
      pagesize: 10,
      totalCount: 1,
      timeVal: [new Date(),new Date()],/*默认当天时间*/
      //配置窗口的属性值
      dialogUserCfgForm: false,/*控制窗口显示/隐藏 */
      userCfgForm: {
         userName: '',
         userPhone: '',
         userEmail: '',
         userCapacity: ''
      },
      userCfgRules: {
        userName: [{required: true, message: '请输入名称', trigger: 'blur'}]
      },
      usersLabelObj: {
          userPhone: '电话',
          userName: '姓名',
          userDpm: '部门[职位]',
          userPartTimeDpm: '兼职部门[职位]',
          userEmail: '邮箱',
          userCapacity: '客户池容量',
          userStatus: '使用状态',
          userOpera: '操作',
          labelSearchTxt: '电话/姓名',
          labelStateTxt: '状态',
          txtAll: '全部',
          txtNormal: '正常',
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
      isLoading: true,
      fmData: [],
      /*扩展代码*/
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
    }
  },
  mounted(){
     this.getPagedData();
  },
  methods: {
    /*Begin: 分页必备 */
    /*分页触发*/
    handleSizeChange(val){
      this.pagesize = val;
      this.getPagedData();
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getPagedData();
    },
    /*获取列表数据，代表查询*/
    getPagedData(){
        let _this =  this;
        var params = {
            page: _this.currentPage,
            pageSize: _this.pagesize,
            startDate:  _this.getSTime(_this.timeVal[0]),
            endDate: _this.getSTime(_this.timeVal[1])
        }
        _this.isLoading = true;
        var response = {
            code: 0,
            data: {}
        }
       response.data.data = {
            activeStaffCount:0,//在职人数
            undistributedCount:0,//未分配人数
            totalPageNum: 1,// 一共有几页
            totalCount: 5,// 共有多少条记录
            list: [
              {
                userPhone: '13681764137',// 用户手机号码
                userName: '杨向阳1', // 用户名称
                userDpm: '技术部[项目经理]', // 用户部门[职称]
                userPartTimeDpm: '运营部[业务员]',// 兼职部门[职称]
                userEmail: 'yxy@qq.com',// 用户邮箱
                userCapacity: '10',// 客户池容量
                userStatus: 'normal' // 使用状态：normal(正常) disabled(禁用)
              }, {
                userPhone: '13781764137',
                userName: '杨向阳2',
                userDpm: '技术部[项目经理]',
                userPartTimeDpm: '运营部[业务员]',
                userEmail: 'yxy@qq.com',
                userCapacity: '101',
                userStatus: 'disabled'
              }, {
                userPhone: '13881764137',
                userName: '杨向阳3',
                userDpm: '技术部[项目经理]',
                userPartTimeDpm: '运营部[业务员]',
                userEmail: 'yxy@qq.com',
                userCapacity: '102',
                userStatus: 'disabled'
              }, {
                userPhone: '13581764137',
                userName: '杨向阳4',
                userDpm: '技术部[项目经理]',
                userPartTimeDpm: '运营部[业务员]',
                userEmail: 'yxy@qq.com',
                userCapacity: '103',
                userStatus: 'normal'
              }, {
                userPhone: '13581764137',
                userName: '杨向阳5',
                userDpm: '技术部[项目经理]',
                userPartTimeDpm: '运营部[业务员]',
                userEmail: 'yxy@qq.com',
                userCapacity: '105',
                userStatus: 'normal'
              }
            
            ]
          }
        _this.fmData = response.data.data.list;
        _this.totalCount = parseInt(response.data.data.totalCount);
        _this.isLoading = false;
        return;
        axios.get( '/finance/pay/page-list', {params})
            .then(function (response) {
            _this.isLoading = false;
            if (response.data.code === 0) {
                _this.fmData = response.data.data.list;
                _this.totalCount = parseInt(response.data.data.count);
            } else {
                _this.fmData = [];
                _this.totalCount = 1;
                _this.$message.error(response.data.msg)
            }
            })
            .catch(function (response) {
            _this.isLoading = false;
            })
    },
    /*END: 分页必备 */
    addUsersFun(){
        this.usersLabelObj.userCfgTitle = this.usersLabelObj.userAddTitle;
        this.dialogUserCfgForm = true;
    },
    modifyUserFun(records){
      this.userCfgForm = records;
      this.usersLabelObj.userCfgTitle = this.usersLabelObj.userEditTitle;
      this.dialogUserCfgForm = true;
    },
    closeUserCfgWin(){
      this.userCfgForm = {
         userName: '',
         userPhone: '',
         userEmail: '',
         userCapacity: ''
      }
      this.$refs['userCfgForm'].resetFields();
      this.getPagedData();
    },
    openUserCfgWin(){
      console.log('我是最先触发的吧');
    },
    submitUserForm(){
      this.dialogUserCfgForm = false;
    },
    /*转换状态 0-充值中 1-已到账 2-充值失败*/
    getStatus(state){
      let objState = {
        'normal':  this.usersLabelObj.txtNormal,
        'disabled': this.usersLabelObj.txtDisable,
        'cssnormal': 'success',
        'cssdisabled': 'danger'
      }
      // this.ccsStateVal = objState['css'+state];
      return objState[state]; 
    },
    getCSSStatus(state){
       let objCSSState = {
        'normal':  'success',
        'disabled': 'danger'
      }
      return objCSSState[state]; 
    },
    /*转换时间格式*/
    getSTime (sTime) {
      var myDate = new Date(sTime)
      var month = myDate.getMonth() + 1;
      var day = myDate.getDate();
      var date = myDate.getFullYear() + "-" + (month > 9 ? month : '0'+month) + "-" + (day > 9 ? day : '0'+day);
      return date;
    },
    getSTimeDetail (sTime) {
      var minTen = function(val){
          return val > 9 ? val : '0'+val;
      }
      var myDate = new Date(sTime)
      var month = minTen(myDate.getMonth() + 1);
      var day = minTen(myDate.getDate());
      var hour = minTen(myDate.getHours());
      var minutes = minTen(myDate.getMinutes());
      var seconds = minTen(myDate.getSeconds()); 
      usersCls
      var date = myDate.getFullYear() + "-" + month + "-" + day +" "+ hour + ":" + minutes + ":" + seconds;
      return date;
    },
    /*获取列表数据，代表查询*/
    handleClick () {
       this.getPagedData();
    },
    //充值
    moneyFun(){
        this.$router.push('/advHome/recharge');
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
