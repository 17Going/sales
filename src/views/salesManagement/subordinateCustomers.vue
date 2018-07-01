<template>
  <div class="app-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="客户名称" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.customerName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="业务员">
        <template slot-scope="scope">
          <span>{{scope.row.salesman}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="剩余保护天数">
        <template slot-scope="scope">
          <span>{{scope.row.lastProtectionDays}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="最新跟进">
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

      <el-table-column align="center" label="电话跟进" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.phoneFollow_up}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="拜访跟进" width="120">
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
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import { getAll } from '@/api/salesManagement'

  export default {
    name: 'inlineEditTable',
    data() {
      return {
        list: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        }
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
          this.listLoading = false
        })
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
