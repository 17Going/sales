<template>
  <!-- EOS: 企业组织架构  Enterprise organizational structure -->
  <div class="EOSCls">
    <el-container v-loading='isLoading'>
      <!-- <el-header>
        企业组织架构
      </el-header> -->
      <el-container>
        <div class='leftCls'>
          <el-aside ref='selectAside'>
            <el-tree :data="EOSData" node-key="id"
                     default-expand-all :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }"  @mouseleave="asideNodeOut(data)">
                     <!-- <span >
                          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                          class='divFloatCls'
                        </span>
                         @mouseover="asideNodeOver(data)" @mouseout="asideNodeOut(data)" -->
                         <span :title="data.depName" trigger="hover" @mouseover="asideNodeOver($event, data)" @click='handleClick(data)'>{{getDeptName(data.depName)}}</span>
                          <span class='divFloatCls' v-bind:style="positionCls" v-show="data.isShowOpera" :ref="data.id" >
                            <ul>
                              <li ><el-button type="text"  size="mini" @click="addDeptment(data)">[{{EOSLabelObj.btnAddText}}]</el-button></li>
                              <li v-if="data.parentId !== 0"><el-button type="text"  size="mini" @click="editDeptment(data)">[{{EOSLabelObj.btnEditText}}]</el-button></li>
                              <li v-if="data.parentId !== 0"><el-button type="text"  size="mini" @click="moveDeptment(data)">[{{EOSLabelObj.btnMoveText}}]</el-button></li>
                              <li v-if="!data.children"><el-button type="text" size="mini" @click="delDeptment(data)">[{{EOSLabelObj.btnDelText}}]</el-button></li>
                            </ul>
                          </span>
                   
                     
                     <!-- <el-dropdown> 
                        <span class="el-dropdown-link" :title="data.depName" trigger="hover" @click='handleClick(data)'>{{getDeptName(data.depName)}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><el-button type="text"  size="mini" @click="addDeptment(data)">[{{EOSLabelObj.btnAddText}}]</el-button></el-dropdown-item>
                            <el-dropdown-item v-if="data.parentId !== 0"><el-button type="text"  size="mini" @click="editDeptment(data)">[{{EOSLabelObj.btnEditText}}]</el-button></el-dropdown-item>
                            <el-dropdown-item v-if="data.parentId !== 0"><el-button type="text"  size="mini" @click="moveDeptment(data)">[{{EOSLabelObj.btnMoveText}}]</el-button></el-dropdown-item>
                            <el-dropdown-item v-if="!data.children"><el-button type="text" size="mini" @click="delDeptment(data)">[{{EOSLabelObj.btnDelText}}]</el-button></el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>-->
                    </span>
            </el-tree>
          </el-aside>
        </div>
        <el-main>
          <div>
            <enterprise-user :depId='depId' :depName='depName' ref="selectUser"></enterprise-user>
            <!-- <el-tabs v-model="activeName" type="card" >
                <el-tab-pane label="配置用户" name="userTab">
                  <enterprise-user :depId='depId' :depName='depName' ref="selectUser"></enterprise-user>
                </el-tab-pane>
                <el-tab-pane label="配置职位" name="postsTab">
                  <corporatePosts :depId='depId' :depName='depName' ref="selectPosts"></corporatePosts>
                </el-tab-pane>
              </el-tabs>-->
          </div>
          <div class='depDailog'>
              <div class='depCfgCls'>
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
              <div class='depMoveCls'>
                  <el-dialog :close-on-click-modal="false" v-loading='isCfgLoading' :title="titleText" :visible.sync="moveDialogVisible" width="30%" height='40%' @close="moveWinClose">
                    <hr/>
                    <el-form  ref="EOSMoveForm" :model="EOSMoveForm" label-width="80px">
                      <el-form-item :label="EOSLabelObj.labelDepName" prop="deptName">
                        {{EOSMoveForm.deptName}}
                      </el-form-item>
                      <el-form-item  :label="EOSLabelObj.labelParentDept">
                        <treeselect :normalizer="normalizer" :default-expand-level='2'  @focus="getSelectList" v-model="EOSMoveForm.parentName"  :options="deptData" />
                            <label :disabled='true' slot="option-label" slot-scope="{ node, shouldShowCount, count, labelClassName, countClassName }" :class="labelClassName">
                              {{ node.depName}} 
                            </label>
                       <!--  <el-select v-model="EOSMoveForm.deptName" placeholder="请选择" @focus="getSelectList" >
                          <el-option 
                            v-for="item in deptData"
                            :key="item.depName"EOSMoveForm.deptName
                            :label="item.depName"
                            :value="item.depName"
                            :disabled="item.depName == EOSMoveForm.deptName"> 
                              <el-tree width='300px' height="250px" :data="EOSData" node-key="id"  default-expand-all :expand-on-click-node="false">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span >{{ data.depName }}</span>
                                </span>
                                </el-tree>
                          </el-option>
                        </el-select>
                         <el-tree :data="EOSData" node-key="id" :expand-on-click-node="false">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span disabled>{{ data.depName }}</span>
                                </span>
                                </el-tree>-->
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <hr/>
                      <el-button type="danger" @click="submitMoveForm('EOSMoveForm')">{{EOSLabelObj.labelBtnOK}}</el-button>
                      <el-button type="info" @click="moveDialogVisible = false">{{EOSLabelObj.labelBtnCancel}}</el-button>
                    </span>
                  </el-dialog>
              </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <div id='floatDept'>

    </div>
  </div>
</template>
<script>
  import { departmentCreate, departmentDelte, departmentEdit, departmentGetList } from '@/api/management'
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  import enterpriseUser from '@/views/management/enterpriseUser'
  import corporatePosts from '@/views/management/corporatePosts'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  export default {
    name: 'documentation',
    components: { Treeselect, enterpriseUser, corporatePosts },
    mounted() {
      this.getLeftList();
    },
    data() {
      /* 校验配置不能为空*/
      var _this = this;
      var checkIsNull = (rule, value, callback) => {
        if (!value || value.length < 1) {
          return callback(new Error(_this.EOSLabelObj.validateInfo));
        }
        callback();
      }
      return {
        activeName: 'userTab',
        depId: '', // 用于传值(用户或者职位)
        depName: '', // 用于传值(用户或者职位)
        isLoading: false,
        isCfgLoading: false,
        EOSForm: {},
        EOSRules: {
          deptName: [{ validator: checkIsNull, trigger: 'blur' }]
        },
        EOSMoveForm: {}, // 移动窗口form赋值
        isShowName: true,
        EOSData: [], // 获取企业用户左树结构的数据
        deptData: [], // 获取企业用户下拉结构的数据
        normalizer(node) {
          return {
            id: node.id,
            label: node.depName,
            children: node.children,
            isDisabled: (node.depName === _this.EOSMoveForm.deptName)
          }
        },
        titleText: '', // 新建修改部门的title
        depDialogVisible: false, // 控制弹出配置窗口
        moveDialogVisible: false, // 控制移动窗口
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
        },
        userLeft: '0px',
        positionCls: {
          position: 'absolute',
          'z-index': '9999',
          padding: '0px 10px',
          border: '0px',
          'background-color': '#fff',
          '-moz-box-shadow': '2px 2px 5px #333333',
          '-webkit-box-shadow': '2px 2px 5px #333333',
          'box-shadow': '2px 2px 5px #333333'
        }
      }
    },
    /* computed: {
      getPositionCls: function() {
        return this.positionCls;
      }
    },*/
    methods: {
      getPositionCls: function() {
        return this.positionCls;
      },
      // 获取列表的数据
      getLeftList() {
        const _this = this;
        _this.isLoading = true;
        departmentGetList().then(response => {
          _this.isLoading = false;
          if (response.data.code === '0') {
            _this.EOSData = JSON.parse(JSON.stringify([response.data.data]));
            _this.$set(_this.EOSMoveForm, 'parentName', response.data.data.depName);
            var selectStr = JSON.stringify([response.data.data])
            _this.deptData = JSON.parse(selectStr);
            /** 触发子类的加载 */
            this.depId = response.data.data.id;
            this.depName = response.data.data.depName;
            this.$refs.selectUser.getPagedData();
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
      // 处理名称过长情况
      getDeptName(name) {
        return name;
        // return name.length > 20 ? name.substr(0, 20) + '...' : name;
      },
      getDivPosition(event, obj) {
        // console.log(`event.x===${event.x}`, `event.y===${event.y}`);
        // console.log(`event.target.offsetLeft===${event.target.offsetLeft}`, `event.target.offsetWidth===${event.target.offsetWidth}`, `event.target.offsetTop===${event.target.offsetTop}`, event.target.offsetBottom);
        // console.log(`event.clientX===${event.clientX}`, `event.clientY===${event.clientY}`);
        // console.log(`event.screenX===${event.screenX}`, `event.screenY===${event.screenY}`);
        // 获取当前悬浮层的宽、高 现在没有办法动态获取悬浮层的宽，高
        const divWidth = 100;
        let divHeight = 30;
        if (obj.parentId !== 0) {
          if (!obj.children) {
            divHeight = 114;
          } else {
            divHeight = 86;
          }
        }
        // console.log(this.$refs[obj.id].offsetWidth, this.$refs[obj.id].offsetHeight, 'addddd--------');
        // 获取左树的宽度
        const leftWidth = Number(this.$refs.selectAside.width.replace('px', ''));
        // 获取当前窗口的高度
        const screenY = document.documentElement.clientHeight;
        // 如果存在左右都不够显示悬浮层，碰巧下面也不够显示，这时不需要 +18
        let isAdd = true;
        // 获取当前元素的左边距
        const leftPx = event.target.offsetLeft;
        // 获取悬浮层的x轴坐标，等于当前元素的（左边距 + 宽度）
        let x = event.target.offsetLeft + event.target.offsetWidth;
        // 获取当前元素的实际高度
        let y = event.target.offsetTop;
        // 如果悬浮层在右边距放不下，就放到左边距
        if ((x + divWidth) > leftWidth) {
          // 如果左边距，放不下悬浮层，就放在当前元素的下面，top下移当前元素高度
          if (divWidth > leftPx) {
            x = leftWidth - divWidth - 30;
            y = y + 18;
            isAdd = false;
          } else {
            // 给悬浮层留一个边距
            x = leftPx - 5;
          }
        } else {
          // 给悬浮层留一个边距
          x = x + 5;
          // 正常情况不用做处理
        }
        // 计算悬浮层y轴的坐标;
        y = (event.clientY + divHeight - screenY) > 0 ? y - divHeight + (isAdd ? 18 : 0) : y;
        // console.log(x, y, '***********' + screenY);
        /** 如果左边距也不够显示，放在当前元素左边距加宽度的中间，top下移元素的高度
        *  先作为扩展内容，先不实现了 */
        return { left: x + 'px', top: y + 'px' };
      },
      asideNodeOver(ev, obj) {
        this.$set(obj, 'isShowOpera', true);
        var event = ev || window.event;
        if (event) {
          const positionObj = this.getDivPosition(event, obj);
          this.positionCls = Object.assign({}, this.positionCls, positionObj);
        }
        console.log(this.positionCls.left, this.positionCls.top);
      },
      asideNodeOut(obj) {
        /* if (window.t != null) {
          clearTimeout(window.t);
        }
        window.t = null; */
        this.$set(obj, 'isShowOpera', false)
      },
      // 配置窗口关闭
      handleClose() {
        this.EOSForm = {};
        this.$refs['EOSForm'].resetFields();
        this.getLeftList();
      },
      // 移动窗口关闭
      moveWinClose() {
        this.EOSMoveForm = {};
        this.$refs['EOSMoveForm'].resetFields();
        this.getLeftList();
      },
      // 添加
      addDeptment(obj) {
        this.isShowName = true;
        this.$set(this.EOSForm, 'parentId', obj.id); // 新建时，就是当前的ID
        this.$set(this.EOSForm, 'parentName', obj.depName)
        this.titleText = this.EOSLabelObj.btnAddText;
        this.depDialogVisible = true;
      },
      // 修改
      editDeptment(obj) {
        this.isShowName = false;
        this.$set(this.EOSForm, 'deptName', obj.depName)
        this.$set(this.EOSForm, 'id', obj.id)
        this.titleText = this.EOSLabelObj.btnEditText;
        this.depDialogVisible = true;
      },
      // 移动：先删除，再新建
      moveDeptment(obj) {
        this.titleText = this.EOSLabelObj.btnMoveText;
        this.$set(this.EOSMoveForm, 'deptName', obj.depName);
        this.$set(this.EOSMoveForm, 'id', obj.id)// 为删除移动的节点做准备
        this.moveDialogVisible = true;
      },
      // 删除
      delDeptment(obj) {
        const _this = this;
        const params = {
          id: obj.id
        }
        _this.$confirm(_this.EOSLabelObj.confirmInfo, _this.EOSLabelObj.confirmTitle, {
          confirmButtonText: _this.EOSLabelObj.labelBtnOK,
          cancelButtonText: _this.EOSLabelObj.labelBtnCancel,
          type: 'info'
        }).then(() => {
          _this.isLoading = true;
          departmentDelte(params).then(response => {
            _this.isLoading = false;
            if (response.data.code === '0') {
              _this.$message.success('success');
              _this.getLeftList();
            } else {
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
      submitForm(formName) {
        var _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = {
              depName: _this.EOSForm.deptName
            }
            if (_this.EOSForm.id) {
              params.id = _this.EOSForm.id;
              _this.isCfgLoading = true;
              departmentEdit(params).then(response => {
                _this.isCfgLoading = false;
                if (response.data.code === '0') {
                  _this.$message.success('success')
                  _this.depDialogVisible = false;
                  _this.getLeftList();
                } else {
                  _this.$message.error('error')
                }
              })
            } else if (_this.EOSForm.parentId) {
              params.parentId = Number(_this.EOSForm.parentId);
              _this.isCfgLoading = true;
              departmentCreate(params).then(response => {
                _this.isCfgLoading = false;
                if (response.data.code === '0') {
                  _this.$message.success('success')
                  _this.depDialogVisible = false;
                  _this.getLeftList();
                } else {
                  _this.$message.error('error');
                }
              })
            }
          } else {
            // 扩展代码
          }
        })
      },
      // 移动逻辑下发
      submitMoveForm() {
        const _this = this;
        // 移动的参数
        const params = {
          id: _this.EOSMoveForm.id,
          depName: _this.EOSMoveForm.deptName,
          parentId: Number(_this.EOSMoveForm.parentName)// 父类的ID
        }
        departmentEdit(params).then(response => {
          _this.isCfgLoading = false;
          if (response.data.code === '0') {
            _this.$message.success('success')
            _this.moveDialogVisible = false;
          } else {
            _this.$message.error('error');
          }
        })
      },
      /** 触发子类传值 */
      handleClick(data) {
        this.depId = data.id; // 向子类传入父类ID
        this.depName = data.depName; // 向子类传入父类名称
        this.$refs.selectUser.getPagedData(); // 刷新用户数据
        this.$refs.selectPosts.getPagedData(); // 刷新职位信息
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .EOSCls {
    margin: 20px;
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
      width: 20%;
      height: 100%;
      border-right: 2px #e5e8ea solid;
      overflow-y: auto;
      overflow-x: auto;
      .el-aside {
        width:100%;
        height: 100%;
      }
      .custom-tree-node{
        width: 100%;
      }
      .el-tree>.el-tree-node{
        min-width:100%;
        display: inline-block !important;
      }     
    }
    .el-main{
      padding-top: 0px;
    }
    .el-scrollbar{
      width: 50%;
      height: 250px;
    }
    .el-scrollbar__view .el-select-dropdown__list{
      height: 250px;
    }
    .el-dropdown{
      width: 200px;
    }
    .el-tree-node__content .is-active{
       font-size: 16px;
    }
    .el-tree-node__content:hover{
      font-size: 16px;
    }
    .divFloatCls{
      ul { 
        margin: 1px;
        padding: 0px;
      }
      li {
        list-style-type:none;
      }
    }
    
  }
</style>
