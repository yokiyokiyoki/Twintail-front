<template>
    <div class="album-container">
        <div class="album-container-header">
            <el-button type="primary" @click="$router.push({path:'/admin/albumEdit',query:{isEdit:0}})">新增</el-button>
        </div>
        <div class="album-container-body">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>小姐姐列表</span>
                </div>
                <div class="table" v-if='albumList.length'>
                    <el-table
                        :data="albumList"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="album_name"
                        label="写真名字"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="is_banner"
                        label="是否是banner"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="star"
                        label="喜欢"
                        >
                        </el-table-column>
                        <el-table-column
                        
                        label="创建时间"
                        >
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ $moment(+scope.row.creatAt).format('YYYY-MM-DD hh:mm:ss') }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleEit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="handleDelete(scope.row,scope.$index)" type="text" size="small">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="empyt" v-else>暂无数据</div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            albumList:[]
        }
    },
    methods:{
        getAllAlbums(){
            this.$proxy.get('/api/getAllAlbums').then(res=>{
                res.data.data.forEach((item)=>{
                    this.albumList.push(item.info)
                })
            })
        },
        handleEit(row){
            this.$router.push({path:'/admin/albumEdit',query:{isEdit:1,id:row.id}})
            console.log(row)
        },
        handleDelete(row,index){
            this.$confirm('此操作将永久删除该写真, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$proxy.post('/api/deleteAlbum',{id:row.id})
                .then((res)=> {
                    if(res.data.success){
                        this.albumList.splice(index,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            console.log(row)
        }
    },
    created(){
        this.getAllAlbums()
    }
}
</script>
<style lang="less" scoped>
.album-container {
  &-header {
    text-align: left;
    padding: 20px;
  }
  &-body {
    text-align: left;
    padding: 20px;
    .empty {
      text-align: center;
    }
  }
}
</style>