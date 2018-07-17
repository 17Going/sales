<template>
  <div>
  <p>1111111111111111111111</p>
  <treeselect
    :options="options"
    :disable-branch-nodes="true"
    :show-count="true"
    placeholder="Where are you from?"
    :normalizer="normalizer"
  />
   <el-menu default-active="1" class="el-menu-demo" mode="horizontal" >
   <el-submenu index="2-4" mode="horizontal">
      <template slot="title" mode="horizontal">选项4</template>
      <el-menu-item index="2-4-1" mode="horizontal">选项1</el-menu-item>
      <el-menu-item index="2-4-2" mode="horizontal">选项2</el-menu-item>
      <el-menu-item index="2-4-3" mode="horizontal">选项3</el-menu-item>
    </el-submenu>
</el-menu>
<el-button type='danger' size='mini' icon="el-icon-plus" @click="newRecord">新建</el-button>
 <el-table :data="tableData" class="tb-edit" style="width: 100%" highlight-current-row 
      @cell-dblclick="handleCurrentChange">
             <el-table-column label="序号" width="180" v-show="false">
                <template scope="scope">
                    <span  >{{scope.row.index = scope.$index}}</span>
                </template>
            </el-table-column>
            <el-table-column label="日期" width="180" >
                <template scope="scope">
                    <span v-if="!scope.row.isEdit" >{{scope.row.date}}</span>
                    <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.date" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="180">
                <template scope="scope">
                    <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                    <span v-if="!scope.row.isEdit" >{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="地址">
                <template scope="scope">
                    <el-input size="small" v-if="scope.row.isEdit" v-model="scope.row.address" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> 
                    <span v-if="!scope.row.isEdit"  >{{scope.row.address}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button v-if="scope.row.isEdit" size="small" icon="el-icon-circle-check-outline" @click="handleEdit(scope.$index, scope.row)">确定编辑</el-button>
                    <el-button v-if="!scope.row.isEdit" icon="el-icon-edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
 </el-table>
</div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    // register the component
    components: { Treeselect },
    data() {
      return {
        // define default value
        value: null,
        // define options
        options: [{
          id: 'a',
          aaa: 'a',
          children: [{
            id: 'aa',
            aaa: 'aa'
          }, {
            id: 'ab',
            aaa: 'ab'
          }]
        }, {
          id: 'b',
          aaa: 'b'
        }, {
          id: 'c',
          aaa: 'c'
        }],
        normalizer(node) {
          return {
            id: node.id,
            label: node.aaa,
            children: node.children
          }
        },
        isEdit: false, // 保证列表只能同时编辑1条记录
        page: 1,
        pageSize: 10,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleCurrentChange(row, column, cell, event) {
        console.log(row.index);
        if (column.label === '操作') {
          return;
        }
        console.log(row, cell, column, event.currentTarget)
        // 如果存在还在编辑的行，先把上一行保存
        if (this.isEdit !== false) {
          this.$set(this.tableData[this.isEdit], 'isEdit', false);
        }
        // 开启点击行的编辑
        this.$set(row, 'isEdit', true)
        this.isEdit = row.index;
        console.log(row, event, column, event.currentTarget)
      },
      handleEdit(index, row) {
        if (row.isEdit) {
          this.$set(row, 'isEdit', false)
          this.isEdit = false;
        } else if (this.isEdit === false) {
          this.$set(row, 'isEdit', true)
          this.isEdit = index;
        }
        console.log(index, row);
      },
      handleDelete(index, row) {
        this.tableData.splice(index, 1);
        console.log(index, row);
      },
      newRecord() {
        this.tableData.unshift({
          date: '',
          name: '',
          isEdit: true,
          address: ''
        })
      }
    }
  }
</script>
