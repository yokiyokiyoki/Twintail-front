<template>
    <div class="pc home-container">
        <common-header/>
        <div class="home-container-body">
            <div class="home-container-body-top">
                <div class="home-container-body-top-carousel">
                    <el-carousel :interval="4000"  height="400px">
                        <el-carousel-item v-for='(item,index) in bannerList' :key='index' >
                            <img :src="item.photo[0].photo_url" style="height:100%;width:100%;" v-if='item.photo[0]'>
                        </el-carousel-item>
                    </el-carousel>
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
                <div class="home-container-body-bottom-left">
                    <div class="home-container-body-bottom-left-header">
                        <div class="home-container-body-bottom-left-header-item" v-for='(item,index) in menulist' style="flex:1;" :class="{'active':menuActive==item.id}" @click="handleClickMenu(item)" :key="index">{{item.name}}</div>
                    </div>
                    <div class="home-container-body-bottom-left-body">
                        <div class="home-container-body-bottom-left-body-card" v-for='(item,index) in activeAlbum' :key='index' >
                            <div class="box">
                                <div class="box-pic" @click="handleClickItem(item)">
                                     <img :src="item.photo[0].photo_url" style="height:100%;width:100%;" v-if='item.photo[0]'>
                                </div>
                                <div class="box-bottom clearfix">
                                    <div class="box-bottom-left">{{item.info.album_name}}</div>
                                    <div class="box-bottom-right">
                                        <i class="el-icon-star-on" @click='handleClickStar(item)'></i>
                                        <span class="num">{{item.info.star}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-container-body-bottom-right">
                    <div class="home-container-body-bottom-right-header">
                        双马尾协会成员
                    </div>
                    <div class="home-container-body-bottom-right-body">
                        <div class="box" v-for='(item,index) in peopleList' :key='index' @click="jumpInfo(item)">
                            <div class="box-left">
                                <img class="pic" :src="item.tx_pic" style="border-radius:100%;">
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
        <div class="home-container-footer"></div>
    </div>
</template>
<script>
import commonHeader from './header'
export default {
    data(){
        return{
            menulist:[{name:'最新',id:1},{name:'本周热门',id:2},{name:'热门推荐',id:3},{name:'双马尾协会成员专区',id:0}],
            menuActive:1,
            peopleList:[],
            advList:[],
            albumLists:[]
          }
    },
    components:{
        commonHeader
    },
    created(){
        this.getAllUsers()
        this.getAllAdvs()
        this.getAllAlbums()
    },
    computed:{
        activeAlbum(){
            let res=this.albumLists.filter((item,index)=>{
                return item.info.status==this.menuActive
            })
            return res
        },
        bannerList(){
            let res=this.albumLists.filter((item,index)=>{
                return item.info.is_banner==1
            })
            return res
        }
    },
    methods:{
        handleClickStar(item){
            console.log(item)
        },
        changeMunu(item){
            console.log(item)
        },
        jumpInfo(item){
            this.$router.push({name:'Info',params:{id:item.id}})
        },
        getAllUsers(){
            this.$proxy.get('/api/getAllUsers').then(res=>{
                console.log(res)
                this.peopleList=res.data.data.filter((item,index)=>{
                    //展示协会成员
                    return item.is_member==1
                })
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
            this.menuActive=item.id
        },
        handleCarousel(item){

        }
    }
}
</script>
<style lang="less" scoped>
.el-carousel__item div {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
  cursor: pointer;
  user-select: none;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
