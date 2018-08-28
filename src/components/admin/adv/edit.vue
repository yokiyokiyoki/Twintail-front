<template>
    <div class="adv-edit-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="广告词">
                <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="跳转链接">
                <el-input v-model="form.jump_url"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-upload
                class="avatar-uploader"
                action="/postPhoto"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="$router.push('/admin/adv')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imageUrl:'',
            imgFile:'',
            form:{
                content:'',
                jump_url:''
            }
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.imgFile=file.raw
            console.log(this.imageUrl,file)
        },
        onSubmit(){
            if(this.form.content.trim()==''){
                this.$message.error('请填写广告词');
                return
            }
            if(!this.imgFile){
                this.$message.error('请上传图片');
                return
            }
            let param = new FormData() // 创建form对象
            param.append('photo_url',this.imgFile)
            for(let i in this.form){
                param.append(i,this.form[i])
            }
            console.log(param)
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            this.$proxy.post('/insertAdv', param,config)
            .then(function (response) {
                console.log(response);
            })
            console.log('submit!');
        }
    }
}
</script>
<style lang="less" scoped>
.adv-edit-container {
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