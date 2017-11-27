<template>
  <div id="detail" v-show="showHide" ref="wrap">
     <div class="scroll-wraper">
            <div class="detail-image">
                <img :src="food.image" width="100%" height="375" alt="foodImage">
            </div>
            <div class="detail-info">
                <div class="title">{{food.name}}</div>
                <div class="food-evaluate">
                    <span>月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                    <span class="now-price">￥{{food.price}}</span> 
                    <span class='old-price' v-show="food.oldPrice">￥{{food.oldPrice}}</span>   
                    <span class="add-shopcart" @click="addCount">加入购物车</span>    
                </div> 
            </div>
            <div class="space"></div>
            <div class="detail-food">
                <div class="f-title">商品介绍</div>
                <div class="f-content">{{food.description}}</div>
            </div>
            <div class="space"></div>
            <div class="detail-rating">
                <div class="title">商品评价</div>
                <div class='rating-btn'>
                    <span class='btn-all'>全部</span>
                    <span class='btn-recomend'>推荐</span>
                    <span class='btn-cirtical'>吐槽</span>
                </div>
                <div class="rating-option">
                    <span class="icon icon-check_circle" @click="filterText(food.ratings)"></span>
                    <span class='icon-text'>只看有内容的评价</span>
                </div>
            </div>
            <div class="rating-list">
                <ul>
                    <li v-for="items in food.ratings" :key="items.username" class="list-item">
                        <div class="rat-head">
                            <span class="rat-date">{{rateDate(items.rateTime)}}</span>
                            <span class="rat-name">{{items.username}}</span>
                            <span class="rat-icon">
                                <img :src="items.avatar" width="12" height="12" alt="usericon">
                            </span>
                        </div>
                        <div class="rat-content">
                            <span class='rat-hand icon-thumb_down'></span>
                            <span class="rat-text">{{items.text}}</span>
                        </div>
                    </li>
                </ul>
            </div>
     </div>
  </div>
</template>

<script>
 import BScroll from 'better-scroll'
 import Vue from 'vue'
export default {
  props: {
      food: {
          type: Object
      }
  },
  data() {
      return {
        showHide: false,
        ratList: []
      }
  },
  methods: {
    showHi() {
          this.showHide = true
      },
    rateDate(rT) {
           let hour = Math.floor(rT/1000/60/60%24)
           let minute = Math.floor(rT/1000/60%60)
           let year = Math.floor(rT/1000/60/60/24/365 + 1970)
           let month = Math.floor((rT/1000/60/60/24/30)%12)
           let day = Math.floor((rT/24)%30)
           let date = year+'-'+month+'-'+day+' '+hour+':'+ minute
           return date
      },
    addCount() {
        if (!this.food.count) {
            Vue.set(this.food, 'count', 1)
        } else {
            this.food.count++
        }
    },
    filterText(item) {
       let rats = []
       item.forEach(function(i) {
           let text = i.text
           if (text!== '') {
               rats.push(text)  
           } 
       }, this)
        console.log(rats)
        this.ratList= rats
    }
    },
 mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrap, {
         click: true
      })
    })
    }
}
</script>

<style lang="less" scoped>
@import url('../../common/style.css');
#detail{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    padding-bottom: 48px;
    overflow: auto;
    .scroll-wrapper{
        width: 100%;
        height: 100%;
    }
    .title{
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
    line-height: 14px;
    margin: 18px 0 8px 0;
    }
    .detail-image{
        width: 100%;
        height: 375px;
    }
    .detail-info{ 
        margin-left: 18px;
        padding-bottom: 18px;
        .food-evaluate{
            font-size: 10px;
            color: rgb(147, 153, 159);
            span{
                margin:0 12px 18px 0;
            }
        }
        .food-price{
            .now-price{
                font-size: 14px;
                font-weight: 700;
                color: rgb(240, 20, 20);
                line-height: 24px;
            }
            .old-price{
                font-size: 10px;
                color: rgb(147, 153, 159);
                text-decoration: line-through;
            }
            .add-shopcart{
                display: block;
                width: 74px;
                height: 24px;
                background-color: rgb(0, 160, 220);
                border-radius: 12px;
                text-align: center;
                line-height: 24px;
                font-size: 10px;
                color: rgb(255, 255, 255);
                float: right;
                margin-right: 18px;
            }
        }
    }
    .space{
        height: 16px;
        width: 100%;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        border-top: 1px solid rgba(7, 17, 27, 0.1);
    }
    .detail-food{
        margin: 18px;
        .f-title{
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            margin: 18px 0 8px 0;
        }
        .f-content{
            font-size: 12px;
            font-weight: 200;
            color: rgb(77, 85, 93);
            line-height: 24px;
        }
    }
    .detail-rating{
         margin-left: 18px;
        .rating-btn{
            margin-top: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            span{
                display:inline-block;
                width: 60px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                border-radius: 2px;
                font-size: 12px;
                margin-right: 8px;
            }
            .btn-all{
                background-color: rgb(0, 160, 220);
                color: rgb(255, 255, 255);
            }
            .btn-recomend{
                background-color: rgba(0, 160, 220,0.2);
                color: rgb(77, 85, 93);
            }
            .btn-cirtical{
                background-color: rgba(77, 85, 93,0.2);
                color: rgb(77, 85, 93);
            }
        }
    }
    .rating-option{
        font-size: 12px;
        color: rgb(147, 153, 159);
        margin: 12px 0;
        .icon{
            display:inline-block;
            vertical-align: middle;
            font-size: 24px;
        }
    }
    .rating-list{
        display: inline-block;
        width: 100%;
        margin: 0 18px;
        .list-item{
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            padding: 16px 0;
        }
        .rat-head{
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;
            .rat-date{
         
            }
            .rat-name{
                float: right;
                margin-right: 50px;
            }
            .rat-icon{
                width: 12px;
                height: 12px;
                float: right;
                margin-right: -50px;
                img{
                    border-radius: 6px;
                }
            }
        }
        .rat-content{
            margin-top: 6px;
            .rat-hand{
                font-size: 12px;
                line-height: 24px;
                color: rgb(147, 153, 159);
            }
            .rat-text{
                font-size: 12px;
                line-height: 16px;
                color: rgb(7, 17, 27);
            }
        }
    }
}
</style>
