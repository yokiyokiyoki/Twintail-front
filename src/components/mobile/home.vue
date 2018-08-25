<template>
    <div class="mobile home-container">
        <common-header/>
        <div class="home-container-body">
            <div class="home-container-body-top">
                <div class="home-container-body-top-carousel">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for='item in 4' :key='item'>{{item}}</van-swipe-item>
                    </van-swipe>
                </div>
                <div class="home-container-body-top-boxContainer clearfix" >
                    <div class="home-container-body-top-boxContainer-box" v-for='n in 5' :key='n'>
                        <div class="home-container-body-top-boxContainer-box-pic"></div>
                        <div class="home-container-body-top-boxContainer-box-txt">我是广告词</div>
                    </div>
                </div>
            </div>
            <div class="home-container-body-bottom">
                <van-tabs v-model="menuActive" class="card">
                    <van-tab v-for="(item,index) in menulist" :title="item" :key='index'>
                        <div class="home-container-body-bottom-left-body-card" v-for='n in 8' :key='n' @click="handleClickItem(n)">
                            <div class="box">
                                <div class="box-pic"></div>
                                <div class="box-bottom clearfix">
                                    <div class="box-bottom-left">小姐姐</div>
                                    <div class="box-bottom-right">
                                        <i class="el-icon-star-on"></i>
                                        <span class="num">200</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
                <div class="home-container-body-bottom-member" >
                    <div class="title">双马尾协会成员</div>
                    <div class="home-container-body-top-boxContainer clearfix" >
                        <div class="home-container-body-top-boxContainer-box" v-for='n in 5' :key='n'>
                           <div class="box-left">
                                <div class="pic"></div>
                            </div>
                            <div class="box-right">
                                <div class="box-right-container">
                                    <div class="box-right-container-header clearfix">
                                        <div class="left">yoki</div>
                                        <div class="right">22</div>
                                    </div>
                                    <div class="box-right-container-body">
                                        我是一个小仙女，有没有小哥哥,，嘤嘤嘤?
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
            menulist:['最新','本周热门','热门推荐'],
            menuActive:'最新'
        }
    },
    methods:{
        handleClickItem(item){
            console.log(item)
            this.$router.push('/detail')
        },
        handleClickMenu(item){
            console.log(item)
            this.activeItem=item
        },
        handleClickMember(item){
            this.$router.push('/info')
        },
        handleCarousel(item){
            console.log(item)
            this.$router.push('/detail')
        }
    }
}
</script>
