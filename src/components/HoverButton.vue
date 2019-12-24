<template>
  <div class="hover-button">
    <div @click="$emit('iconClick')" class="button-container" :style="{right: rightPx + 'rpx',background:iconColor[0],color:iconColor[1]}">
      <div class="iconfont" :class="icon"></div>
    </div>
  </div>
</template>

<script>
import { staDate } from "@/constants/commonType.js";
export default {
  data() {
    return {};
  },
  props: {
    rightPx: {
      type: Number,
    },
    icon:{
        type:String
    },
    iconColor:{
        type:Array,
        default:['#3c3e4c','#729CEA']
    }
  },
  watch: {},
  methods: {},
  mounted() {},
  onLoad() {
  },
  computed:{
  }
};
</script>

<style lang="less" scoped>
@import "../../static/iconfont.css";
.hover-button {
  position: relative;
  width: 100%;
  .button-container {
    position: absolute;
    width: 140rpx;
    height: 140rpx;
    border-radius: 50rpx;
    text-align: center;
    line-height: 140rpx;
    margin-top: 20px;
    .iconfont{
      font-size: 56rpx;
    }
  }
}
</style>
