<template>
  <div class="mainCls">
     <div class="contentCls">
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="产品" name="productTab">
                <div>
                    <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="138px" style='width: 400px; margin-left:50px;'>
                         <!-- 产品名称 -->
                        <el-form-item :label="labelObj.productName" prop="productName">
                            <el-input v-model="temp.productName" disabled></el-input>
                        </el-form-item>
                        <!-- 产品编号 -->
                        <el-form-item :label="labelObj.productNum" prop="productNum">
                            <el-input v-model="temp.productNum" disabled></el-input>
                        </el-form-item>
                        <!-- 价格 -->
                        <el-form-item :label="labelObj.price" prop="price">
                            <el-input v-model="temp.price" disabled></el-input>
                        </el-form-item>
                        <!-- 启用状态 -->
                        <el-form-item :label="labelObj.enabelStatus" :placeholder="labelObj.enableVal" prop="enabelStatus">
                            <el-input v-model="temp.enabelStatus" disabled></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button  type="danger" >{{labelObj.btnSaveText}}</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="规格" name="rulesTab">
                <div>
                 <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="138px" style='width: 400px; margin-left:50px;'>
                      <!-- 规格名称 -->
                      <el-form-item :label="labelObj.rulesName" prop="rulesName">
                          <el-input v-model="temp.rulesName" disabled></el-input>
                      </el-form-item>
                      <!-- 价格 -->
                      <el-form-item :label="labelObj.price" prop="price">
                          <el-input v-model="temp.price" disabled></el-input>
                      </el-form-item>
                      <!-- 启用状态 -->
                      <el-form-item :label="labelObj.enabelStatus" prop="enabelStatus">
                          <el-input v-model="temp.enabelStatus" disabled></el-input>
                      </el-form-item>
                      <!-- 产品照片 -->
                      <el-form-item :label="labelObj.rulesImg" prop="rulesImg">
                          <el-input v-model="temp.rulesImg" disabled></el-input>
                      </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button  type="danger" >{{labelObj.btnSaveText}}</el-button>
                </div>
             </div>
            </el-tab-pane>
        </el-tabs>
       
      
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'productTab',
      rules: {},
      temp: {},
      dataForm: {},
      labelObj: {
        productName: '产品名称',
        productNum: '产品编号',
        price: '价格',
        enabelStatus: '启用状态',
        enableVal: '启用/停用',
        rulesName: '规则名称',
        rulesImg: '产品照片',
        btnSaveText: '提交',
        btnCancelText: '取消'
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
