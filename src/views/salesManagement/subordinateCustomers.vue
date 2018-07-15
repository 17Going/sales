<template>
  <div class="app-container">

    <!--查询按钮位置-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item" placeholder="请输入客户名称">
      </el-input>
      <el-select v-model="value" class="filter-item" placeholder="请选择客户所属区域">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}
      </el-button>
    </div>

    <el-table :data="list" v-loading.body="listLoading"
              border fit highlight-current-row
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :default-sort = "{prop: 'customerName', order: 'descending'}"
    >
    <!--默认排序-->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column align="center" label="客户名称" width="120"
                       sortable  prop="customerName">
        <template slot-scope="scope">
          <span>{{scope.row.customerName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="业务员">
        <template slot-scope="scope">
          <span>{{scope.row.salesman}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130" align="center" label="剩余保护天数"
                       sortable prop="lastProtectionDays">
        <template slot-scope="scope">
          <span>{{scope.row.lastProtectionDays}}</span>
        </template>
      </el-table-column>

      <el-table-column width="220" label="最新跟进"
                       sortable prop="follow_up">
        <template slot-scope="scope">
          <span>{{scope.row.follow_up}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="法人姓名" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.legalPersonName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" label="注册资本">
        <template slot-scope="scope">
          <span>{{scope.row.registeredCapital}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="客户来源" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.customerSource}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属区域" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.region}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="电话跟进" width="120"
                       sortable  prop="phoneFollow_up">
        <template slot-scope="scope">
          <span>{{scope.row.phoneFollow_up}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="拜访跟进" width="120"
                       sortable prop="visitFollow_up">
        <template slot-scope="scope">
          <span>{{scope.row.visitFollow_up}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="理单记录" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.singleRecord}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="个人评级" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.personalRating}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="经理评级" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.managerRating}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="业务指导" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.businessGuidance}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="650px" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="small">加入理单</el-button>
          <el-button plain size="small" icon="el-icon-edit-outline">添加跟进人</el-button>
          <el-button plain size="small" icon="el-icon-edit-outline">转交</el-button>
          <el-button plain size="small" icon="el-icon-edit">调整保护期</el-button>
          <el-button type="danger" size="small">标记为不准确</el-button>
          <el-button plain size="small" icon="el-icon-view">关注</el-button>
          <!--<el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>-->
          <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">加入理单</el-button>-->
          <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">添加跟进人</el-button>-->
          <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">转交</el-button>-->
          <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">调整保护期</el-button>-->
          <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">标记为不准确</el-button>-->
          <!--<el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">关注</el-button>-->
        </template>
      </el-table-column>

    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getAll } from '@/api/salesManagement'

  export default {
    name: 'inlineEditTable',
    data() {
      return {
        options: [{
          value: '北京',
          label: '北京'
        }, {
          value: '安徽',
          label: '安徽'
        }, {
          value: '上海',
          label: '上海'
        }, {
          value: '河南',
          label: '河南'
        }, {
          value: '四川',
          label: '四川'
        }],
        value: '',
        tableKey: 0,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined
        },
        importanceOptions: [1, 2, 3]
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getAll(this.listQuery).then(response => {
          const items = response.data.items
          this.list = items.map(v => {
            this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html

            v.originalTitle = v.title //  will be used when user click the cancel botton

            return v
          })
          this.total = 100 // 先定死
          this.listLoading = false
        })
      },
      /* 查询方法 */
      handleFilter() {

      },
      cancelEdit(row) {
        row.title = row.originalTitle
        row.edit = false
        this.$message({
          message: 'The title has been restored to the original value',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        row.edit = false
        row.originalTitle = row.title
        this.$message({
          message: 'The title has been edited',
          type: 'success'
        })
      },
      handleSelectionChange(val) {
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      }
    }
  }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
