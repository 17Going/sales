<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

      <breadcrumb class="breadcrumb-container"></breadcrumb>

      <div class="right-menu">
        <error-log class="errLog-container right-menu-item"></error-log>

        <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip>
        <!--delete by ligaoming 20180614 删除语言切换-->
        <!--<lang-select class="international right-menu-item"></lang-select>-->
        <!--delete by ligaoming 20180614 删除换肤-->
        <!--<el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">-->
          <!--<theme-picker class="theme-switch right-menu-item"></theme-picker>-->
        <!--</el-tooltip>-->

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper" >
            <svg-icon class="user-avatar" style="width: 40px;height: 40px;" icon-class="people"/>
            <span style="font-size: 32px;line-height: 40px;">admin</span>
            <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="userOperation" style="display:block;">修改密码</span>
            </el-dropdown-item>
            <!--<router-link to="/">-->
              <!--<el-dropdown-item>-->
                <!--{{$t('navbar.dashboard')}}-->
              <!--</el-dropdown-item>-->
            <!--</router-link>-->
            <!--delete by ligaoming 20180614 删除项目地址链接-->
            <!--<a target='_blank' href="https://github.com/PanJiaChen/vue-element-admin/">-->
              <!--<el-dropdown-item>-->
                <!--{{$t('navbar.github')}}-->
              <!--</el-dropdown-item>-->
            <!--</a>-->
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <!--修改密码模态框-->
    <el-dialog title="修改密码" :visible.sync="dialog.editPaw.show" :modal-append-to-body="false" width="500px" custom-class="editPawDialog">
      <el-form :model="editPaw" :rules="editPawRules" ref="editPaw" label-width="100px" >
        <el-form-item label="旧密码" prop="oldPaw">
          <el-input v-model="editPaw.oldPaw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPaw">
          <el-input v-model="editPaw.newPaw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmNewPaw">
          <el-input v-model="editPaw.confirmNewPaw" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="textC">
        <el-button type="primary" @click="editPawSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  data() {
    return {
      dialog: {
        editPaw: {
          show: false
        }
      },
      editPaw: {
        oldPaw: '',
        newPaw: '',
        confirmNewPaw: ''
      },
      editPawRules: {
        oldPaw: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPaw: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          {
            // eslint-disable-next-line
            validator(rule, value, callback, source, options) {
              var errors = []
              if (!/^[a-z0-9]+$/.test(value)) {
                console.log('不符合输入规则')
                errors.push('请输入字母或特殊字符')
              }
              callback(errors)
            }
          }
        ],
        confirmNewPaw: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          {
            // eslint-disable-next-line
            validator(rule, value, callback, source, options) {
              const errors = []
              if (!/^[a-z0-9]+$/.test(value)) {
                console.log('不符合输入规则')
                errors.push('请输入字母或特殊字符')
              }
              callback(errors)
            }
          }
        ]
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    /**
     *  修改下发
     */
    editPawSubmit() {
      this.$refs.editPaw.validate((valid) => {
        if (valid) {
          console.log('修改密码表单提交')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 打开模态框
     */
    userOperation() {
      this.dialog.editPaw.show = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
