<template>
    <div class="home-container">
        <common-header/>
        <div class="home-container-body">
            <div class="home-container-body-top">
                <div class="home-container-body-top-carousel">
                    <el-carousel :interval="4000" type="card" height="400px">
                        <el-carousel-item v-for="item in 5" :key="item">
                        <h3>{{ item }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- <div class="home-container-body-top-boxContainer clearfix" >
                    <div class="home-container-body-top-boxContainer-box" v-for='n in 5' :key='n'>
                        <div class="home-container-body-top-boxContainer-box-pic"></div>
                        <div class="home-container-body-top-boxContainer-box-txt"></div>
                    </div>
                </div> -->
            </div>
            <div class="home-container-body-bottom">
                <div class="home-container-body-bottom-left">
                    <div class="home-container-body-bottom-left-header">
                        <div class="home-container-body-bottom-left-header-item active" style="flex:1;">最新</div>
                        <div class="home-container-body-bottom-left-header-item" style="flex:1;">本周热门</div>
                        <div class="home-container-body-bottom-left-header-item" style="flex:1;">热门推荐</div>
                        <div class="home-container-body-bottom-left-header-item" style="flex:3;">双马尾协会成员专区</div>
                    </div>
                    <div class="home-container-body-bottom-left-body">
                        <div class="home-container-body-bottom-left-body-card">
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
                        <div class="home-container-body-bottom-left-body-card">
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
                        <div class="home-container-body-bottom-left-body-card">
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
                        <div class="home-container-body-bottom-left-body-card">
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
                        <div class="home-container-body-bottom-left-body-card">
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
                    </div>
                </div>
                <div class="home-container-body-bottom-right">
                    <div class="home-container-body-bottom"></div>
                </div>
            </div>
        </div>
        <div class="home-container-footer"></div>
    </div>
</template>
<script>
import commonHeader from './header'
export default {
    components:{
        commonHeader
    }
}
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 500px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
