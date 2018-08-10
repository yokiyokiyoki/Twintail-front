<template>
    <div class="container-header">
        <div class="container-header-left"></div>
        <div class="container-header-right">
            <van-search placeholder="请输入商品名称" v-model="search" />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            search:''
        }
    }
}
</script>

<style lang="less" scoped>
.container-header {
  height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
}
</style>
