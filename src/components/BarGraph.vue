<template>
  <div class="bar-graph">
    <!--Y轴线-->
    <div class="graph-content-yline">
      <div
        class="yline-item"
        v-for="(item, index) of graphList.yAxis"
        :key="index"
      >
        {{ item }}h
      </div>
    </div>
    <!-- 柱状 -->
    <div class="graph-content-xline">
      <div
        :class="widthMap[staType]"
        v-for="(item, index) of graphList.xAxis"
        :key="index"
        @click="isClick?selectDay(item, index):''"
      >
        <!-- isSubscript配置项决定是否显示下标 -->
        <div style="height:70rpx" v-if="!isSubscript"></div>
        <div v-else>
          <p>{{ item.subscript }}</p>
          <p>{{ item.hour }}</p>
        </div>
        <div class="item-cylinder">
          <div
            class="item-cylinder-light"
            :class="{'line-highlight':active === index,'line-highlight-no':banTransition}"
            :style="{ height: item.height + 'rpx' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { staDate } from "@/constants/commonType.js";
export default {
  data() {
    return {
      graphList: {
        yAxis: this.yAxis,
        xAxis: []
        // date:WeekDate
      },
      staDate,
      banTransition:false,
      active:0,
      widthMap:{
        week:'xline-item',
        month:'xline-item-dayWidth',
        year: 'xline-item-monthWidth',
      }
    };
  },
  props: {
    //是否显示下标
    isSubscript: {
      type: Boolean,
      default: true
    },
    xAxis:{
      type:Array,
    },
    yAxis:{
      type:Array,
    },
    //高亮index
    activeDate:{
      type:Number
    },
    //展示类型 week month year
    staType:{
      type:String,
    },
    //是否开启选择
    isClick:{
      type:Boolean,
      default:true,
    }
  },
  watch:{
    xAxis(val){
      this.computedHeight();
    }
  },
  methods: {
    //切换选择的日期
    selectDay(info, index) {
      this.active = index;
      this.$emit("updateTips", info);
    },
    //根据比率计算柱状显示高度
    computedHeight() {
      this.active = this.activeDate;
      this.banTransition=true;//禁止滑动效果
      this.graphList.xAxis = this.xAxis;
      const scale = 235/this.yAxis[0];//计算比率
      setTimeout(() => {
        this.banTransition=false;
        this.graphList.xAxis = this.xAxis.map((item, index) => {
        item.height = parseInt(item.hour * scale);
        return item;
      });
      }, 200);
    },
  },
  mounted() {
    this.computedHeight();
  },
  onLoad() {
    console.log(this.activeDate);
    
  }
};
</script>

<style lang="less" scoped>
.bar-graph {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  .graph-content-yline {
    display: flex;
    flex-direction: column;
    font-size: 24rpx;
    margin-right: 20rpx;
    .yline-item {
      margin-top: 10rpx;
    }
  }
  .graph-content-xline {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .xline-item,
    .xline-item-dayWidth,.xline-item-monthWidth {
      display: flex;
      flex-direction: column-reverse;
      font-size: 24rpx;
      text-align: center;
      height: 330rpx;
      width: 10%;
      .item-cylinder {
        height: 235rpx;
        background-color: #3c3e4c;
        margin-bottom: 15rpx;
        border-radius: 10rpx 10rpx 0px 0px;
        display: flex;
        flex-direction: column-reverse;
        .item-cylinder-light {
          background: #6586c7;
          border-radius: 10rpx 10rpx 0px 0px;
          transition: height 1s;
        }
        .line-highlight {
          background: #fe9152;
        }
        .line-highlight-no{
          transition: 0s;
        }
      }
    }
    .xline-item-dayWidth {
      width: 2.9%;
    }
    .xline-item-monthWidth {
      width: 7%;
    }
  }
}
</style>
