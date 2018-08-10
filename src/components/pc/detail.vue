<template>
    <div class="pc detail-container">
        <common-header/>
        <div class="detail-container-body">
            <div class="detail-container-body-left"></div>
            <div class="detail-container-body-right">
                <div class="detail-container-body-right-header">
                    <div class="detail-container-body-right-header-left">
                        <div class="pic"></div>
                    </div>
                    <div class="detail-container-body-right-header-right">
                        <div class="name">双马尾小姐姐</div>
                        <div class="weibo">weibo:不知名的微博</div>
                    </div>
                </div>
                <div class="detail-container-body-right-body">
                    <div class="pic" v-for='n in 10' :key='n'></div>
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
    }
}
</script>

