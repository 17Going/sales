<template>
  <!-- EOS: 企业组织架构  Enterprise organizational structure -->
  <div class="EOSCls">
    <el-container v-loading='isLoading'>
      <el-header>
        <!--企业组织架构-->
      </el-header>
      <el-container>
        <div class='leftCls'>
          <el-aside>
            <el-tree :data="EOSData" node-key="id"
                     default-expand-all :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span @mouseover="asideNodeOver(data)" @mouseout="asideNodeOut(data)">{{ data.depName }}
                          <span v-show="data.isShowOpera">
                            <el-button type="text" v-show="data.isShowOpera" size="mini" @click="addDeptment(data)">[{{EOSLabelObj.btnAddText}}]</el-button>
                            <el-button type="text" v-show="data.parentId !== 0" size="mini" @click="editDeptment(data)">[{{EOSLabelObj.btnEditText}}]</el-button>
                            <el-button type="text" v-show="data.parentId !== 0" size="mini" @click="moveDeptment(data)">[{{EOSLabelObj.btnMoveText}}]</el-button>
                            <el-button type="text" v-show="!data.children" size="mini" @click="delDeptment(data)">[{{EOSLabelObj.btnDelText}}]</el-button>
                          </span>
                        </span>
                    </span>
            </el-tree>
          </el-aside>
        </div>
        <el-main>
          <router-view></router-view>
          <div class='depDailog'>
              <div class='depCls'>
                <el-dialog v-loading='isCfgLoading' :title="titleText" :visible.sync="depDialogVisible" width="30%" @close="handleClose">
                    <hr/>
                    <el-form :rules="EOSRules" ref="EOSForm" :model="EOSForm" label-width="80px">
                      <el-form-item v-show="isShowName" :label="EOSLabelObj.labelParentDept" prop="parentName">
                        <el-input v-show="isShowName" v-model="EOSForm.parentName" disabled></el-input>
                      </el-form-item>
                      <el-form-item :label="EOSLabelObj.labelDepName" prop="deptName">
                        <el-input v-model="EOSForm.deptName"></el-input>
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <hr/>
                      <el-button type="danger" @click="submitForm('EOSForm')">{{EOSLabelObj.labelBtnOK}}</el-button>
                      <el-button type="info" @click="depDialogVisible = false">{{EOSLabelObj.labelBtnCancel}}</el-button>
                    </span>
                  </el-dialog>
              </div>
              <div>

              </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import { departmentCreate, departmentDelte, departmentEdit, departmentGetAll} from '@/api/management'

  export default {
    name: 'documentation',
    mounted () {
      this.getLeftList();
    },
    data () {
      /*校验配置不能为空*/
      var _this = this;
      var checkIsNull = (rule, value, callback) => {
        
        if (!value || value.length < 1) {
          return callback(new Error(_this.EOSLabelObj.validateInfo));
        }
        callback();
      }
      return {
        isLoading: false,
        isCfgLoading: false,
        EOSForm: {},
        EOSRules: {
          deptName: [{validator: checkIsNull, trigger: 'blur'}],
        },
        isShowName: true,
        EOSData: [],
        titleText: '',//新建修改部门的title
        depDialogVisible: false,//控制弹出窗口
        EOSLabelObj: {
          btnAddText: '添加部门',
          btnEditText: '修改部门',
          btnMoveText: '移动部门',
          btnDelText: '删除部门',
          labelBtnOK: '确 定',
          labelBtnCancel: '取 消', 
          labelParentDept: '上级部门',
          labelDepName: '部门名称',
          validateInfo: '此项配置不能为空',
          confirmInfo: '确认删除?',
          confirmTitle: '确认?',
          noCfirmInfo: '已取消删除'
      }
      }
    },
    methods: {
      getLeftList (){
        let _this = this;
        _this.isLoading = true;
        departmentGetAll().then(response => {
             _this.isLoading = false;
            if(response.data.code === "0"){
               _this.EOSData = JSON.parse(JSON.stringify([response.data.data]));
            }else{

            }
        })
      },
      asideNodeOver(obj) {
        this.$set(obj, 'isShowOpera', true)
      },
      asideNodeOut(obj) {
        this.$set(obj, 'isShowOpera', false)
      },
      handleClose() {
        this.EOSForm = {};
        this.$refs['EOSForm'].resetFields();
        this.getLeftList(); 
      },
      // 添加
      addDeptment (obj){
        this.isShowName = true;
        this.$set(this.EOSForm, 'parentId' , obj.id)//新建时，就是当前的ID
        this.$set(this.EOSForm, 'parentName' , obj.depName)
        this.titleText = this.EOSLabelObj.btnAddText;
        this.depDialogVisible = true;
      },
      // 修改
      editDeptment (obj){
        this.isShowName = false;
        this.$set(this.EOSForm, 'deptName' , obj.depName)
        this.$set(this.EOSForm, 'id' , obj.id)
        this.titleText = this.EOSLabelObj.btnEditText;
        this.depDialogVisible = true;
      },
      // 移动
      moveDeptment (obj){
        this.titleText = this.EOSLabelObj.btnMoveText;
      },
      // 删除
      delDeptment (obj){
        let _this = this;
        let params = { 
            id: obj.id
          }
        _this.$confirm(_this.EOSLabelObj.confirmInfo, _this.EOSLabelObj.confirmTitle, {
            confirmButtonText: _this.EOSLabelObj.labelBtnOK,
            cancelButtonText:  _this.EOSLabelObj.labelBtnCancel,
            type: 'info'
          }).then(() => {
             _this.isLoading = true;
            departmentDelte(params).then(response => {
                 _this.isLoading = false;
                if(response.data.code === "0"){
                  _this.$message.success('success') 
                  _this.getLeftList();
                }else{
                  _this.$message.error('error')
                }
            }) 
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: _this.EOSLabelObj.noCfirmInfo
            })
          }
        )
      },
      submitForm (formName){
         var _this = this;
         _this.$refs[formName].validate((valid) => {  
            if(valid){ 
                let params = {
                  depName: _this.EOSForm.deptName
                }
                if(_this.EOSForm.id)
                {
                  params.id =  _this.EOSForm.id;
                  _this.isCfgLoading = true;
                  departmentEdit(params).then(response => {
                    _this.isCfgLoading = false;
                    if(response.data.code === "0"){
                      _this.$message.success('success')
                      _this.depDialogVisible = false;
                      _this.getLeftList();
                    }else{
                      _this.$message.error('error')
                    }
                  })
                }else if(_this.EOSForm.parentId)
                {
                  params.parentId =  Number(_this.EOSForm.parentId);
                  _this.isCfgLoading = true;
                  departmentCreate(params).then(response => {
                    _this.isCfgLoading = false;
                    if(response.data.code === "0"){
                      _this.$message.success('success')
                      _this.depDialogVisible = false;
                      _this.getLeftList();
                    }else{
                      _this.$message.error('error')
                    }
                  })
                }
            } else {

            }
         })
      },
      append(data) {

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .EOSCls {
    margin: 50px;
    .document-btn {
      float: left;
      margin-left: 50px;
      vertical-align: middle;
      display: block;
      cursor: pointer;
      background: black;
      color: white;
      height: 60px;
      width: 200px;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
    }
    .leftCls {
      height: 100%;
      width: 400px;
      border-right: 2px #e5e8ea solid;
    }
    
  }
</style>
