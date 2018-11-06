<template>
    <div class="login">
        <el-form  :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="formInline.user" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formInline.pwd" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
      return {
        formInline: {
          user: '',
          pwd: ''
        }
      }
    },
    methods: {
      onSubmit() {
          if(this.formInline.user=='shuangmaweixh'&&this.formInline.pwd=='Aa88776655'){
              sessionStorage.setItem('isLogin',true)
              this.$router.push('/admin')
          }else{
              this.$message.error('用户或者密码错了哦');
          }
      }
    }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
