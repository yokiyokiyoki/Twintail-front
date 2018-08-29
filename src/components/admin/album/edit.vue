<template>
    <div class="album-edit-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="写真集名">
                <el-input v-model="form.album_name"></el-input>
            </el-form-item>
            <el-form-item label="属于">
                <el-select v-model="form.people_id" placeholder="请选择">
                    <el-option
                    v-for="item in peopleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="form.status" placeholder="请选择">
                    <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="banner">
                <el-switch
                v-model="form.is_banner"
                active-text="是"
                inactive-text="否"
                :active-value="1"
                :inactive-value="0">
                </el-switch>
            </el-form-item>
            
            <el-form-item label="下属图片">
                <el-upload
                class="upload-demo"
                action="/api/postPhoto"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
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
            fileList: [],
            imgFile:'',
            form:{
                people_id:'',
                album_name:'',
                status:0,
                is_banner:false,
            },
            peopleList:[],
            statusList:[{name:'普通',id:0},{name:'最新',id:1},{name:'本周热门',id:2},{name:'热门推荐',id:3}]
        }
    },
    mounted(){
        this.getAllUsers()
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.fileList=fileList
        },
        handlePreview(file) {
            console.log(file);
        },
        getAllUsers(){
            this.$proxy.get('/api/getAllUsers').then(res=>{
                this.peopleList=res.data.data
            })
        },
        handleAvatarSuccess(res, file,fileList) {
            this.fileList=fileList
            console.log(res,file,fileList)
        },
        onSubmit(){
            if(this.form.album_name.trim()==''){
                this.$message.error('请填写真名');
                return
            }
            console.log(this.form,this.fileList)
            if(this.form.people_id==''){
                this.$message.error('请选择所属人');
                return
            }
            if(!this.fileList.length){
                this.$message.error('请上传图片');
                return
            }
            console.log(this.fileList)
            let param = new FormData() // 创建form对象
            for(let i in this.form){
                if(i=='people_id'){
                    param.append(i,Number(this.form[i]))
                    continue
                }
                param.append(i,this.form[i])
            }
            this.fileList.forEach((item,index)=>{
                param.append(`photo_url${index}`,item.raw)
            })
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            this.$proxy.post('/api/insertAlbum', param,config)
            .then(function (response) {
                
                console.log(response);
            })
            console.log('submit!');
        }
    }
}
</script>
<style lang="less" scoped>
.album-edit-container {
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