<template>
    <div class="pc detail-container">
        <common-header/>
        <div class="detail-container-body">
            <div class="detail-container-body-left">
                <div class="box" v-for="(item,index) in list" :key='index'>
                    <img :src="item.photo_url" style="height:100%;width:100%;">
                </div>
                
            </div>
            <div class="detail-container-body-right">
                <div class="detail-container-body-right-header">
                    <div class="detail-container-body-right-header-left">
                        <div class="pic" >
                            <img :src="info.tx_pic" style="height:100%;width:100%;border-radius:100%;">
                        </div>
                    </div>
                    <div class="detail-container-body-right-header-right">
                        <div class="name">{{info.username}}</div>
                        <div class="name">写真集：{{info.album_name}}</div>
                        <div class="weibo">微博:{{info.weibo}}</div>
                    </div>
                </div>
                <div class="detail-container-body-right-body">
                    <div class="pic" v-for="(item,index) in list" :key='index' @click="changeImg(item)">
                        <img :src="item.photo_url" style="height:100%;width:100%;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import commonHeader from './header'
export default {
    data() {
        return {
            list: [],
            info:{},
            activeImg:''
        };
    },
    created(){
        this.getDetail()
    },
    components:{
        commonHeader
    },
    methods: {
        changeImg(item){
            this.activeImg=item.photo_url
        },
        getDetail(){
            this.$proxy.get('/api/getAlbumDetail',{params:{id:this.$route.params.id}})
            .then( (res)=> {
                this.list=res.data.data.photo
                this.info=res.data.data.info
                this.activeImg=this.list[0].photo_url
            })
    },
  }
}
</script>

