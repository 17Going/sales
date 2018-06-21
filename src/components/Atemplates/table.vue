<template>
  <div class="serviceCls">
    <div class="contentCls">
      <div class="toolbarCls">
        <el-date-picker v-model="timeVal" type="daterange" align="right"
                        :range-separator="fmLabelObj.labelSeparato"
                        :start-placeholder="fmLabelObj.labelStartTime"
                        :end-placeholder="fmLabelObj.labelEndTime"
                        @change="handleClick">
        </el-date-picker>
      </div>
      <div class="tableCls">


        <el-table v-loading="isLoading" :data="fmData" style="width: 100%" max-height="500" border>

          <el-table-column prop="transactionType" :label="fmLabelObj.labelTypeCM" width="150">
            <template slot-scope='scope'>
              <p>{{scope.row.transactionType === '1' ? fmLabelObj.labelTextRe : ''}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" :label="fmLabelObj.labelDateCM" width="220">
            <template slot-scope='scope'>
              <p>{{ getSTimeDetail(scope.row.createTime * 1000) }}</p>
            </template>
          </el-table-column>

          <el-table-column prop="transactionType" :label="fmLabelObj.labelExplainCM" width="150">
            <template slot-scope='scope'>
              <p>{{scope.row.transactionType === '1' ? fmLabelObj.labelTextExplain : ''}}</p>
            </template>
          </el-table-column>

          <el-table-column prop="amount" :label="fmLabelObj.labelMoneyCM">
            <template slot-scope='scope'>
              <p>{{Number(scope.row.amount).toFixed(2)}}</p>
            </template>
          </el-table-column>


          <el-table-column prop="status" :label="fmLabelObj.labelStateCM">
            <template slot-scope='scope'>
              <p>{{getStatus(scope.row.status)}}</p>
            </template>
          </el-table-column>
          <!-- 余额 <el-table-column prop="fmBalance" :label="fmLabelObj.labelBalCM" >
          </el-table-column> -->

        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals">
        </el-pagination>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'table',
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        totals: 1,
        timeVal: [new Date(), new Date()], /* 默认当天时间*/
        fmLabelObj: {},
        isLoading: true,
        fmData: [],
        /* 扩展代码 */
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    mounted() {
      this.fmLabelObj = this.$t('financial')
      this.getPagedData()
    },
    methods: {
      /* Begin: 分页必备 */
      /* 分页触发 */
      handleSizeChange(val) {
        this.pagesize = val
        this.getPagedData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getPagedData()
      },
      /* 获取列表数据，代表查询*/
      getPagedData() {
        const _this = this
        var params = {
          page: _this.currentPage,
          pageSize: _this.pagesize,
          startDate: _this.getSTime(_this.timeVal[0]),
          endDate: _this.getSTime(_this.timeVal[1])
        }
        _this.isLoading = true
        var response = {
          code: 0,
          data: {}
        }
        response.data.data = {
          list: [
            { createTime: '1528315740', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1528315740', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1527854400', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1527890400', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1527940800', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1527976800', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1528027200', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1528063200', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1528113600', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1528149600', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' },
            { createTime: '1528200000', finishTime: '0', amount: '0.010000', transactionType: '1', status: '0' }
          ],
          totalCount: 20
        }
        _this.fmData = response.data.data.list
        _this.totals = parseInt(response.data.data.count)
        _this.isLoading = false
        axios.get('/finance/pay/page-list', { params })
          .then(function(response) {
            _this.isLoading = false
            if (response.data.code === 0) {
              _this.fmData = response.data.data.list
              _this.totals = parseInt(response.data.data.count)
            } else {
              _this.fmData = []
              _this.totals = 1
              _this.$message.error(response.data.msg)
            }
          })
          .catch(function(response) {
            _this.isLoading = false
          })
      },
      /* END: 分页必备 */
      /* 转 换状态 0-充值中 1-已到账 2-充值失败 */
      getStatus(state) {
        const objState = {
          '0': '充值中', // Top-up failure
          '1': '已到账', // payment has been received
          '2': '充值失败' // Top-up
        }
        return objState[state]
      },
      /* 转换时间格式 */
      getSTime(sTime) {
        var myDate = new Date(sTime)
        var month = myDate.getMonth() + 1
        var day = myDate.getDate()
        var date = myDate.getFullYear() + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
        return date
      },
      getSTimeDetail(sTime) {
        var minTen = function(val) {
          return val > 9 ? val : '0' + val
        }
        var myDate = new Date(sTime)
        var month = minTen(myDate.getMonth() + 1)
        var day = minTen(myDate.getDate())
        var hour = minTen(myDate.getHours())
        var minutes = minTen(myDate.getMinutes())
        var seconds = minTen(myDate.getSeconds())

        var date = myDate.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
        return date
      },
      /* 获取列表数据，代表查询 */
      handleClick() {
        this.getPagedData()
      },
      // 充值
      moneyFun() {
        this.$router.push('/advHome/recharge')
      }
    }
  }
</script>
<style>
  .serviceCls {
    margin-top: 43px;
  }

  .serviceCls .contentCls {
    height: 719px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 1);
  }

  .serviceCls .contentCls .tableCls {
    padding: 9px 26px 20px 26px;
  }

  .serviceCls .contentCls .toolbarCls {
    padding: 15px 26px 60px 26px;
    text-align: left;
  }

  .serviceCls .toolbarCls .el-date-editor {
    float: right;
  }

  .serviceCls .contentCls .el-cm {
    width: 650px;
    margin-top: 10px;
    background: rgba(255, 255, 255, 1);
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(41, 38, 38, 1);
  }

  .serviceCls .contentCls .el-button {
    width: 233px;
    height: 42px;
    border-radius: 3px;
  }

  .serviceCls .contentCls .el-pagination {
    text-align: center;
  }
</style>
