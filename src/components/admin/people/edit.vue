<template>
    <div class="people-edit-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="小姐姐">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="ID">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="微博">
                <el-input v-model="form.weibo"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="form.intro"></el-input>
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
        form: {
            name: '',
            id:'',
            intro:'',
            weibo:''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$proxy.get('/api/getUser', {
            params: {
                id: 1
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        }); 
        console.log('submit!');
      }
    }
}
</script>
<style lang="less" scoped>
.people-edit-container {
  padding: 20px;
}
</style>
