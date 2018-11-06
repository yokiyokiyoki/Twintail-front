<template>
    <div class="admin-container">
        <div class="admin-container-header">
            <div class="button people" v-for='(item,index) in menu' :key='index' :class="{active:active==item.id}" @click="handleItem(item)">
                {{item.name}}
            </div>
        </div>
        <router-view class="admin-container-body"></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active:'people',
            menu:[{name:'小姐姐',id:'people'},{name:'写真集',id:'album'},{name:'广告位',id:'adv'}]
        }
    },
    methods:{
        handleItem(item){
            this.active=item.id
            this.$router.push(`/admin/${item.id}`)
        }
    },
    mounted(){
        //判断是否已经登陆
        if(!sessionStorage.getItem('isLogin')){
            this.$router.push('/admin/login')
        }
    }
}
</script>

<style lang="less" scoped>
.admin-container {
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #383838;
    color: #fff;
    z-index: 10;
    text-align: left;
    .button {
      color: #fff;
      cursor: pointer;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      font-size: 13px;
      margin: 0 10px;
      box-sizing: border-box;
      background: #383838;
      &.active {
        border-bottom: 2px solid #00ad9e;
        background: #505050;
      }
    }
  }
  &-body {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    // background: #f6f6f6;
    font-size: 13px;
    color: #444;
  }
}
</style>
