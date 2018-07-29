<template>
  <div>
    <column-button style="margin-left: 5px" v-for="(val, key, index) in buttonArr"
                   :text="arr[val].text"
                   :icon="arr[val].icon"
                   :type="arr[val].type"
                   @click="handleClick(val, data)">></column-button>
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
        }
      }
    },
    methods: {
      handleClick(val, data) {
        this[val + 'Fun'](data);
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
        console.log('signInaccurateFun');
      },
      /**
       * 关注
       * @param data
       */
      isFollowFun(data) {
        console.log('isFollowFun');
      }
    }
  }
</script>

<style scoped>

</style>
