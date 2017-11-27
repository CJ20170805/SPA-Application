<template>
  <div class="btn-wrap">
      <transition name="countAni">
          <span class='decrease' v-show="food.count>0" @click="decreaseCount">
            <i class="icon-remove_circle_outline"></i>
          </span>
      </transition>
     <span class='count' v-show="food.count>0">{{food.count}}</span>
      <span class='add'>
          <i class="icon-add_circle" @click="addCount"></i>
      </span>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
      food: {
          type: Object
      }
  },
  methods: {
    addCount() {
        if (!this.food.count) {
            Vue.set(this.food, 'count', 1)
        } else {
            this.food.count++
        }
    },
    decreaseCount() {
            this.food.count--
    }
}

}
</script>

<style lang="less" scoped>
@import url('../../common/style.css');
.btn-wrap{
    .countAni-enter-active,.countAni-leave-active{
        transition: all .6s linear;
    }
    .countAni-enter,.countAni-leave-active{
        opacity: 0;
        transform: translate3d(24px,0,0);
        transform: rotate(180deg);
    }
    span{
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: #ffffff;
        border-radius: 50%;
        vertical-align: top;
        text-align: center;
    }
    .decrease,.add{
        i{
           font-size: 24px;
           color: rgb(0, 160, 220);
           line-height: 24px;
           position: relative;
        }
    }
    .count{
        margin: 0 2px;
        height: 20px;
        font-size: 10px;
        line-height: 24px;
    }
}
</style>

