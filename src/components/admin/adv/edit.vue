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
                <uploader  :initUrl='imageUrl' @getRawFile="imgupload"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="$router.push('/admin/adv')">取消</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>
<script>
import uploader from '@/components/uploader'
export default {
    components:{
        uploader
    },
    data(){
        return{
            imageUrl:'',
            imgFile:'',
            form:{
                content:'',
                jump_url:''
            },
            info:{}
        }
    },
    created(){
        if(this.$route.query.isEdit==1){
            this.getDetail()
        }
    },
    methods:{
        imgupload(data){
            console.log(data)
            this.imgFile=data
        },
        getDetail(){
          this.$proxy.get('/api/getAdvDetail',{params:{id:this.$route.query.id}})
          .then( (res)=> {
              this.info=res.data.data
              this.form=this.info
              this.imageUrl=`${location.host}${this.info.photo_url}`
              console.log(this.info);
          })
        },
        handleAdd(){
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
            console.log(param,this.imgFile)
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            this.$proxy.post('/api/insertAdv', param,config)
            .then( (res)=> {
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
        },
        handleEdit(){
            
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            //当前广告的id
            const id=this.$route.query.id
            let param = new FormData() // 创建form对象
            if(!this.imgFile){
                //没有编辑，不能提交
                param.delete('photo_url')
            }
            for(let i in this.form){
                param.append(i,this.form[i])
            }
            this.$proxy.post('/api/updateAdv', param,config)
            .then( (res)=> {
                if(res.data.success){
                    this.$message({
                        message: '恭喜你，更新成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error(res.data.message)
                }
                console.log(res);
            })
            console.log('编辑',id)
            
        },
        onSubmit(){
            if(this.$route.query.isEdit==0){
                this.handleAdd()
            }else{
                this.handleEdit()
            }
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