<template>
  <div class="postsCls">
      <div class="contentCls">
      <!--
        <div class="mainTopCls">
          <p>{{postsLabelObj.titleTxt}}{{depName}}</p>
        </div>
        -->
        <div class="toolbarCls">
          <div class="demo-input-suffix">
            <el-row class='operaCls' :gutter="20">
                <el-col :span='5'>
                    <el-input v-model="jobName" :placeholder='postsLabelObj.jobName'></el-input>
                </el-col>
                <el-col :span='10'>
                    <el-button class="el-icon-plus" type="danger" @click="addPostsFun()">{{postsLabelObj.addBtnText}}</el-button>
                    <el-button class="el-icon-delete" type="danger" @click="delPostsFun()">{{postsLabelObj.delBtnText}}</el-button>
                </el-col>
            </el-row>
            <!-- 扩展职位可以绑定部门
            <el-row>
                <el-col :span='24'>
                    <el-button type="danger" @click="bindPostsFun()">绑定</el-button>
                </el-col>
            </el-row> -->
          </div>
        </div>

        <div class="tableCls">
            <el-table ref="multipleTable" v-loading="isLoading" :data="postsData" 
                style="width: 100%"  border>
                 <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <!--
              <el-table-column  prop="depName" :label="postsLabelObj.depName" >
                <template slot-scope='scope'>
                  <span type="text">{{scope.row.depName}}</span>
                </template>
              </el-table-column>-->

              <el-table-column prop="jobName" :label="postsLabelObj.jobName">
                <template slot-scope='scope'>
                  <span v-if='!scope.row.editJobName'>
                    <el-button  type="text" @click="modifyPostsFun(scope.row)">{{scope.row.jobName}}</el-button>
                    <!-- <el-button type="text" @click="unbindPosts(scope.row)" title='解除职位与所有部门的绑定'>[解绑职位]</el-button> -->
                   </span>
                   <span v-if='scope.row.editJobName' >
                    <el-input v-model='scope.row.editJobName' ></el-input>
                   </span>
                </template>
              </el-table-column>
              
              <el-table-column  prop="userOpera" :label="postsLabelObj.userOpera" width="160">
                <template slot-scope='scope'>
                  <el-row class='operaCls' :gutter="20">
                    <!-- <el-col :span='12'>
                        <el-button type="text" @click="bindPosts(scope.row)">[绑定部门]</el-button>
                    </el-col> -->
                
                    <el-col :span='24'>
                        <el-button class="el-icon-edit" v-if='!scope.row.editJobName' type="text" @click="modifyPostsFun(scope.row)">{{postsLabelObj.editText}}</el-button>
                        <el-button class="el-icon-check" v-if='scope.row.editJobName' type="text" @click="modifyApply(scope.row)">{{postsLabelObj.confirmText}}</el-button>
                    </el-col>
                </el-row>
                </template>
              </el-table-column>
            </el-table>
        </div>  
        <div>
           <!-- <el-dialog :visible.sync="dialogBindCfgForm" @open='openUserCfgWin' @close="closeUserCfgWin">
                <span slot="title" class="el-dialog__title">{{postsLabelObj.cfgTitle}}</span>
                <el-form  label-width="200px" label-position="top">
                
                    <el-form-item :label="postsLabelObj.labelName" >
                        <treeselect :normalizer="normalizer" :default-expand-level='2'  @focus="getSelectList" v-model="EOSMoveForm.parentName"  :options="deptData" />
                            <label :disabled='true' slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
                              {{ node.depName}} 
                            </label>
                    </el-form-item>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="danger" @click="submitUserForm()">{{usersLabelObj.labelBtnOK}}</el-button>
                    </div>
                </el-form>
            </el-dialog>-->

        </div>
      </div>
  </div>
