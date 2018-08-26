<template>
    <div class="adv-container">
        <div class="adv-container-header">
            <el-button type="primary" @click="$router.push('/admin/advEdit')">新增</el-button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.adv-container {
  &-header {
    text-align: left;
    padding: 20px;
  }
}
</style>