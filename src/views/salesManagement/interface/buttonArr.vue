<template>
  <div class="buttom-arr-div">
    <column-button style="margin-left: 5px" v-for="(val, key, index) in buttonArr"
                   :text="arr[val].text"
                   :icon="arr[val].icon"
                   :type="arr[val].type"
                   @click="handleClick(val, data)">></column-button>
    <!--加入理单弹出窗口-->
    <el-dialog
      title="加入理单"
      :visible.sync="joinList_dialogVisible"
      width="400px"
      :before-close="handleClose">
      <span>请确认要加入理单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="joinList_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="joinList_dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加跟进人弹窗-->
    <el-dialog
      title="添加跟进人"
      :visible.sync="addPerson_dialogVisible"
      width="30%"
      :before-close="handleClose">
      华为技术有限公司：
      <el-select v-model="value" v-bind:style="{'width':'420px'}" size="medium" multiple filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-table
        :data="tableData" border
        style="width: 100%; margin-top: 20px;">
        <el-table-column
          prop="name"
          label="姓名"
          width="250">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">--</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPerson_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPerson_dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--转交跟进人弹出窗口-->
    <el-dialog
      title="添加跟进人"
      :visible.sync="transfer_dialogVisible"
      width="500px"
      :before-close="handleClose">
      客户：华为技术有限公司：
      <div style="margin: 10px 0;">
        原跟进人：小强
      </div>
      请选择转交人：
      <el-select v-model="value" v-bind:style="{'width':'420px'}" size="medium" multiple filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="transfer_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="transfer_dialogVisible = false">转 交</el-button>
      </span>
    </el-dialog>
    <!--调整保护期窗口-->
    <el-dialog
      title="调整保护期"
      :visible.sync="adjustPeriod_dialogVisible"
      width="500px"
      :before-close="handleClose">
      <el-form>
        <el-form-item label="保护期天数" :label-width="'100px'">
          <el-input-number v-model="num1" @change="handleChange" :min="1" :max="1000" label="描述文字"></el-input-number>&nbsp;天
        </el-form-item>
      </el-form>
      <span style="color: red">注：手动调整客户的保护期天数后，保护期将按自然天减少，不再执行其它保护期规则；</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adjustPeriod_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adjustPeriod_dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import columnButton from '@/components/Button/columnButton'
  export default {
    name: 'button-arr',
    components: {
      columnButton
    },
    props: {
      buttonArr: {
        type: Array,
        // 默认值都是字符串  模块调用传这些字符串就行 限制为数组
        default() {
          return ['joinList', 'addPerson', 'transfer',
            'adjustPeriod', 'signInaccurate', 'isFollow'];
        }
      },
      data: [Object]
    },
    data() {
      return {
        joinList_dialogVisible: false,
        addPerson_dialogVisible: false,
        transfer_dialogVisible: false,
        adjustPeriod_dialogVisible: false,
        /*
        * 默认各个button的配置
        */
        arr: {
          joinList: {
            text: '加入理单',
            icon: 'el-icon-edit',
            type: 'danger'
          },
          addPerson: {
            text: '添加跟进人',
            icon: 'el-icon-edit-outline',
            type: 'primary'
          },
          transfer: {
            text: '转交',
            icon: 'el-icon-edit-outline',
            type: 'primary'
          },
          adjustPeriod: {
            text: '调整保护期',
            icon: 'el-icon-edit',
            type: 'primary'
          },
          signInaccurate: {
            text: '标记为不准确',
            icon: 'el-icon-edit',
            type: 'danger'
          },
          isFollow: {
            text: '关注',
            icon: 'el-icon-view',
            type: 'primary'
          }
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: [],
        tableData: [{
          name: '小强【主要跟进人】'
        }],
        num1: 10
      }
    },
    methods: {
      handleClick(val, data) {
        if (this[val + '_dialogVisible'] !== undefined) {
          this[val + '_dialogVisible'] = true;
        }
        this[val + 'Fun'](data, val);
        // this.$emit('click', evt);
      },
      // 加入理单 调用函数
      joinListFun(data) {
        console.log('joinListFun');
      },
      /**
       * 添加跟进人
       * @param data
       */
      addPersonFun(data) {
        console.log('addPersonFun');
      },
      /**
       * 转交
       * @param data
       */
      transferFun(data) {
        console.log('transferFun');
      },
      /**
       * 调整保护期
       * @param data
       */
      adjustPeriodFun(data) {
        console.log('adjustPeriodFun');
      },
      /**
       * 标记为不准确
       * @param data
       */
      signInaccurateFun(data) {
        this.$confirm('您确认将此客户标记为不准确吗？', '标记准确度', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 关注
       * @param data
       */
      isFollowFun(data, val) {
        let type = null ;
        let message = '取消关注成功';
        if (this.arr.isFollow.text === '取消关注') {
          this.arr.isFollow.text = '关注';
        } else {
          this.arr.isFollow.text = '取消关注';
          type = 'success';
          message = '恭喜你，关注成功';
        }
        this.$message({
          showClose: true,
          message: message,
          type: type
        });
      },
      handleClose(done) {
        done();
      },
      handleChange() {

      }
    }
  }
</script>

<style scoped>
  .buttom-arr-div {
    float:right;
    text-align: left !important;
  }
</style>