</template>
<script>
/* eslint-disable */
import '@/utils/Underscore'
// import { userGetAll } from '@/api/management'
export default {
  name: 'table',
  props: ['depId', 'depName'], 
  data() {
    return {
      editJobName: false, // 标记是否存在有编辑的行
      jobName: '', // 新增的职位名称
      dialogBindCfgForm: false, // 绑定部门配置form
      userCompany: '华为公司',
      postsLabelObj: {
        addBtnText: '添加',
        delBtnText: '删除',
        editBtnText: '修改',
        confirmText: '确认修改',
        titleTxt: '当前部门是：',
        depName: '部门',
        jobName: '职位名称',
        userOpera: '操作',
        cfgTitle: '绑定部门',
        labelName: '部门名称'
      },
      isLoading: false,
      postsData: []
    }
  },
  mounted() {
    // 扩展代码
    // this.depName = '唐唐软件公司'
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
    /* 获取列表数据，代表查询*/
    getPagedData() {
      const _this = this;
      /*  var params = {
        pageIndex: _this.currentPage,
        pageSize: _this.pagesize
      }
      if (_this.depId) {
        params.query = {
          depId: _this.depId
        }
      } */
      var response = {};
      response.data = {
        code: '0',
        data: {
          list: [{
            depName: '唐唐软件公司',
            jobName: '董事长'
          }, {
            depName: '唐唐软件公司',
            jobName: '总经理'
          }, {
            depName: '唐唐软件公司',
            jobName: 'CEO'
          }, {
            depName: '唐唐软件公司',
            jobName: 'CTO'
          }]
        }
      }
      _this.isLoading = true;
      /*  userGetAll(params).then(response => { */
      _this.isLoading = false;
      if (response.data.code === '0') {
        _this.postsData = response.data.data.list;
      } else {
        _this.postsData = [];
        _this.$message.error('error');
        // 扩展使用
      }
    //   })
    },
    /* END: 分页必备 */
    addPostsFun() {
      // 扩展代码
      alert('添加接口还没写，输入框输完就成功了，反正我也不新增');
      if(this.editJobName || !this.jobName) return;
      this.editJobName = true; // 证明在编辑状态
      this.postsData.push({
        depName: '',
        editJobName: this.jobName,
        jobName: this.jobName
      })
    },
    bindPostsFun() {
      alert('可以多选几个职位绑定当前的部门。');
    },
    // 解除所有与职位之间有关系的部门
    unbindPosts() {
      alert('确认要解除本职位与所有部门的关系吗？');
      alert('皮一下很开心，接口还没写好呢');
    },
    // 绑定与职位之间的绑定
    bindPosts() {
      alert('绑定是个多对多的关系，还没想好怎么设计呢？');
      this.dialogBindCfgForm = false;
    },
    // 修改职位名称
    modifyPostsFun(records) {
      this.$set(records, 'editJobName', records.jobName)
    },
    modifyApply(records) {
      alert(`您修改的值我已经获取到了，是${records.editJobName},但是我接口没写，是不是很皮啊`);
      this.$set(records, 'editJobName', '')
      this.editJobName = false; // 证明在编辑状态
    },
    openUserCfgWin() {
      // 扩展内容
    },
    submitUserForm() {
      this.dialogBindCfgForm = false;
    },
    delPostsFun() {
      if(this.editJobName || this.postsData.length < 1) return;
      const selectRows = this.$refs.multipleTable.store.states.selection;
      // 使用Underscore.js中的方法删除数组
      this.postsData = _.without(this.postsData, ...selectRows);
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .postsCls{
      margin: 20px;
      .toolbarCls{
        margin-bottom: 10px;
        .el-button{
          background-color: #fef9f9;
          border-radius: 3px;
          border: 1px solid #f1afaf;
          color: #e15151;
          padding: 5px 10px;
          margin-top: 5px;
        }
      }
      .tableCls{
        .operaCls{
          .el-button{
            background-color: #fef9f9;
            border-radius: 3px;
            border: 1px solid #f1afaf;
            color: #e15151;
            padding: 5px 10px;
          }
        }
      }
    }
</style>
