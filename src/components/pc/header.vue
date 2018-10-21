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
            <el-autocomplete
            v-model="search"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索"
            @select="handleSelect"
            >
             <i
                class="el-icon-search"
                slot="suffix">
            </i>
            </el-autocomplete>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list: [],
            search:'',
            timeout:  null
        }
    },
    methods: {
      querySearchAsync(queryString, cb) {
        var list = this.list;
        var results = queryString ? list.filter(this.createStateFilter(queryString)) : list;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        let arr=[]
        this.$proxy.get('/api/getAllUsers').then(res=>{
            // console.log(res)
            res.data.data.forEach((item)=>{
              arr.push({'value':item.username,'id':item.id})
            })
        })
        return arr
        // return [
        //   { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        // ];
      },
      handleSelect(item) {
        this.$router.push(`/info/${item.id}`)
      },
    },
    mounted() {
      this.list = this.loadAll();
    }
}
</script>
<style lang="less" scoped>
.container-header {
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  box-sizing: border-box;
  background: white;
  &-left {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-left: 100px;
    .pic {
      height: 80px;
      width: 80px;
      border: 1px solid #eaeaea;
      border-radius: 80px;
      cursor: pointer;
      img {
        height: 80px;
      }
    }
    .title {
      margin-left: 20px;
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
    height: 100px;
    line-height: 100px;
    margin-right: 50px;
  }
}
</style>

