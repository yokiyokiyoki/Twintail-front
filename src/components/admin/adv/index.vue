<template>
    <div class="adv-container">
        <div class="adv-container-header">
            <el-button type="primary" @click="$router.push({path:'/admin/advEdit',query:{isEdit:0}})">新增</el-button>
        </div>
        <div class="adv-container-body">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>广告列表</span>
                </div>
                <div class="table" v-if='advList.length'>
                    <el-table
                        :data="advList"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="content"
                        label="文案"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="jump_url"
                        label="跳转链接"
                        >
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <!-- <el-button @click="handleEit(scope.row)" type="text" size="small">编辑</el-button> -->
                            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
            advList:[]
        }
    },
    methods:{
        getAllAdvs(){
            this.$proxy.get('/api/getAllAdvs').then(res=>{
                this.advList=res.data.data
            })
        },
        handleEit(row){
            this.$router.push({path:'/admin/advEdit',query:{isEdit:1,id:row.id}})
            console.log(row)
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
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
        this.getAllAdvs()
    }
}
</script>
<style lang="less" scoped>
.adv-container {
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