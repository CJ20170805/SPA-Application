<template>
    <div class="sc-wrap">
        <div class="sc-icon">
            <span class='sc-icon-wrap'>
                <i class='icon-shopping_cart' :class="{'hlight':totalCount>0}"></i>
            </span>
             <span class='foods-total' v-show="totalCount>0">{{totalCount}}</span>
        </div>
        <div class="sc-content">
            <span class="sum-price" :class="{'hlight':totalPrice>0}">￥{{totalPrice}}</span>
            <span class="delivery-price" @click="toggleShow">另需配送费￥{{deliveryPrice}}元</span>
            <span class="minimum-price" :class="deliClass" @click="payFor">{{totalDesc}}</span>      
        </div>
        <transition name="detailAni">
           <div class="sc-detail" v-show="listShow">
                <div class="detail-bg" v-show="listShow"></div>    
                <div class="detail-title">
                    <span class="title">购物车</span>
                    <span class='empty' @click="empty">清空</span>
                </div>
                <div class="detail-list" ref="delist">
                    <ul class="food-ul">
                        <li class="food" v-for="(food,index) in foodsSelect" :key="food.name">        
                            <span class="food-name">{{food.name}}</span>
                            <span class='food-price'>￥{{food.price}}</span>
                            <count-btn class="food-btn" :food='food'></count-btn> 
                        </li>
                    </ul>
                </div>
           </div> 
        </transition>
        <!-- <div class="ball-container">
           <transition-group name='drop'>
              <div v-for="ball in balls" :key="ball.show" v-show="ball.show" class="ball">
                  <div class='inner'></div>    
              </div>   
           </transition-group>  
        </div> -->
    </div>  
</template>

<script>
import countBtn from '../countbutton/countbtn'
import BScroll from 'better-scroll'
export default {
 props: {
     deliveryPrice: {
      type: Number,
      default: 0
     },
     minPrice: {
      type: Number,
      default: 0
     },
     foodsSelect: {
      type: Array,
      default() {
          return [] 
      }
     }
 },
 components: {
    countBtn
 },
 data() {
    return {
     fold: true
    }      
 },
 methods: {
   drop(el) {
      console.log(el)  
   },
   toggleShow() {
       if (!this.totalCount) {
           return false
       }
       this.fold= !this.fold
   },
   empty() {
       this.foodsSelect.forEach((food) => {
            food.count= 0
       })
   },
   payFor() {
       if (this.totalPrice> this.minPrice) {
           window.alert(`您需支付￥${this.totalPrice}元`)
       }
   }
 },
 computed: {
     totalPrice() {
         let total= 0
         this.foodsSelect.forEach((foods) => {
             total+= foods.price * foods.count 
         })
         return total
     },
    listShow() {
      if (!this.totalCount) {
         this.fold= true
         return false
      }
      let show= !this.fold
      if (show) {
        //       this.$nextTick(() => {
            //  this.scroll = new BScroll(this.$refs.delist, {})
            this.scroll = new BScroll(this.$refs.delist, {})
        //  })
       // console.log(this.$refs.delist)
      }
      return show
   },
     totalCount() {
         let count= 0
         this.foodsSelect.forEach((foods) => {
             count+= foods.count
         })
         return count
     },
     totalDesc() {
         if (this.totalPrice> this.minPrice) {
             return '去结算'
         } else if (this.totalPrice< this.minPrice && this.totalPrice!== 0) {
             return `还差￥${this.minPrice- this.totalPrice}起送`
         } else {
             return `￥${this.minPrice}起送`
         }
     },
    deliClass() {
        if (this.totalPrice> this.minPrice) {
            return 'goTopay'
        }
    }
 }
}
</script>

<style lang="less" scoped>
   @import url('../../common/style.css');
  .sc-wrap{
      width: 100%;
      background-color: #141d27;  
      padding-left: 69px;
      text-align: center;
      .sc-icon{
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #141d27;
          position: absolute;
          bottom: 8px;
          left: 13px;
          .sc-icon-wrap{
              display: inline-block;
              border-radius: 50%;
              width: 44px;
              height: 44px;
              background-color: rgba(255, 255, 255, 0.2);
              margin: 6px;
             .hlight{
                  color: #ffffff;
                  background-color: rgb(0 ,160, 220);
                 border-radius: 50%;
              }
              i{
                  font-size: 24px;
                  color: rgba(255, 255, 255, 0.4);
                  line-height: 44px;
                  text-align: center;
                  display:inline-block;
                  width: 44px;
                  height: 44px;
              }
          }
          .foods-total{
              display: block;
              width: 24px;
              height: 16px;
              background-color: rgb(240, 20, 20);
              position: absolute;
              top: 2px;
              left: 30px;
              border-radius: 20px;
              color: #ffffff;
              font-size: 12px;
              line-height: 16px;
              text-align: center;
          }
      }
     .sc-content{  
        display:flex;
        line-height: 48px;
        .sum-price{
            &.hlight{color: #ffffff;}
            height: 24px;
            line-height: 24px;
            margin-top: 12px;
            flex: 1;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.4);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            font-weight: 700;
            i{
                display:inline-block;
                height: 24px;
            }
        }
        .delivery-price{
            flex: 3;        
            height: 48px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
        }
        .minimum-price{
            flex:0 0 105px;
            color: rgba(255, 255, 255, 0.4);
            font-size: 16px;
            font-weight: 700;
            background-color: rgba(255, 255, 255, 0.2);
            &.goTopay{
                background-color: #00cc33;
                color: #ffffff;
            }
        }
    }  
     .sc-detail{
        max-height: 258px;
        width: 100%;
        background-color: #ffffff;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -19;
        margin-bottom: 48px;
        .detail-title{
            width: 100%;
            height: 40px;
            background-color: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            span{
                display: inline-block;
                padding: 0 18px;
                line-height: 40px;
            }
            .title{
                float: left;
                font-size: 14px;
                font-weight: 200;
                color: rgb(7, 17, 27);
            }
            .empty{
                float: right;
                font-size: 12px;
                color: rgb(0 ,160, 220);
            }
        }
        .detail-list{
            .food-ul{
                background-color: #ffffff;
            }
            .food{
                height: 50px;
                display: flex;
                margin: 0 18px;
                border-bottom:1px solid rgba(7, 17, 27, 0.1); 
                span{
                    display:inline-block;
                    line-height: 50px;
                }
                .food-name{
                    flex: 2;
                    text-align: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    font-weight: 500;
                }
                .food-price{
                    flex: 1;
                    text-align: right;
                    padding-right: 12px;
                    font-size: 10px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .food-btn{
                    padding-top: 15px;
                }
            }
        }
      }
  }
    .detail-bg{
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, 0.6);
        filter: blur(10px);
        position: fixed;
        left: 0;
        top: 0;
        z-index: -20;
        background-size: 200%;
    }
     .detailAni-enter-active,.detailAni-leave-active{
          transition: all .3s ease-in;
      }
      .detailAni-enter,.detailAni-leave-to{
           opacity: 0}
</style>
