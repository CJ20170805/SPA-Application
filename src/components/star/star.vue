<template>
    <div class="star" :class='starType'>
        <span v-for="itemClass in itemClasses" class="star-item" :key="itemClass" v-bind:class="itemClass">
        </span>
    </div>
</template>

<script type='text/ecmascript-6'>
const LEN = 5
const ON = 'on'
const HALF = 'half'
const OFF = 'off'
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size
        },
        itemClasses() {
            let result = []
            let score =Math.floor(this.score*2)/2
            let hasDecimal = score % 1 !== 0
            let entire = Math.floor(score)
            for (let i=0; i<entire; i++) {
               result.push(ON)
            }
            if (hasDecimal) {
                result.push(HALF)
            }
            while (result.length <LEN) {
                result.push(OFF)
            }
            return result
        }
    }
 }
</script>

<style lang="less">
.star{
    font-size: 0;
    line-height: 24px;
    .star-item{
        display:inline-block;
        width: 20px;
       height: 20px;
       background-size: 20px 20px;
       margin:0 10px 0 10px;
    }
    }
.star-48{  
     .on{
        background-image:url('./img/star48_on@3x.png')
        }  
     .half{
       background-image:url('./img/star48_half@3x.png')
     }   
     .off{
       background-image:url('./img/star48_off@3x.png')
     }
};
.star-36{  
     .on{
        background-image:url('./img/star36_on@3x.png')
        }  
     .half{
       background-image:url('./img/star36_half@3x.png')
     }   
     .off{
       background-image:url('./img/star36_off@3x.png')
     }
};
.star-24{  
     .on{
        background-image:url('./img/star24_on@3x.png')
        }  
     .half{
       background-image:url('./img/star24_half@3x.png')
     }   
     .off{
       background-image:url('./img/star24_off@3x.png')
     }
};


</style>
