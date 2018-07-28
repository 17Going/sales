<template>
  <div class="guideEntry">
    <span>{{content}}</span>
    <column-button @click="dialogTableVisible = true"></column-button>
    <el-dialog :title="title"
               :visible.sync="dialogTableVisible">
      指导意见：
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>

      <el-table :data="gridData" width="750" border style="margin-top: 20px;">
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="业务沟通" width="400"></el-table-column>
        <el-table-column property="date" label="提交时间" width="118"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogTableVisible = false">取 消</el-button>
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
    name: 'guide-entry',
    props: {
      title: {
        type: String,
        default: '指导记录'
      },
      data: [Object],
      content: null
    },
    data() {
      return {
        dialogTableVisible: false,
        textarea: '',
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '马上跟进'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '稍后跟进'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '可以放弃'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '马上跟进'
        }]
      };
    },
    methods: {
      handleClick(data) {
        //  TODO 业务逻辑代码
        this.phoneDialogVisible = false;
      }
    }
}
</script>

<style scoped>
  .guideEntry {
    float:right;
    text-align: left !important;
  }
</style>
