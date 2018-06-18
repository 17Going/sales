<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
     
     
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="text-center">
            <el-button class="pan-btn blue-btn" @click="activeHandler('Components')">Components</el-button>
          </el-col>
          
          <el-col :span="4" class="text-center">
           <el-button class="pan-btn green-btn" @click="activeHandler('Table')">Table</el-button>
          </el-col>

          <el-col :span="4" class="text-center">
            <el-button class="pan-btn tiffany-btn" @click="activeHandler('Form')">Form</el-button>
          </el-col>
         
        </div>
      </el-card>
    </el-row>
      <div v-show='isShowObj.Form'>
          <user-Form></user-Form>
      </div>
       <div v-show='isShowObj.Table'>
          <user-Table></user-Table>
      </div>
   

  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import Mallki from '@/components/TextHoverEffect/Mallki'
import DropdownMenu from '@/components/Share/dropdownMenu'
import waves from '@/directive/waves/index.js' // 水波纹指令

import userForm from '@/components/Atemplates/form'
import userTable from '@/components/Atemplates/table'

export default {
  name: 'components-demo',
  components: {
    userForm,
    userTable
  },
  directives: {
    waves
  },
  data() {
    return {
        isShowObj: {
          Components: true,
          Table:  false,
          Form: false
        }
    }
  },
  methods: {
    activeHandler(eName){
      for (let key in this.isShowObj) {  
         this.isShowObj[key] = false; 
      } 
      this.isShowObj[eName] = true;
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>
