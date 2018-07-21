<template>
  <div class="mainCls">
     <div class="contentCls">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="138px" style='width: 400px; margin-left:50px;'>
        <!-- 合同编号 -->
        <el-form-item :label="labelObj.contractNum" prop="contractNum">
          <el-input v-model="temp.contractNum" disabled></el-input>
        </el-form-item>
        <!-- 合同客户名称 -->
        <el-form-item :label="labelObj.contractCusName " prop="contractCusName">
          <el-input v-model="temp.contractCusName" disabled></el-input>
        </el-form-item>
        <!-- 签订日期 -->
        <el-form-item :label="labelObj.signDate" prop="signDate">
          <el-input v-model="temp.signDate" disabled></el-input>
        </el-form-item>
        <!-- 签单人 -->
         <el-form-item :label="labelObj.signPeople" prop="signPeople">
          <el-input v-model="temp.signPeople" disabled></el-input>
        </el-form-item>
        <!-- 合同金额 -->
         <el-form-item :label="labelObj.contactMoney" prop="contactMoney">
          <el-input v-model="temp.contactMoney" disabled></el-input>
        </el-form-item>
        <!-- 合同类型 -->
         <el-form-item :label="labelObj.contactType" prop="contactType">
          <el-input v-model="temp.contactType" disabled></el-input>
        </el-form-item>
        <!-- 开始日期 -->
         <el-form-item :label="labelObj.startDate" prop="startDate">
          <el-input v-model="temp.startDate" disabled></el-input>
        </el-form-item>
        <!-- 结束日期 -->
         <el-form-item :label="labelObj.endDate" prop="endDate">
          <el-input v-model="temp.endDate" disabled></el-input>
        </el-form-item>
      </el-form>
      <field></field>
      <div slot="footer" class="dialog-footer">
        <el-button  type="danger" >{{labelObj.btnSaveText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import field from './field'
export default {
  components: { field },
  data() {
    return {
      rules: {},
      temp: {},
      dataForm: {},
      labelObj: {
        contractNum: '合同编号',
        contractCusName: '合同客户名称',
        signDate: '签订日期',
        signPeople: '签单人',
        contactMoney: '合同金额',
        contactType: '合同类型',
        startDate: '开始日期',
        endDate: '结束日期 ',
        btnSaveText: '提交'
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
      margin: 20px;
      .dialog-footer{
        align: center;
        text-align: center;
      }
    }
  }
</style>
