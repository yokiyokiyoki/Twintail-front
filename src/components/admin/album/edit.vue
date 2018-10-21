<template>
    <div class="album-edit-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="写真集名">
                <el-input v-model="form.album_name"></el-input>
            </el-form-item>
            <el-form-item label="属于" >
                <el-select v-model="form.people_id" placeholder="请选择" >
                    <el-option
                    v-for="item in peopleList"
                    :key="item.id"
                    :label="item.username"
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
            <el-form-item label="第几张是封面">
                <el-input-number v-model="form.coverIndex" @change="handleChange" :min="1" :max="fileList.length" label="从第一张开始"></el-input-number>
            </el-form-item>
            <el-form-item label="下属图片">
                <uploader  :multiple='true' :initUrl='originFileListImg'  @getRawFile="imgupload"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即{{$route.query.id?'修改':'创建'}}</el-button>
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
        //status是0代表双马尾协会成员的
        return{
            
            //原本的数据，和上传的数据做比较，看看更新的时候有没有删除的罢了
            originFileList:[],
            originFileListImg:[],
            fileList: [],
            imgFile:'',
            form:{
                people_id:'',
                album_name:'',
                is_banner:false,
                creatAt:+new Date(),
                // 第几张是封面，后端计算
                coverIndex:1,
            },
            peopleList:[],
            statusList:[{name:'最新',id:1},{name:'本周热门',id:2},{name:'热门推荐',id:3}],
        }
    },
    mounted(){
        if(this.$route.query.isEdit==1){
            this.getAllAlbums()
        }
        this.getAllUsers()
    },
    methods:{
        handleChange(value) {
            this.form.coverIndex=value
        },
        imgupload(data){
            // console.log(data,'11')
            this.fileList=data
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.fileList=fileList
        },
        handlePreview(file) {
            console.log(file);
        }, 
        getAllAlbums(){
            this.$proxy.get('/api/getAllAlbums').then(res=>{
                this.peopleList=res.data.data
                let filterItem=this.peopleList.filter((item,index)=>{
                    return item.info.id==this.$route.query.id
                })[0]
                this.form.people_id=filterItem.info.people_id
                this.form.album_name=filterItem.info.album_name
                this.form.is_banner=filterItem.info.is_banner
                this.originFileList=[]
                this.fileList=[]
                this.originFileListImg=[]
                filterItem.photo.forEach((item,index)=>{
                    this.fileList.push(`${item.photo_url}`)
                    this.originFileList.push(item)
                    this.originFileListImg.push(`${item.photo_url}`)
                })
                // console.log(this.peopleList,filterItem)
            })
        },
        getAllUsers(){
            this.$proxy.get('/api/getAllUsers').then(res=>{
                this.peopleList=res.data.data
                let filterItem=this.peopleList.filter((item,index)=>{
                    return item.id
                })[0]
                console.log(this.peopleList)
            })
        },
        handleAvatarSuccess(res, file,fileList) {
            this.fileList=fileList
            console.log(res,file,fileList)
        },
        handleAdd(){
            if(this.form.album_name.trim()==''){
                this.$message.error('请填写真名');
                return
            }
            // console.log(this.form,this.fileList)
            if(this.form.people_id==''){
                this.$message.error('请选择所属人');
                return
            }
            if(!this.fileList.length){
                this.$message.error('请上传图片');
                return
            }
            let param = new FormData() // 创建form对象
            for(let i in this.form){
                if(i=='people_id'){
                    param.append(i,Number(this.form[i]))
                    continue
                }
                param.append(i,this.form[i])
            }
            this.fileList.forEach((item,index)=>{
                param.append(`photo_url${index}`,item.data.raw)
            })
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            this.$proxy.post('/api/insertAlbum', param,config)
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
        },
        handleEdit(){
             if(this.form.album_name.trim()==''){
                this.$message.error('请填写真名');
                return
            }
            // console.log(this.form,this.fileList)
            if(this.form.people_id==''){
                this.$message.error('请选择所属人');
                return
            }
            if(!this.fileList.length){
                this.$message.error('请上传图片');
                return
            }
            let param = new FormData() // 创建form对象
            for(let i in this.form){
                if(i=='people_id'){
                    param.append(i,Number(this.form[i]))
                    continue
                }
                param.append(i,this.form[i])
            }
            //没有被删除的，本来有
            let updateList=[]
            let count=1//计数器
            param.append('album_id',this.$route.query.id)
            this.fileList.forEach((item,index)=>{
                if(item.data&&item.data.name){
                    //是新上传的文件
                    param.append(`photo_url${count}`,item.data.raw)
                    count++
                }
                if(typeof item=='string'){
                    this.originFileList.forEach((subItem)=>{
                        if(item.includes(subItem.photo_url)){
                            updateList.push(subItem)
                        }
                    })
                }else{
                    if(!item.url.includes('blob')){
                        this.originFileList.forEach((subItem)=>{
                            if(item.url.includes(subItem.photo_url)){
                                updateList.push(subItem)
                            }
                        })
                    }
                }
                
            })
            let updateStr=updateList.reduce((acc,item)=>{
                return `${acc}${item.id},`
            },'')
            //删除的图片列表，会一并传过去,通过交集求得
            let deletList=[]
            this.originFileList.forEach((item)=>{
                if(!updateStr.includes(item.id)){
                    deletList.push(item.id)
                }   
            })
            param.append(`deleteList`,deletList.join(','))
            console.log(this.fileList,this.originFileList,updateList,'22',deletList,updateStr)
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            
            this.$proxy.post('/api/updateAlbum', param,config)
            .then((res)=> {
                if(res.data.success){
                    this.$message({
                        message: '恭喜你，更新成功',
                        type: 'success'
                    });
                    this.getAllAlbums()
                }else{
                    this.$message.error(res.data.message)
                }
                console.log(res);
            })
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