<template>
    <div class="people-container">
        <div class="people-container-header">
            <el-button type="primary" @click="$router.push('/admin/peopleEdit')">新增</el-button>
        </div>
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.people-container {
  &-header {
    text-align: left;
    padding: 20px;
  }
}
</style>
