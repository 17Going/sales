<template>
  <div class="mainCls">
     <div class="contentCls">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

        <el-form-item :label="labelObj.customerName" prop="customerName">
          <el-input v-model="temp.customerName" disabled></el-input>
        </el-form-item>

        <el-form-item :label="labelObj.legalPerson " prop="legalPerson">
          <el-input v-model="temp.legalPerson" disabled></el-input>
        </el-form-item>

        <el-form-item :label="labelObj.regCapital" prop="regCapital">
          <el-input v-model="temp.regCapital" disabled></el-input>
        </el-form-item>

        <el-form-item :label="labelObj.industry">
          <el-select class="filter-item" v-model="temp.industry" placeholder="读取行业分类" disabled>
            <el-option v-for="item in []" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labelObj.customerSource">
          <el-select class="filter-item" v-model="temp.customerSource" placeholder="读取客户来源" disabled>
            <el-option v-for="item in []" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labelObj.parentCustomer">
          <el-select class="filter-item" v-model="temp.parentCustomer" placeholder="选择客户" disabled>
            <el-option v-for="item in []" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labelObj.area">
          <el-select class="filter-item" v-model="temp.area" placeholder="选取客户区域" disabled>
            <el-option v-for="item in []" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labelObj.note">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.note" disabled>
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button  type="danger" >{{labelObj.btnSaveText}}</el-button>
      </div>

      
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rules: {},
      temp: {},
      dataForm: {},
      labelObj: {
        customerName: '客户名称',
        legalPerson: '法人姓名',
        regCapital: '注册资本',
        cfgTitle: '绑定部门',
        industry: '所属行业',
        customerSource: '客户来源',
        parentCustomer: '上层客户 ',
        area: '所属区域',
        note: '备注',
        btnSaveText: '保存'
      },
      isLoading: false,
      postsData: []
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mainCls{
    .contentCls{
      margin-top: 50px;
      .dialog-footer{
        align: center;
        text-align: center;
      }
    }
  }
</style>
