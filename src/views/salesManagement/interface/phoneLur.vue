<template>
  <div class="phone-lur">
    <span>{{content}}</span>
    <column-button @click="phoneDialogVisible = true"></column-button>
    <el-dialog width="1000px"
      :title="'电话跟进-'+ title"
      :visible.sync="phoneDialogVisible"
      :before-close="handleClose"
      >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          {{title}}
        </el-form-item>
        <el-form-item prop="name" label="联系人" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.name" v-bind:style="{'width':inputWidth}" placeholder="请选择活动区域">
            <el-option label="小强（185******）" value="shanghai"></el-option>
            <el-option label="小刘（185******）" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="date1"  label="致电时间" :label-width="formLabelWidth">
          <el-date-picker v-bind:style="{'width':inputWidth}"
            v-model="date1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="致电时长" :label-width="formLabelWidth">
          <el-input-number v-model="num8" v-bind:style="{'width':inputWidth}"
                           controls-position="right"
                           @change="handleChange" :min="1"></el-input-number>&nbsp;分钟
        </el-form-item>
        <el-form-item prop="resource" label="联系情况" :label-width="formLabelWidth">
          <el-select v-model="form.region" v-bind:style="{'width':inputWidth}" placeholder="请选择联系情况">
            <el-option label="联系中" value="shanghai"></el-option>
            <el-option label="绕道负责人" value="beijing"></el-option>
            <el-option label="约到负责人" value="beijing"></el-option>
            <el-option label="已经使用" value="beijing"></el-option>
            <el-option label="未联系" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下次联系时间" :label-width="formLabelWidth">
          <el-date-picker v-bind:style="{'width':inputWidth}"
            v-model="timeValue"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话纪要" :label-width="formLabelWidth">
          <el-input v-bind:style="{'width':inputWidth}"
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>历史纪录</span>
          <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        <el-table :data="gridData">
          <el-table-column property="name" label="联系人" width="100"></el-table-column>
          <el-table-column property="time" label="致电时间" width="100"></el-table-column>
          <el-table-column property="long" label="致电时长" width="90"></el-table-column>
          <el-table-column property="situation" label="联系情况" width="100"></el-table-column>
          <el-table-column property="summary" label="电话纪要" width="200"></el-table-column>
          <el-table-column property="nextTime" label="下次联系时间" width="120"></el-table-column>
          <el-table-column property="submitter" label="提交人" width="100"></el-table-column>
          <el-table-column property="subTime" label="提交时间" width="100"></el-table-column>
        </el-table>
      </el-card>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="phoneDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import columnButton from '@/components/Button/columnButton'

  export default {
    components: {
      columnButton
    },
    name: 'phone-lur',
    props: {
      title: [String],
      data: [Object],
      content: [String]
    },
    data() {
      return {
        inputWidth: '400px',
        textarea: '',
        num8: 1,
        timeValue: '',
        date1: '',
        phoneDialogVisible: false,
        titleCenter: true,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        ruleForm: {
          name: '',
          timeValue: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          timeValue: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择联系情况', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        gridData: [{
          name: '王小虎',
          time: '2018-05-02',
          long: '5分钟',
          situation: '联系中',
          summary: '小强有兴趣购买',
          nextTime: '2016-06-02',
          submitter: '小强',
          subTime: '2018-05-02'
        }, {
          name: '王小虎',
          time: '2018-05-02',
          long: '5分钟',
          situation: '联系中',
          summary: '小强有兴趣购买，持续跟进中',
          nextTime: '2018-05-03',
          submitter: '小强',
          subTime: '2018-05-02'
        }, {
          name: '王小虎',
          time: '2018-05-02',
          long: '5分钟',
          situation: '联系中',
          summary: '小强有兴趣购买，持续跟进中',
          nextTime: '2018-05-08',
          submitter: '小强',
          subTime: '2018-05-02'
        }, {
          name: '王小虎',
          time: '2016-05-02',
          long: '5分钟',
          situation: '联系中',
          summary: '小强有兴趣购买，持续跟进中',
          nextTime: '2018-05-03',
          submitter: '小强',
          subTime: '2018-05-02'
        }],
        formLabelWidth: '30%'
      }
    },
    methods: {
      handleClose(done) {
        done();
      },
      handleClick(data) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
          //  TODO 业务逻辑代码
            this.phoneDialogVisible = false;
            this.$emit('click', data);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style scoped>
  .phone-lur {
    float:right;
    text-align: left !important;
  }
</style>
