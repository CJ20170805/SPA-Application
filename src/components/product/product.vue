<template>
  <div class="product">
    <div class="menu" ref='menu'>
      <ul class='sell-list'>
        <li v-for="(item,index) in goods" :key="item.name" 
        :class="{'light':currentIndex === index}" @click="menuClick(index)">
        <span class='li-item'>
            <span v-show="item.type>0" class='li-icon' :class="classMap[item.type]"></span>
            {{item.name}}
        </span>
        </li>
      </ul>
    </div>
    <div class="list" ref='list'>
      <ul>
        <li v-for="item in goods" :key="item.name" class='list-items'>
          <div class='list-item-name'>{{item.name}}</div>
          <ul>
            <li v-for="food in item.foods" :key="food.name" class='foods-item'>
              <div class='list-icon' @click="selectedfn(food)" >
                <img :src="food.icon" width="57px" height="57px" alt="food-name">
              </div>
              <div class="list-content">
                <h2>{{food.name}}</h2>
                <p>{{food.description}}</p>
              <div class="list-info">
                  <span class='month-sell'>月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
              </div>
              <div class="list-price">
                  <span class='now-price'>￥{{food.price}}</span>
                  <span class='old-price' v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              </div>
              <count-btn class='count-btn' :food="food"></count-btn>
            </li>
          </ul>       
        </li>
      </ul>
    </div>
    <pr-detail :food="selected" ref="prdeat"></pr-detail>
    <shoppingCart ref='shoppingCart' class='shopping-cart' :foods-select="foodsSelect"
     :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></shoppingCart>
  </div>
</template>

<script>
import shoppingCart from '../shoppingCart/shoppingCart'
import countBtn from '../countbutton/countbtn'
import BScroll from 'better-scroll'
import prDetail from '../productdetail/detail'
export default {
 props: {
   seller: {
     type: Object
   }
   },
components: {
     shoppingCart,
     countBtn,
     prDetail
   },
data() {
  return {
      goods: [],
      itemHeight: [],
      scrollY: 0,
      selected: {}
    }
  },
computed: {
  currentIndex() {
    for (var i= 0; i< this.itemHeight.length; i++) {
       let h1= this.itemHeight[i]
       let h2= this.itemHeight[i+1]
       if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
         return i
       }
    }
    return 0
  },
  foodsSelect() {
    let foodscart=[]
    this.goods.forEach((good) => {
         good.foods.forEach((food) => {
         if (food.count) {
           foodscart.push(food)
         }
       })        
    })
    return foodscart
  }
},
created() {
   this.classMap=[ 'decrease', 'discount', 'special', 'invoice', 'guarantee' ]
   this.$http.get('/api/goods').then((response) => {
     response = response.body
     if (response.errno === 0) {
         this.goods = response.data
         this.$nextTick(() => {
         this.menuScroll = new BScroll(this.$refs.menu, {
           click: true
         })
         this.listScroll = new BScroll(this.$refs.list, {
           probeType: 3,
           click: true
         })
         this.listScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
         })
         this._listHeight()
       })
     }
   })
  },
methods: {
  _listHeight() {
    let lists = this.$refs.list.getElementsByClassName('list-items')
    let height = 0
    this.itemHeight.push(height)
    for (var i= 0; i< lists.length; i++) {
        let item= lists[i]
        height += item.clientHeight
        this.itemHeight.push(height)
    }   
  },
  menuClick(index) {
    // console.log(index)
    let lists = this.$refs.list.getElementsByClassName('list-items')
    let el = lists[index]
    this.listScroll.scrollToElement(el, 300)
  },
  _drop(target) {
    this.$refs.shoppingCart.drop(target)
  },
  showDetail() {
    return true
  },
  selectedfn(food) {
    this.selected= food
    this.$refs.prdeat.showHi()
    console.log(this.selected)
  }
},
events: {
  'cart.add'() {
    this._drop()
  }
}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .product{
    display:flex;
    position: absolute;
    top: 178px;
    width: 100%;
    bottom: 48px;
    overflow: hidden;
    .shopping-cart{
      position: fixed;
      bottom: 0;
      left: 0;
    }
    .menu{
      flex: 0 0 80px;
      width: 80px;
      .sell-list{
         background-color: #f3f5f7;
         .light{
           background-color: #ffffff;
           font-size: 12px;
           line-height: 12px;
           color:#000033;
           font-weight: 700;
         }
       li{
        width: 100%;
        height: 54px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        font-weight: 200;
        text-align: center;
        display: table;
        padding: 0 12px;
        .li-item{
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          text-align: center;
          line-height: 14px;  
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          span{
            display:inline-block;
          } 
        .li-icon{  
         width: 12px;
         height: 12px;
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
        } 
        }
        
       }
      }
    }
    .list{
       flex: 1;
       .list-item-name{
         background-color: #f3f5f7;
         line-height: 26px;
         color: rgb(147, 153, 157);
         border-left: 2px solid #d9dde1;
         padding-left: 12px;
       }
       .foods-item{
         position: relative;
          box-sizing: border-box;
          display: flex;
          padding: 18px 0 8px 18px;
          border-bottom: 1px solid rgba(7, 17, 27,0.1);
          &:last-child{
            border: none;
          }
          .count-btn{
            position: absolute;
            bottom: 10px;
            right: 20px;
          }
       }
       .list-icon{
         img{
           margin-right: 10px;
         }
       }
       .list-content{
         h2{
           font-size: 14px;
           color: rgb(7, 17, 27);
           line-height: 14px;
         }
         p{
           font-size: 10px;
           color: rgb(147, 153, 169);
           line-height:10px;
           margin: 8px 0;
         }
       }
       .list-info{
          font-size: 10px;
           color: rgb(147, 153, 169);
           line-height:10px;
          .month-sell{
            margin-right: 12px;
          }
       }
       .list-price{
         .now-price{
           font-size: 14px;
           color: rgb(240, 20, 20);
           font-weight: 700;
           line-height: 24px;
         }
         .old-price{
           font-size: 10px;
           color: rgb(147, 153, 157);
           line-height: 24px;
           font-weight: 700;
           text-decoration: line-through;
         }
       }
    }
  }
</style>
