<template>
    <div class="people-edit-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="小姐姐">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="ID">
                <el-input v-model="form.self_ID"></el-input>
            </el-form-item>
            <el-form-item label="微博">
                <el-input v-model="form.weibo"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="form.intro"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                class="avatar-uploader"
                action="/api/postPhoto"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="$router.push('/admin/people')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
      return {
        imageUrl: '',
        imgFile:'',
        form: {
            username: '',
            self_ID:'',
            intro:'',
            weibo:''
        }
      }
    },
    methods: {
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgFile=file.raw
        console.log(this.imageUrl,file)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // return isJPG && isLt2M;
        return isLt2M
      },
      onSubmit() {
        if(this.form.name.trim()==''){
            this.$message.error('请填写小姐姐名字');
            return
        }
        if(this.form.self_ID.trim()==''){
            this.$message.error('请填写小姐姐ID');
            return
        }
        if(this.form.intro.trim()==''){
            this.$message.error('请填写小姐姐介绍');
            return
        }
        if(this.form.weibo.trim()==''){
            this.$message.error('请填写小姐姐微博');
            return
        }
        if(!this.imgFile){
            this.$message.error('请上传头像');
            return
        }
        let param = new FormData() // 创建form对象
        param.append('tx_pic',this.imgFile)
        for(let i in this.form){
            param.append(i,this.form[i])
        }
        console.log(param)
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$proxy.post('/api/insertUser', param,config)
        .then(function (response) {
            console.log(response);
        })
        console.log('submit!');
      }
    }
}
</script>
<style lang="less" scoped>
.people-edit-container {
  padding: 20px;
  .avatar-uploader {
    text-align: left;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
}
</style>
