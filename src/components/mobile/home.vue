<template>
    <div class="mobile home-container">
        <common-header/>
        <div class="home-container-body">
            <div class="home-container-body-top">
                <div class="home-container-body-top-carousel">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for='(item,index) in bannerList' :key='index'>
                            <img :src="item.photo[0].photo_url" style="height:100%;width:100%;" v-if='item.photo[0]'>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <div class="home-container-body-top-boxContainer clearfix" >
                    <div class="home-container-body-top-boxContainer-box" v-for='(item,index) in advList' :key='index'>
                        <div class="home-container-body-top-boxContainer-box-pic">
                            <img :src="item.photo_url" style="height:100%;width:100%;">
                        </div>
                        <div class="home-container-body-top-boxContainer-box-txt">{{item.content}}</div>
                    </div>
                </div>
            </div>
            <div class="home-container-body-bottom">
                <van-tabs v-model="menuActive" class="card">
                    <van-tab v-for="(item,index) in menulist" :title="item.name"  :key='index'>
                        <div class="home-container-body-bottom-left-body-card" v-for='(item,index) in activeAlbum' :key='index' @click="handleClickItem(item)" >
                            <div class="box">
                                <div class="box-pic">
                                    <img :src="item.photo[0].photo_url" style="height:100%;width:100%;" v-if='item.photo[0]'>
                                </div>
                                <div class="box-bottom clearfix">
                                    <div class="box-bottom-left">{{item.info.album_name}}</div>
                                    <div class="box-bottom-right">
                                        <i class="el-icon-star-on"></i>
                                        <span class="num">{{item.info.view}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
                <div class="home-container-body-bottom-member" >
                    <div class="title">双马尾协会成员</div>
                    <div class="home-container-body-top-boxContainer clearfix" >
                        <div class="home-container-body-top-boxContainer-box" v-for='(item,index) in peopleList' :key='index' @click="jumpInfo(item)">
                           <div class="box-left">
                                <div class="pic">
                                    <img :src="item.tx_pic" style="height:100%;width:100%;border-radius:100%;">
                                </div>
                            </div>
                            <div class="box-right">
                                <div class="box-right-container">
                                    <div class="box-right-container-header clearfix">
                                        <div class="left">{{item.username}}</div>
                                    </div>
                                    <div class="box-right-container-body">
                                        {{item.intro}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import commonHeader from './header'
export default {
    components:{
        commonHeader
    },
    data(){
        return{
            menulist:[{name:'最新',id:1},{name:'本周热门',id:2},{name:'热门推荐',id:3}],
            menuActive:0,
            peopleList:[],
            advList:[],
            albumLists:[]
        }
    },
    created(){
        this.getAllUsers()
        this.getAllAdvs()
        this.getAllAlbums()
    },
    computed:{
        activeAlbum(){
            let res=this.albumLists.filter((item,index)=>{
                
                return item.info.status==this.menuActive+1
            })
            return res
        },
        bannerList(){
            let res=this.albumLists.filter((item,index)=>{
                console.log(item.info)
                return item.info.is_banner==1
            })
            return res
        }
    },
    methods:{
        changeMunu(item){
            console.log(item)
        },
        jumpInfo(item){
            this.$router.push({name:'Info',params:{id:item.id}})
        },
        getAllUsers(){
            this.$proxy.get('/api/getAllUsers').then(res=>{
                console.log(res)
                this.peopleList=res.data.data
            })
        },
        getAllAdvs(){
            this.$proxy.get('/api/getAllAdvs').then(res=>{
                console.log(res)
                this.advList=res.data.data
            })
        },
        getAllAlbums(){
            this.$proxy.get('/api/getAllAlbums').then(res=>{
                console.log(res)
                this.albumLists=res.data.data
            })
        },
        handleClickItem(item){
            console.log(item)
            this.$router.push(`/detail/${item.info.id}`)
        },
        handleClickMenu(item){
            console.log(item)
            this.activeItem=item
        }
    }
}
</script>
