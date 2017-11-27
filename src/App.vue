<template>
  <div id="app">     
    <header-nav :seller='seller'></header-nav>    
    <div class="nav border-bottom">
        <div class="nav-item">
          <router-link to="/product">商品</router-link> 
        </div>
        <div class="nav-item">
          <router-link to="/evaluate">评价</router-link> 
        </div>
        <div class="nav-item">
          <router-link to="/merchant" :seller='seller'>商家</router-link> 
        </div>
    </div>
         <router-view :seller='seller'></router-view>   
  </div>
</template>

<script>
import HeaderNav from './components/header/header'
const ErrnoMt = 0
export default {
  components: {
   HeaderNav
  },
  data() {
    return {
       seller: {}
    }
  },
  // vue-resource 异步调数据
  created() {
    this.$http.get('/api/seller').then((response) => {
     response=response.body 
     if (response.errno === ErrnoMt) { 
       this.seller = response.data
     }
    })
  },
  name: 'app'
} 
</script>

<style lang='less' rel='stylesheet/less'>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
    .nav{
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .nav-item{
      flex: 1;
      text-align: center;
      a{
        display: block;
        font-size: 14px;
        color:rgb(77, 85, 93);
      }
       .active{
          color:rgb(240,20,20)
        }
      }
    };
  
  // 解决移动端1px问题
  @media (-webkit-min-device-pixel-ratio: 2){
  .border-bottom::after {
     border-bottom-width: 1px;
  }
  .border:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    right: -100%;
    bottom: -100%;
    left: 0;
    border: 0 solid rgba(7, 17, 27, 0.1);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    pointer-events: none;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    width: 200%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
   }
}
</style>
