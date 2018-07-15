<template>
  <div class="app-container">
      <div class="filter-container">
        <el-input class="filter-item" style="width:200px;" @keyup.enter.native="privateSerFilter" placeholder="请输入客户区域/客户名称">
        </el-input>
        <el-button type="primary" icon="el-icon-search" class="filter-item">{{$t('table.search')}}</el-button>
      </div>
      <el-table :data="tableData4" style="width: 100%;font-size:10px;" max-height="1000" border="true">
        <el-table-column align="center" type="selection"width="55" label="全选">

        </el-table-column>

        <el-table-column align="center" sortable fixed prop="cusname" label="客户名称" width="120"> 

        </el-table-column>

        <el-table-column align="center" sortable fixed prop="cuspoolTime" label="进入客户池时间" width="150"> </el-table-column>
        <el-table-column align="center" sortable fixed prop="protectTime" label="剩余保护天数" width="120"> </el-table-column>
        <el-table-column align="center" prop="recentIn" label="最近跟进" width="350"> </el-table-column>
        <el-table-column align="center" prop="nextIn" label="下次跟进" width="250"> </el-table-column>
        <el-table-column align="center" prop="legalPerson" label="法人姓名" width="100"> </el-table-column>
        <el-table-column align="center" prop="registered" label="注册资本" width="100"> </el-table-column>
        <el-table-column align="center" prop="Industry" label="所属行业" width="100"> </el-table-column>
        <el-table-column align="center" prop="cusFrom" label="客户来源" width="100"> </el-table-column>
        <el-table-column align="center" prop="location" label="所属区域" width="100"> </el-table-column>
        <!-- 电话跟进表 -->
        <el-table-column align="center"  label="电话跟进" width="100"> 
          <template scope="scope">
            <div style="display:inline-flex">
              <div style="margin-right:10px;color:blue;font-size:15px;">
                <a href="">{{scope.row.telephoneIn}}</a>
              </div>
              <el-button type="danger" size="mini" @click="telephoneInVisableFn" icon="el-icon-edit" style="padding:5px 8px 5px 8px;">录入</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="seeIn" label="拜访跟进" width="100"> 
          <template scope="scope">
            <div style="display:inline-flex">
              <div style="margin-right:10px;color:blue;font-size:15px;">
                <a href="">{{scope.row.telephoneIn}}</a>
              </div>
              <el-button type="danger" size="mini" icon="el-icon-edit" style="padding:5px 8px 5px 8px;">录入</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="bookIn" label="理单跟进" width="100"> </el-table-column>
        <el-table-column align="center" prop="PersonalRate" label="个人评级" width="70"> </el-table-column>
        <el-table-column align="center" prop="managerRate" label="经理评级" width="70"> </el-table-column>
        <el-table-column align="center" prop="businessGuidance" label="业务指导" width="100"> </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="danger" size="mini"
            style="padding:7px 5px 7px 5px;"
            >
              扔进公海
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="danger" size="mini"
            style="padding:7px 5px 7px 5px;">
              转交
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="danger" size="mini"
            style="padding:7px 5px 7px 5px;">
              加入理单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="filter-container">
        <el-button type="danger"  class="filter-item">批量仍到公海</el-button>
        <el-button type="danger"  class="filter-item">批量转交</el-button>
      </div>
      <!-- 电话跟进弹出面板 -->
      <el-dialog title="电话跟进记录" :visible.sync="telephoneInVisable">
          <template slot-scope="scope">
            <el-form :model="telephoneInForm" :rules="telephoneInRules" ref="telephoneInForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="客户名称" prop="username">
                <el-input v-model="telephoneInForm.username"></el-input>
              </el-form-item>
              <el-form-item label="联系人" prop="person">
                <el-input v-model="telephoneInForm.person"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-input v-model="telephoneInForm.sex"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="level">
                <el-input v-model="telephoneInForm.level"></el-input>
              </el-form-item>
              <el-form-item label="致电时间" prop="telephoneInTime">
                  <el-date-picker
                    v-model="telephoneInForm.telephoneInTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="致电时长" prop="longtime">
                <el-input v-model="telephoneInForm.longtime"></el-input>
              </el-form-item>
              <el-form-item label="联系情况" prop="connectInfo">
                <el-input v-model="telephoneInForm.connectInfo"></el-input>
              </el-form-item>
              <el-form-item label="下次联系时间" prop="nextIntime">
                <el-input v-model="telephoneInForm.nextIntime"></el-input>
              </el-form-item>
              <el-form-item label="电话纪要" prop="telephoneConntent">
                <el-input v-model="telephoneInForm.telephoneConntent"></el-input>
              </el-form-item>
              <el-form-item style="margin-left:655px;">
                  <el-button type="primary" @click="submitForm('telephoneInForm')">确定</el-button>
                  <el-button @click="telephoneInVisable = false">取消</el-button>
              </el-form-item>
            </el-form>
          </template>  
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="telephoneInVisable = false">取 消</el-button>
          <el-button type="primary" @click="telephoneInVisable = false">确 定</el-button>
        </div> -->
      </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'tinymce-demo',
  components: { },
  data() {
    return {
       telephoneInForm: {
          username: " ",
          person:" ",
          sex :" ",
          level:"",
          time:"",
          telephoneInTime:"",//录入电话时间
          longtime:"",
          connectInfo: "",
          nextIntime: "",
          telephoneConntent:""
       },//电话录入数据
       telephoneInRules:{
          username: [
            { required: true, message: '请输入客户名称', trigger: 'blur' }
          ],
          person: [
            { required: true, message: '请输入联系人', trigger: 'blur'  }
          ],
          time: [
            { required: true, message: '请选择致电时间', trigger: 'blur'}
          ],
          connectInfo :[
             { required: true, message: '请选择联系情况', trigger: 'blur'}
          ],
          telephoneConntent :[

          ]
       },
       telephoneInVisable:false,
       formLabelWidth:"30px;",
       tableData4: [{
          cusname: '华为技术有限公司',
          cuspoolTime: '2018-06-06',
          protectTime: 34,
          recentIn: '电话跟进 | 刘强管理员 | 2018-06-17 23:24:18 | 约到负责人',
          nextIn: '电话跟进 | 刘强管理员 | 2018-06-29',
          legalPerson: '李四2',
          registered:'33333',
          Industry:'医药医疗',
          cusFrom:'业务开发',
          location:'安徽-合肥',
          telephoneIn:'1',
          seeIn:'0',
          bookIn:'待理单',
          PersonalRate:'A',
          businessGuidance:''
        }, {
          cusname: '阿里巴巴',
          cuspoolTime: '2018-06-07',
          protectTime: 4,
          recentIn: '电话跟进 | 刘强管理员 | 2018-06-17 23:24:18 | 约到负责人',
          nextIn: '电话跟进 | 刘强管理员 | 2018-06-29',
          legalPerson: '李四2',
          registered:'33333',
          Industry:'医药医疗',
          cusFrom:'业务开发',
          location:'安徽-合肥',
          telephoneIn:'1',
          seeIn:'0',
          bookIn:'待理单',
          PersonalRate:'A',
          businessGuidance:''
        }, {
          cusname: '华为技术有限公司',
          cuspoolTime: '2018-06-08',
          protectTime: 5,
          recentIn: '电话跟进 | 刘强管理员 | 2018-06-17 23:24:18 | 约到负责人',
          nextIn: '电话跟进 | 刘强管理员 | 2018-06-29',
          legalPerson: '李四2',
          registered:'33333',
          Industry:'医药医疗',
          cusFrom:'业务开发',
          location:'安徽-合肥',
          telephoneIn:'1',
          seeIn:'0',
          bookIn:'待理单',
          PersonalRate:'A',
          businessGuidance:''
        }, {
          cusname: '华为技术有限公司',
          cuspoolTime: '2018-06-12',
          protectTime: 12,
          recentIn: '电话跟进 | 刘强管理员 | 2018-06-17 23:24:18 | 约到负责人',
          nextIn: '电话跟进 | 刘强管理员 | 2018-06-29',
          legalPerson: '李四2',
          registered:'33333',
          Industry:'医药医疗',
          cusFrom:'业务开发',
          location:'安徽-合肥',
          telephoneIn:'1',
          seeIn:'0',
          bookIn:'待理单',
          PersonalRate:'A',
          businessGuidance:''
        }, {
          cusname: '华为技术有限公司',
          cuspoolTime: '2018-06-14',
          protectTime: 21,
          recentIn: '电话跟进 | 刘强管理员 | 2018-06-17 23:24:18 | 约到负责人',
          nextIn: '电话跟进 | 刘强管理员 | 2018-06-29',
          legalPerson: '李四2',
          registered:'33333',
          Industry:'医药医疗',
          cusFrom:'业务开发',
          location:'安徽-合肥',
          telephoneIn:'1',
          seeIn:'0',
          bookIn:'待理单',
          PersonalRate:'A',
          businessGuidance:''
        }, {
          cusname: '华为技术有限公司',
          cuspoolTime: '2018-06-16',
          protectTime: 55,
          recentIn: '电话跟进 | 刘强管理员 | 2018-06-17 23:24:18 | 约到负责人',
          nextIn: '电话跟进 | 刘强管理员 | 2018-06-29',
          legalPerson: '李四2',
          registered:'33333',
          Industry:'医药医疗',
          cusFrom:'业务开发',
          location:'安徽-合肥',
          telephoneIn:'1',
          seeIn:'0',
          bookIn:'待理单',
          PersonalRate:'A',
          businessGuidance:''
        }, {
          cusname: '华为技术有限公司',
          cuspoolTime: '2018-06-23',
          protectTime: 36,
          recentIn: '电话跟进 | 刘强管理员 | 2018-06-17 23:24:18 | 约到负责人',
          nextIn: '电话跟进 | 刘强管理员 | 2018-06-29',
          legalPerson: '李四2',
          registered:'33333',
          Industry:'医药医疗',
          cusFrom:'业务开发',
          location:'安徽-合肥',
          telephoneIn:'1',
          seeIn:'0',
          bookIn:'待理单',
          PersonalRate:'A',
          businessGuidance:''
        }]
    }
  },
  methods :{
    privateSerFilter (){

    },
    telephoneInVisableFn(){
      this.telephoneInVisable=true;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    submitForm(telephoneInForm) {
        this.$refs[telephoneInForm].validate((telephoneInRules) => {
          if (telephoneInRules) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>


