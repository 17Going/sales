<template>
    <div class="fieldCls">
        <div class="toolbarCls">
            <el-button type='danger' size='mini' icon="el-icon-plus" @click="newRecord">新建</el-button>
        </div>
        <div class="tableCls">
            <el-table :data="tableData" class="tb-edit" style="width: 100%" highlight-current-row border>
                    <el-table-column prop="field" label="字段名称">
                        <template scope="scope">
                            <el-input v-model="scope.row.field"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="字段类型">
                        <template scope="scope" >
                            <el-select v-model="scope.row.checkType" :options="fieldData">
                                <el-option v-for="item in fieldData" :key="item.field" :label="item.field" :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button  size="small" icon="el-icon-arrow-up" @click="handMove(scope.$index, -1)"></el-button>
                            <el-button  icon="el-icon-arrow-down" size="small" @click="handMove(scope.$index, 1)"></el-button>
                            <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      labelObj: {
        phone: '手机号码',
        email: '邮箱',
        address: '定位',
        text: '单行文本',
        multitext: '多行文本',
        singleselect: '单选',
        multiselect: '多选',
        levelselect: '多级下拉',
        date: '日期',
        datetime: '日期时间',
        integer: '整数',
        decimal: '数字',
        money: '金额',
        photo: '图片',
        sysselect: '系统参数'
      },
      tableData: [{
        field: 'aa',
        checkType: 'phone'
      }, {
        field: 'bb',
        checkType: 'email'
      }, {
        field: 'cc',
        checkType: 'decimal'
      }, {
        field: 'dd',
        checkType: 'sysselect'
      }, {
        field: 'ee',
        checkType: 'money'
      }],
      fieldData: []
    }
  },
  mounted() {
    for (const key in this.labelObj) {
      this.fieldData.push({
        field: this.labelObj[key],
        value: key
      })
    }
  },
  methods: {
    newRecord() {
      this.tableData.push({
        field: '',
        checkType: ''
      });
    },
    handleDelete(index) {
      // kuozhan
      this.tableData.splice(index, 1)
    },
    handMove(index, i) {
      // 利用ES6解构进行赋值交换
      const len = this.tableData.length - 1;
      if (len < 2) return;
      // 如果是第一行，向上移动，就跟列表最后一行交换位置
      if ((index === 0) && (i === -1)) {
        i = len;
      // 如果是最后一行，向下移动，就跟列表第一行交换位置
      } else if ((index === len) && (i === 1)) {
        i = 0;
      } else {
        i = index + i;
      }
      [this.tableData[index], this.tableData[i]] = [this.tableData[i], this.tableData[index]]
      this.tableData = Object.assign([], this.tableData);
    }
  }
}
</script>
<style lang="scss" scoped>
    .fieldCls{
        margin: 10px 0px;
        .toolbarCls{
            margin-bottom: 10px;
        }
        .tableCls{
            width: 52.0%;
        }
        .el-button{
            background-color: #fef9f9;
            border-radius: 3px;
            border: 1px solid #f1afaf;
            color: #e15151;
            padding: 5px 10px;
        }
    }
</style>
