<template>
    <div class="search-container">
        <common-header/>
        <vux-search placeholder='请搜索小姐姐' v-model="value" :results='results' @on-change='getResults'
        @result-click="resultClick"/>
    </div>
</template>
<script>
import { Search } from 'vux'
import commonHeader from './header'
export default {
    components:{
        VuxSearch:Search,
        commonHeader
    },
    data () {
        return {
            value: '',
            results:[],
            list:[]
        }
    },
    created(){
        this.loadAll()
        console.log(this.list)
    },
    methods:{
        resultClick(item){
            this.$router.push(`/info/${item.other}`)
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
.search-container {
}
</style>
