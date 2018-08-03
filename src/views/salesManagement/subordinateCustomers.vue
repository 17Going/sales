<template>
  <div class="app-container">
    <!--查询按钮位置-->
    <div class="filter-container">
      <company-search></company-search>
      <people-search></people-search>
      <customer-region-search></customer-region-search>
      <customer-people-search></customer-people-search>
      <el-button style="margin-left: 12px" type="primary" icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
    </div>
    <!--基础表格-->
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

      <el-table-column align="center" label="电话跟进" width="150"
                       sortable  prop="phoneFollow_up">
        <template slot-scope="scope">
          <!--电话跟进组件接口-->
          <phone-lur :title="scope.row.customerName"
                     :content="scope.row.phoneFollow_up"
                     :data="scope.row"></phone-lur>
        </template>
      </el-table-column>

      <el-table-column align="center" label="拜访跟进" width="150"
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

      <el-table-column align="center" label="业务指导" width="130">
        <template slot-scope="scope">
          <!--业务指导接口-->
          <guide-entry :content="scope.row.businessGuidance"
                       :data="scope.row">
          </guide-entry>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="660px" label="操作">
        <template slot-scope="scope">
          <button-arr :data="scope.row"></button-arr>
        </template>
      </el-table-column>

    </el-table>
    <!--表格分页信息-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getAll } from '@/api/salesManagement'
  // TODO 组件导入不能加{}
  import phoneLur from './interface/phoneLur'
  import columnButton from '@/components/Button/columnButton'
  import guideEntry from './interface/guideEntry.vue'
  import buttonArr from './interface/buttonArr.vue'
  import companySearch from './interface/companySearch.vue'
  import peopleSearch from './interface/peopleSearch.vue'
  import customerRegionSearch from './interface/customerRegionSearch.vue'
  import customerPeopleSearch from './interface/customerPeopleSearch.vue'
  export default {
    components: {
      phoneLur,
      columnButton,
      guideEntry,
      buttonArr,
      companySearch,
      peopleSearch,
      customerRegionSearch,
      customerPeopleSearch
    },
    name: 'inlineEditTable',
    data() {
      return {
        customerPeopleSearchVal: '',
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
      phoneHandleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
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
