<template>
    <div class="mobile home-container">
        <common-header/>
        <div class="home-container-body">
            <div class="home-container-body-top">
                <div class="home-container-body-top-carousel">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for='(item,index) in bannerList' :key='index'>
                            <img :src="subItem.photo_url" v-for='(subItem,subIndex) in item.photo' v-if='subItem.is_cover==1' :key='subIndex'  @click="handleBanner(item)" >
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <div class="home-container-body-top-boxContainer clearfix" >
                    <div class="home-container-body-top-boxContainer-box" v-for='(item,index) in advList' :key='index'>
                        <div class="home-container-body-top-boxContainer-box-pic" @click="jumpUrl(item)" style="height:90%;cursor:pointer;">
                            <img :src="item.photo_url" >
                        </div>
                        <div class="home-container-body-top-boxContainer-box-txt">{{item.content}}</div>
                    </div>
                </div>
            </div>
            <div class="home-container-body-bottom">
                <van-tabs v-model="menuActive" class="card" >
                    <van-tab v-for="(item,index) in menulist" :title="item.name"  :key='index'>
                        <div class="home-container-body-bottom-left-body-card" v-for='(item,index) in activeAlbum' :key='index'>
                            <div class="box">
                                <div class="box-pic" @click="handleClickItem(item)">
                                    <img :src="subItem.photo_url" v-for='(subItem,subIndex) in item.photo' v-if='subItem.is_cover==1' :key='subIndex'  @click="handleBanner(item)" >
                                </div>
                                <div class="box-bottom clearfix">
                                    <div class="box-bottom-left">{{item.info.album_name}}</div>
                                    <div class="box-bottom-right">
                                        <i class="el-icon-star-on" @click="handleClickStar(item)"></i>
                                        <span class="num">{{item.info.star}}</span>
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
            menulist:[{name:'最新',id:1},{name:'本周热门',id:2},{name:'热门推荐',id:3},{name:'双马尾协会成员专区',id:4}],
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
            let res
            if(this.menuActive==3){
                //双马尾协会成员
                res=this.albumLists.filter((item,index)=>{
                    return item.info.is_member==1
                })
            }else{
                res=this.albumLists.filter((item,index)=>{
                    return item.info.is_member==0
                })
                if(this.menuActive==0){
                    //最新
                    res=this.$R.clone(res)
                }
                if(this.menuActive==1){
                    //本周热门
                    res=res.filter((item,index)=>{
                        return +this.$moment().startOf('isoWeek')<item.info.creatAt<+this.$moment().endOf('isoWeek')
                    })
                    res=res.filter((item,index)=>{
                        return item.info.star>5
                    })
                    res=res.sort((a,b)=>{
                       return b.info.star-a.info.star
                    })
                }
                if(this.menuActive==2){
                    //热门推荐
                    res=res.filter((item,index)=>{
                        return item.info.star>5
                    })
                    res=res.sort((a,b)=>{
                        return b.info.star-a.info.star
                    })
                }
            }
            
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
        jumpUrl(item){
            window.open(item.jump_url) 
        },
        handleBanner(item){
            // console.log(item)
            this.$router.push(`/detail/${item.info.id}`)
        },
        handleClickStar(item){
            this.$proxy.post('/api/addAlbumStar',{id:item.info.id})
            .then((res)=> {
                if(res.data.success){
                    console.log('点赞成功')
                    item.info.star+=1
                }else{
                    this.$message.error(res.data.message)
                }
            })
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
                this.peopleList=res.data.data.filter((item,index)=>{
                    //展示协会成员
                    return item.is_member==1
                })
            })
        },
        getAllAdvs(){
            this.$proxy.get('/api/getAllAdvs').then(res=>{
                this.advList=res.data.data
            })
        },
        getAllAlbums(){
            this.$proxy.get('/api/getAllAlbums').then(res=>{
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
