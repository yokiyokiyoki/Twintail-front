<template>
    <div class="people-container">
        <div class="people-container-header">
            <el-button type="primary" @click="$router.push({path:'/admin/peopleEdit',query:{isEdit:0}})">新增</el-button>
        </div>
        <div class="people-container-body">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>小姐姐列表</span>
                </div>
                <div class="table" v-if='peopleList.length'>
                    <el-table
                        :data="peopleList"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="username"
                        label="名字"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="weibo"
                        label="微博"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="self_ID"
                        label="ID"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="intro"
                        label="介绍"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="is_member"
                        label="是否是协会成员"
                        width="300">
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
            peopleList:[]
        }
    },
    methods:{
        getAllUsers(){
            this.$proxy.get('/api/getAllUsers').then(res=>{
                console.log(res)
                this.peopleList=res.data.data
            })
        },
        handleEit(row){
            this.$router.push({path:'/admin/peopleEdit',query:{isEdit:1,id:row.id}})
            console.log(row)
        },
        handleDelete(row){
            console.log(row)
        }
    },
    created(){
        this.getAllUsers()
    }
}
</script>
<style lang="less" scoped>
.people-container {
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
