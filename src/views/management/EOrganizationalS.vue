<template>
  <!-- EOS: 企业组织架构  Enterprise organizational structure -->
  <div class="EOSCls">
      <el-container>
        <el-header>
            /*企业组织架构*/
        </el-header>
        <el-container>
         <div class='leftCls'>
          <el-aside >
               <el-tree :data="EOSData" node-key="id"
                    default-expand-all :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span @mouseover="asideNodeOver" @mouseout="asideNodeOut">{{ node.label }}</span>
                      <span v-show="true">
                        <el-button type="text" size="mini" @click="() => append(data)">[添加部门]</el-button>
                        <el-button type="text" size="mini" @click="() => append(data)">[修改部门]</el-button>
                        <el-button type="text" size="mini" @click="() => append(data)">[移动部门]</el-button>
                        <el-button type="text" size="mini" @click="() => append(data)">[删除部门]</el-button>
                      </span>
                    </span>
                  </el-tree>
          </el-aside>
           </div>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>
<script>
import DropdownMenu from '@/components/Share/dropdownMenu'
import { departmentCreate } from '@/api/management'

export default {
  name: 'documentation',
  components: { DropdownMenu },
  data() {
    const data = [{
        id: 1,
        label: '华为公司',
        children: [{
          id: 4,
          label: '北京分公司',
          children: [{
            id: 9,
            label: '企业部'
          }, {
            id: 10,
            label: '网络部'
          }]
        }]
      }, {
        id: 2,
        label: '杭州分公司',
        children: [{
          id: 5,
          label: '企业部'
        }, {
          id: 6,
          label: 'IT部'
        }]
      }, {
        id: 3,
        label: '西安分公司'
      }];
    
    departmentCreate({ name: 'abc' }).then(response => {
      console.log(response)
    })
    return {
      isShowOpera: false,
      EOSData: JSON.parse(JSON.stringify(data)),
      articleList: [
        { title: '基础篇', href: 'https://segmentfault.com/a/1190000009275424' },
        { title: '登录权限篇', href: 'https://segmentfault.com/a/1190000009506097' },
        { title: '实战篇', href: 'https://segmentfault.com/a/1190000009762198' },
        { title: 'vueAdmin-template 篇', href: 'https://segmentfault.com/a/1190000010043013' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://segmentfault.com/a/1190000012213278' }
      ]
    }
  },
  methods: {
    asideNodeOver(){
      this.isShowOpera = false;
    },
    asideNodeOut(){
      this.isShowOpera = true;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.EOSCls {
  margin: 50px;
  .document-btn {
    float: left;
    margin-left: 50px;
    vertical-align: middle;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
  .leftCls {
     height: 100%;
     width: 400px;
     border-right: 2px #e5e8ea solid;
  }
  .leftCls .el-aside{
     width: 100%;
      height: 100%;
  }
}
</style>
