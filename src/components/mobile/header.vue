<template>
    <div class="container-header clearfix">
        <div class="container-header-left">
            <div class="pic" @click="$router.push('/')">
                <img src="~@/assets/images/logo.png" alt="双马尾协会">
            </div>
            <div class="title">
                <div class="title-top">双马尾协会</div>
                <div class="title-bottom">中国首个双马尾爱好者聚集地</div>
            </div>
        </div>
        <div class="container-header-right">
            <van-icon name="search" @click="showInput"/>
        </div>
        <vux-search placeholder='请搜索小姐姐' v-model="value" :results='results' @on-change='getResults'
        @result-click="resultClick"  ref="search" @on-cancel="onCancel" v-show='show'/>
    </div>
    
</template>
<script>
import { Search } from 'vux'
export default {
    components:{
        VuxSearch:Search,
    },
    data () {
        return {
            value: '',
            results:[],
            list:[],
            show:false
        }
    },
    created(){
        this.loadAll()
    },
    methods:{
        showInput(){
            this.show=true
            this.$nextTick(()=>{
                this.$refs.search.setFocus()
            })
            this.results=this.list
        },
        onCancel(){
            this.show=false
        },
        
        resultClick(item){
            this.$router.push(`/info/${item.other}`)
            this.show=false
        },
        loadAll() {
            this.$proxy.get('/api/getAllUsers').then(res=>{
                res.data.data.forEach((item)=>{
                    this.list.push({'title':item.username,'other':item.id})
                })
            })
        },
        getResults (val) {
            this.results = val ? this.list.filter(item=>{
                return item.title.includes(val)
            }) : this.list
        },
    }
    
}
</script>

<style lang="less" scoped>
.container-header {
  height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #eaeaea;
  background: white;

  &-left {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    margin-left: 10px;
    .pic {
      height: 30px;
      width: 30px;
      border: 1px solid #eaeaea;
      border-radius: 30px;
      cursor: pointer;
      img {
        height: 30px;
      }
    }
    .title {
      margin-left: 10px;
      font-size: 12px;
      &-top {
        text-align: left;
        color: rgb(239, 156, 190);
      }
      &-bottom {
        font-size: 12px;
      }
    }
  }
  &-right {
    float: right;
    height: 46px;
    line-height: 56px;
    margin-right: 15px;
    font-size: 20px;
    color: rgb(239, 156, 190);
  }
  .vux-search-box {
    z-index: 100;
  }
}
</style>
