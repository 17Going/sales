<template>
  <div class="app-container">
    <!--查询按钮位置-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入权限组名称">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">{{$t('table.add')}}
      </el-button>
    </div>
    <!--表格位置-->
    <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'groupName', order: 'descending'}">
      <el-table-column prop="groupName" label="权限组名称" sortable min-width="30%"></el-table-column>
      <el-table-column label="操作" min-width="70%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新建修改模态框位置-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <tree-table :data="data" :evalFunc="func" :evalArgs="args" :expandAll="expandAll" border>
        <el-table-column label="模块" min-width="20%">
          <template slot-scope="scope">
            {{scope.row.event}}
          </template>
        </el-table-column>
        <el-table-column label="读写" min-width="20%">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.write" @change="radioClick('write', scope.$index, scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="只读" min-width="20%">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.read" @change="radioClick('read', scope.$index, scope.row)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="无" min-width="20%">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.nothing" @change="radioClick('nothing', scope.$index, scope.row)"></el-radio>
          </template>
        </el-table-column>
      </tree-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  import treeTable from '@/components/TreeTable'
  import treeToArray from './customEval'

  export default {
    components: { treeTable },
    data() {
      return {
        args: [null, null, 'timeLine'],
        func: treeToArray,
        expandAll: true,
        textMap: {
          update: '编辑权限组',
          create: '新建权限组'
        },
        data: {
          id: 1,
          event: '所有',
          timeLine: 100,
          comment: '无',
          write: true,
          read: false,
          nothing: false,
          children: [
            {
              id: 2,
              event: '驾驶舱',
              timeLine: 10,
              write: true,
              read: false,
              nothing: false,
              comment: '无'
            },
            {
              id: 2,
              event: '企业管理',
              timeLine: 10,
              write: true,
              read: false,
              nothing: false,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '组织架构',
                  timeLine: 5,
                  write: true,
                  read: false,
                  nothing: false,
                  comment: '无'
                },
                {
                  id: 5,
                  event: '权限组',
                  timeLine: 10,
                  write: true,
                  read: false,
                  nothing: false,
                  comment: '无'
                },
                {
                  id: 6,
                  event: '用户',
                  timeLine: 75,
                  write: true,
                  read: false,
                  nothing: false,
                  comment: '无'
                }, {
                  id: 7,
                  event: '职位',
                  timeLine: 50,
                  write: true,
                  read: false,
                  nothing: false,
                  comment: '无'
                },
                {
                  id: 8,
                  event: '客户维护',
                  write: true,
                  read: false,
                  nothing: false,
                  timeLine: 25,
                  comment: '无'
                }
              ]
            },
            {
              id: 3,
              event: '客户',
              write: true,
              read: false,
              nothing: false,
              timeLine: 90,
              comment: '无',
              children: []
            }
          ]
        },
        dialogStatus: '',
        dialogFormVisible: false,
        rules: {
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        tableData: [{
          groupName: '管理员',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          groupName: '业务员',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address
      },
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      getList() {

      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleCreate() {
        // this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          // this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {

      },
      updateData() {

      },
      radioClick(type, a, b) {
        const typeArr = ['write', 'read', 'nothing']
        const len = typeArr.length
        console.log(type)
        for (let i = 0; i < len; i++) {
          const singleType = typeArr[i]
          if (type !== singleType) {
            b[singleType] = ''
          }
        }
        b[type] = undefined
        console.log(b[type])
      }
    }
  }
</script>
