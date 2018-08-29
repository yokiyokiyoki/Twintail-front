<template>
    <div class="people-edit-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="小姐姐">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="协会成员">
                <el-switch
                v-model="form.is_member"
                active-text="是"
                inactive-text="否"
                :active-value="1"
                :inactive-value="0">
                </el-switch>
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
            weibo:'',
            is_member:0
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
        if(this.form.username.trim()==''){
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
            if(i=='is_memeber'){
                param.append(i,Number(this.form[i]))
                continue
            }
            param.append(i,this.form[i])
        }

        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$proxy.post('/api/insertUser', param,config)
        .then((res)=> {
            if(res.data.success){
                this.$message({
                    message: '恭喜你，添加成功',
                    type: 'success'
                });
            }else{
                this.$message.error(res.data.message)
            }
            console.log(res);
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
