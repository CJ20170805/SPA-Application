<template>
  <div class="header">
    <div class="product-info">
      <div class="head-info">
        <img  width='64' height="64" src="./img/seller_avatar_256px.jpg" alt="">
      </div> 
      <div class="content">
          <div class="brand">
            <span class='brand-img'></span>
            <span class="brand-info">{{ seller.name }}</span>
          </div>
          <div class="dilivery">
            {{ seller.description }}/{{ seller.deliveryTime }}分钟到达
          </div>
          <div class="subtract">
            <span v-if="seller.supports" class='subtract-img' :class="classMap[seller.supports[0].type]"></span>
            <span v-if="seller.supports" class="subtract-info">
              {{ seller.supports[0].description }}
            </span>
          </div>
       </div>
      </div>
      <div @click="shadeL" v-if='seller.supports' class="supports-count">
          <span class='num'>{{seller.supports.length}}个</span>
          <i class='icon-keyboard_arrow_right'></i>
      </div>
    <div class="notice-info">
      <span class="notice-icon"></span>
      <span class='notice-text'>{{ seller.bulletin }}</span>
      <i @click="shadeL" class='icon-keyboard_arrow_right'></i>
    </div>
    <div class="bg">
        <img src="./img/seller_avatar_256px.jpg" alt="">
    </div>
    <transition name='fade'>
       <div class="shade-layer" v-show='shadeLayer'>
        <div class="shade-wraper clearfix">
          <div class="shade-content">
             <div class="shade-name">{{ seller.name }}</div>
             <Star class='star-wrap' :size='48' :score='seller.score'></Star>
             <div class="shade-title">
               <div class="line"></div>
               <div class="text">优惠信息</div>
               <div class="line"></div>
             </div>
             <ul v-if="seller.supports" class="discount-info">
               <li v-for="item in seller.supports" :key="item.name" class='discount-item'>
                 <span class='dis-icon' :class="classMap[item.type]"></span>
                 <span class='dis-info'>{{ item.description }}</span>
               </li>
             </ul>
            <div class="shade-title">
               <div class="line"></div>
               <div class="text">商家公告</div>
               <div class="line"></div>
             </div>
             <div class="bulletin-info">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="shade-close" @click="hideL">
          <i class='icon-close'></i>
        </div>
    </div>
    </transition>
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
   data() {
     return {
       shadeLayer: false
     }
     },
   methods: {
    shadeL() {
       this.shadeLayer = true
     },
     hideL() {
       this.shadeLayer = false
     }
   },
   created() {
     this.classMap=[ 'decrease', 'discount', 'special', 'invoice', 'guarantee' ]
   },
   components: {
     Star
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../common/style.css');
.header{
   background-color: rgba(7, 17, 27, 0.5);
   color: rgb(255, 255, 255);
   position: relative;
  .product-info{
      padding: 24px 24px 18px 24px;
      font-size: 0;
  }
  .head-info{
    display:inline-block;
    margin-right: 16px;
    vertical-align: top;
   img{
      border-radius: 2px;
   }
  }
  .content{
    display:inline-block;
    .brand{
      font-size: 16px;
      line-height: 18px;
      font-weight: bold;
      margin: 2px 0 8px 0;
      .brand-img{
        display:inline-block;
        vertical-align: top;
        width: 30px;
        height: 18px;
        @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
          background-image: url('./img/brand@3x.png');
        }
        background-image: url('./img/brand@2x.png');
        background-repeat: no-repeat;
        background-size: 30px 18px;
      }
      .brand-info{
        margin-left: 6px;
      }
    }
    .dilivery{
      font-size: 12px;
      line-height: 12px;
      font-weight: 200;
      margin-bottom: 10px;
    }
    .subtract{
      font-size: 10px;
      line-height: 12px;
      font-weight: 200;
      margin-bottom: 2px;
      .subtract-img{
        display:inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
          &.decrease{
           background-image:url('./img/decrease_1@2x.png')
        };
          &.discount{
           background-image:url('./img/discount_1@2x.png')
        };
          &.special{
           background-image:url('./img/special_1@2x.png')
        };
          &.invoice{
           background-image:url('./img/invoice_1@2x.png')
        };
           &.guarantee{
           background-image:url('./img/guarantee_1@2x.png')
        };
        background-size: 12px 12px;
        background-repeat: no-repeat;
        // background:url('./decrease_1@2x.png') no-repeat;
        
        // @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
        //   background-image: url('./brand@3x.png');
        // }
      }
      .subtract-info{
        display:inline-block;
        line-height: 14px;
        vertical-align: top;
      }
    }   
  }
  .supports-count{
        width: 43px;
        height: 24px;
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        right: 12px;
        top: 67px;
        border-radius: 12px;
        padding: 0 8px;
        line-height: 24px;
        font-size: 0;
        text-align: center;
        .num{  
          display: inline-block;
          font-size: 10px;
          font-weight: 200px;
          line-height: 24px;
        }
         i{
           display:inline-block;
           font-size: 10px;
           line-height: 24px;
           position: absolute;
           top: 1px;
         }
      } 
  }
  .notice-info{
    font-size: 0;
    font-weight: 200;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, 0.2);
    .notice-icon{
      display: inline-block;
      line-height: 28px;
      width: 22px;
      height: 12px;
      margin-bottom: 9px;
      margin-right: 4px;
      color: #ffffff;
       @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
          background-image: url('./img/bulletin@3x.png');
        }
        background-image: url('./img/bulletin@2x.png');
        background-repeat: no-repeat;
        background-size: 22px 12px;
    }
    .notice-text{
      display:inline-block;
      font-size:10px;
      height: 28px;
      line-height: 28px;
      width: 86%;
      overflow: hidden;
      white-space: nowrap;      
      text-overflow: ellipsis;
    }
    .icon-keyboard_arrow_right{
      font-size: 10px;
      position: absolute;
      right: 12px;
      bottom: 10px;
    }
  }
  .bg{
    img{
      width: 100%;
      height: 100px;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      filter: blur(10px);
    }
  }
  .shade-layer{
    /*layer淡入淡出效果*/
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    background-color: rgba(7, 17, 27, 0.8);
    width: 100%;
    height: 100%;
    padding: 0 36px;
    overflow: auto;
    .shade-wraper{
       min-height: 100%;
       width: 100%;
      .shade-content{
        margin-top: 64px;
        padding-bottom: 64px;
        .star-wrap{
            margin: 16px 0 0 0;
            width: 100%;
            height: 20px;
            text-align: center;
        }
        .shade-name{
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          line-height: 16px;
        }
        .shade-title{
          display:flex;
          text-align: center;
          width: 100%;
          margin: 30px 0 0 0;
          .line{
            flex: 2;
            border-bottom: 2px solid rgba(255, 255, 255, 0.2);
            position: relative;
            bottom: 6px;
          }
          .text{
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            line-height: 16px;
            margin: 0 12px;
          }
        }
        .discount-info{
          box-sizing: border-box;
          margin-left: 12px;
          margin-top: 24px;
          font-size: 0;
          .discount-item{
            padding-bottom: 10px;
            font-size: 12px; 
          .dis-icon{
            display:inline-block;
            vertical-align: middle;
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            margin:0 6px 2px 0;
           }   
           .dis-info{
              font-weight: 200;
              line-height: 12px;
           } 
          } 
        .decrease{
           background-image:url('./img/decrease_1@2x.png')
        };
        .discount{
           background-image:url('./img/discount_1@2x.png')
        };
        .special{
           background-image:url('./img/special_1@2x.png')
        };
        .invoice{
           background-image:url('./img/invoice_1@2x.png')
        };
        .guarantee{
           background-image:url('./img/guarantee_1@2x.png')
        };
        }
        .bulletin-info{
          line-height: 24px;
          font-size: 12px;
          font-weight: 200;
          margin: 30px 12px;
        }  
      };
    };
    .shade-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
</style>
