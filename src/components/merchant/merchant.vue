<template>
     <div class="merchant">
           <div class="sell-info">
                <div class="title">{{seller.name}}</div>
                <Star class='star-wrap' :size='36' :score='seller.score'></Star>
                <span>({{seller.ratingCount}})</span>
                <span>月售{{seller.sellCount}}单</span>
                <span>
                    <i class='icon-favorite'></i>
                    收藏
                </span>
                
           </div>
     </div>
</template>

<script>
import Star from '../star/star'
export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        Star
    }
}
</script>


<style scoped lang='less'>
@import url('../../common/style.css');
.merchant{
    background-color: #f4f4f4;

}
.sell-info{
    width: 100%;
    background-color: #ffffff;
}

</style>