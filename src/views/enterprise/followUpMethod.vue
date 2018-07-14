<template>
  <div class="mainCls">
     <div class="contentCls">
        <el-tabs v-model="activeName" type="card" >
            <el-tab-pane label="电话跟进" name="phoneTab">
                <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="138px" style='width: 400px; margin-left:50px;'>

                <el-form-item :label="labelObj.followName" prop="followName">
                <el-input v-model="temp.followName" disabled></el-input>
                </el-form-item>
                
                <el-form-item :label="labelObj.contactName" prop="contactName">
                <el-input v-model="temp.contactName" disabled></el-input>
                </el-form-item>

                <el-form-item :label="labelObj.contactPhone" prop="contactPhone">
                <el-input v-model="temp.contactPhone" disabled></el-input>
                </el-form-item>

                <el-form-item :label="labelObj.callTime" prop="callTime">
                <el-input v-model="temp.callTime" disabled></el-input>
                </el-form-item>

                <el-form-item :label="labelObj.callLength" prop="callLength">
                <el-input v-model="temp.callLength" disabled></el-input>
                </el-form-item>

                <el-form-item :label="labelObj.contactCase">
                <el-select class="filter-item" v-model="temp.contactCase" placeholder="联系情况" disabled>
                    <el-option v-for="item in []" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
                </el-form-item>

                <el-form-item :label="labelObj.phoneRecord">
                    <el-input v-model="temp.phoneRecord" disabled></el-input>
                </el-form-item>

                <el-form-item :label="labelObj.contactTime">
                    <el-input v-model="temp.contactTime" disabled></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button  type="danger" >{{labelObj.btnSaveText}}</el-button>
                <el-button  type="danger" >{{labelObj.btnCancelText}}</el-button>
            </div>

            </el-tab-pane>
            <el-tab-pane label="拜访跟进" name="visitTab">
                 <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="138px" style='width: 400px; margin-left:50px;'>
                    <!-- 跟进方式名称 -->
                    <el-form-item :label="labelObj.followName" prop="followName">
                        <el-input v-model="temp.followName" disabled></el-input>
                    </el-form-item>
                    <!-- 客户名称 -->
                    <el-form-item :label="labelObj.contactName" prop="contactName">
                        <el-input v-model="temp.contactName" disabled></el-input>
                    </el-form-item>
                    <!-- 拜访时间 -->
                    <el-form-item :label="labelObj.visitTime" prop="visitTime">
                        <el-input v-model="temp.visitTime" disabled></el-input>
                    </el-form-item>
                    <!-- 拜访时长 -->
                    <el-form-item :label="labelObj.visitLength" prop="visitLength">
                        <el-input v-model="temp.visitLength" disabled></el-input>
                    </el-form-item>
                    <!-- 开始定位 -->
                    <el-form-item :label="labelObj.startLoc" prop="startLoc">
                        <el-input v-model="temp.startLoc" disabled></el-input>
                    </el-form-item>
                    <!-- 结束定位 -->
                    <el-form-item :label="labelObj.endLoc" prop="endLoc">
                        <el-input v-model="temp.endLoc" disabled></el-input>
                    </el-form-item>
                    <!-- 联系人 -->
                    <el-form-item :label="labelObj.contactName" prop="contactName">
                        <el-input v-model="temp.contactName" disabled></el-input>
                    </el-form-item>
                    <!-- 跟进纪要 -->
                    <el-form-item :label="labelObj.followRecord" prop="followRecord">
                        <el-input v-model="temp.followRecord" disabled></el-input>
                    </el-form-item>
                    <!-- 跟进状态 -->
                    <el-form-item :label="labelObj.followStatus">
                    <el-select class="filter-item" v-model="temp.followStatus" :placeholder="labelObj.followStatus" disabled>
                        <el-option v-for="item in []" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <!-- 下次拜访时间 -->
                    <el-form-item :label="labelObj.nextVisitTim">
                        <el-input v-model="temp.nextVisitTim" disabled></el-input>
                    </el-form-item>
                    <!-- 下次拜访地点 -->
                    <el-form-item :label="labelObj.nextVisitLoc">
                        <el-input v-model="temp.nextVisitLoc" disabled></el-input>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button  type="danger" >{{labelObj.btnSaveText}}</el-button>
                    <el-button  type="danger" >{{labelObj.btnCancelText}}</el-button>
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
      activeName: 'phoneTab',
      rules: {},
      temp: {},
      dataForm: {},
      labelObj: {
        followName: '跟进方式名称',
        customerName: '客户名称',
        contactName: '联系人',
        contactPhone: '联系电话',
        callTime: '致电时间',
        callLength: '致电时长',
        contactCase: '联系情况',
        phoneRecord: '电话纪要',
        contactTime: '下次联系时间',
        visitTime: '拜访时间',
        visitLength: '拜访时长',
        startLoc: '开始定位',
        endLoc: '结束定位',
        followRecord: '跟进纪要',
        followStatus: '跟进状态',
        nextVisitTim: '下次拜访时间',
        nextVisitLoc: '下次拜访地点',
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
