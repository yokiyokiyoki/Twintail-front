<template>
    <div class="album-container">
        <div class="album-container-header">
            <el-button type="primary" @click="$router.push('/admin/albumEdit')">新增</el-button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.album-container {
  &-header {
    text-align: left;
    padding: 20px;
  }
}
</style>