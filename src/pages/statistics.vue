<template>
  <div class="statistics-container">
    <div class="container__graph">
      <p class="graph-title">{{ statisticsMap[staType] }}统计</p>
      <p class="graph-time">{{defaultText}}</p>
      <bar-graph
        ref="barGraph"
        :isSubscript="isSubscript"
        :staType="staType"
        :yAxis="yAxis"
        :xAxis="xAxis"
        :activeDate="activeDate"
        @updateTips="updateTips"
      ></bar-graph>
    </div>
    <div class="container__tab">
      <div
        @click="clickTab('week')"
        class="tab-item"
        :class="{ checked_tab: staType === 'week' }"
      >
        按周
        <p class="tab-item-subscript"></p>
      </div>
      <div
        @click="clickTab('month')"
        class="tab-item"
        :class="{ checked_tab: staType === 'month' }"
      >
        按月
        <p class="tab-item-subscript"></p>
      </div>
      <div
        @click="clickTab('year')"
        class="tab-item"
        :class="{ checked_tab: staType === 'year' }"
      >
        按年
        <p class="tab-item-subscript"></p>
      </div>
    </div>
    <div class="container__line"></div>
    <div class="container__content">
      <div class="content-item">
        <p>日均</p>
        <p class="content-item-hour">44
          <span class="content-item-unit">小时</span>
        </p>
      </div>
      <div class="content-item">
        <p>本周总计</p>
        <p class="content-item-hour">44
          <span class="content-item-unit">小时</span>
        </p>
      </div>
      <div class="content-item">
        <p>最长一天</p>
        <p class="content-item-hour">44
          <span class="content-item-unit">小时</span>
        </p>
      </div>
      <div class="content-item">
        <p>最短一天</p>
        <p class="content-item-hour">44
          <span class="content-item-unit">小时</span>
        </p>
      </div>
    </div>
    <hover-button :rightPx='170' :icon="'icon-share'" @iconClick="share"></hover-button>
    <hover-button :rightPx='0' :iconColor="['#1D1D26','#CED9E4']" :icon="'icon-cross-fill'" @iconClick="close"></hover-button>
  </div>
</template>

<script>
import BarGraph from "@/components/BarGraph.vue";
import { staDate } from "@/constants/commonType.js";
import { getMonthDateNum } from "@/utils/formatTime.js";
import HoverButton from '@/components/HoverButton.vue'
export default {
  data() {
    return {
      staType: "week",
      statisticsMap: {
        week: "本周",
        month: "本月",
        year: "年度"
      },
      showInfo: [],
      xAxis: [],
      yAxis: [0, 6, 12, 18, 24, 30].reverse(),
      staDate,
      studyFrom:[],
      defaultText:'平均时长5小时 最长16小时',
    };
  },
  components: {
    BarGraph,
    HoverButton
  },
  computed: {
    //是否显示柱状图下标
    isSubscript() {
      return this.staType === "month" ? false : true;
    },
    activeDate(){
      const now = new Date();
      const active={
        week:now.getDay() - 1,
        month:now.getDate()-1,
        year: now.getMonth(),
      }
      return active[this.staType]
    }
  },
  onLoad() {
    /**
     * 待请求数据初始化
     */
    this.initGraphDate();
  },
  methods: {
    updateTips(info) {
      console.log(info);
      if(this.staType!=='year'){
        this.defaultText = `${info.day} 共计 ${info.hour}小时`
      }else{
        this.defaultText = `n月 共计 ${info.hour}小时`
      }
    },
    //切换tab标签
    clickTab(staType) {
      this.staType = staType;
      this.defaultText='平均时长5小时 最长16小时';
      this.initGraphDate();
    },
    initGraphDate() {
      //模拟请求数据
      const params = {
        week: [...Array(7).keys()],
        month: [...Array(getMonthDateNum()).keys()],
        year: [...Array(12).keys()]
      };
      //根据选择的展示类型获取x轴下标 date:周一，1，1月
      let graphData = params[this.staType]; //模拟待删
      console.log(graphData);
      this.xAxis = graphData.map((item, index) => {
        return {
          hour: item + 1,
          day: "2019-12-18",
          subscript: this.staDate[this.staType][index + 1] || "",
          height: 0 // TODO:将高置为0，实现渐变动效
        };
      });
    },
    share(){
      console.log("这里分享");
      
    }
  }
};
</script>

<style lang="less" scoped>
.statistics-container {
  width: 100%;
  background: #2e303c;
  border-radius: 30rpx;
  padding: 60rpx 40rpx 200rpx 40rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  color: #606b84;
  font-size: 28rpx;
  .container__graph {
    .graph-title {
      font-size: 36rpx;
      font-weight: 600;
      line-height: 50rpx;
      color: #ced9e4;
    }
    .graph-time {
      font-size: 28rpx;
      font-weight: 400;
      margin: 7rpx 0;
    }
  }
  .container__tab {
    margin: 40rpx 0;
    display: flex;
    flex-direction: row;
    .tab-item {
      margin-right: 40rpx;
      text-align: center;
    }
    .checked_tab {
      color: #ced9e4;
      .tab-item-subscript {
        width: 8rpx;
        height: 8rpx;
        border-radius: 50%;
        background-color: #ced9e4;
        margin: 5rpx auto;
      }
    }
  }
  .container__line{
    border-bottom: 1rpx solid #595d6a;
    width: 100%;
  }
  .container__content{
    display:flex;
    flex-flow: row wrap;
    margin-top: 30rpx;
    .content-item{
      width: 50%;
      height: 170rpx;
      line-height: 50rpx;
      .content-item-hour{
        font-size:44rpx;
        color:#b8c1cd;
        .content-item-unit{
          font-size: 30rpx;
        }
      }

    }
  }
}
</style>
