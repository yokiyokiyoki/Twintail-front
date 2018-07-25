<template>
    <div class="home-container">
        <div class="home-container-header">
            <div class="home-container-header-left"></div>
            <div class="home-container-header-right"></div>
        </div>
        <div class="home-container-body">
            <div class="home-container-body-top">
                <div class="home-container-body-top-carousel"></div>
                <div class="home-container-body-top-boxContainer clearfix" >
                    <div class="home-container-body-top-boxContainer-box" v-for='n in 5' :key='n'>
                        <div class="home-container-body-top-boxContainer-box-pic"></div>
                        <div class="home-container-body-top-boxContainer-box-txt"></div>
                    </div>
                </div>
            </div>
            <div class="home-container-body-bottom">
                <div class="home-container-body-bottom-left">
                    <div class="home-container-body-bottom-left-header">
                        <div class="home-container-body-bottom-left-header-item" style="flex:1;">1</div>
                        <div class="home-container-body-bottom-left-header-item" style="flex:1;">1</div>
                        <div class="home-container-body-bottom-left-header-item" style="flex:1;">1</div>
                        <div class="home-container-body-bottom-left-header-item" style="flex:3;">1</div>
                    </div>
                </div>
                <div class="home-container-body-bottom-right"></div>
            </div>
        </div>
        <div class="home-container-footer"></div>
    </div>
</template>
<script>
export default {
    
}
</script>
