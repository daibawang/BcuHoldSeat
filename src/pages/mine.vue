<template>
  <div class="container">
    <div class="container_item" @click.stop="jump('statistics')">
      <div class="item-bar">
        <span class="item-title">{{ statisticsMap[staType] }}统计</span>
        <span class="iconfont icon-right-arrow"></span>
      </div>
      <bar-graph
        ref="barGraph"
        :isSubscript="true"
        staType="week"
        :yAxis="yAxis"
        :xAxis="xAxis"
        :activeDate="new Date().getDay() - 1"
        :isClick="false"
      ></bar-graph>
    </div>
    <!-- 我的 -->
    <p class="container_item-header">我的</p>
    <div class="container_item">
      <div class="item-bar">
        <span class="item-title">个人信息</span>
        <span class="iconfont icon-right-arrow"></span>
      </div>
      <div class="item-line"></div>
      <div class="item-bar">
        <span class="item-title">我的消息</span>
        <span class="item-msgNum">{{ msgNum }}</span>
        <span class="iconfont icon-right-arrow"></span>
      </div>
    </div>
    <!-- 专注 -->
    <p class="container_item-header">专注</p>
    <div class="container_item">
      <div v-for="(item,index) of concentration" :key="index">
        <div class="item-bar">
          <span class="item-title">{{item.title}}</span>
          <span class="item-tip">{{item.tip}}</span>
          <span class="iconfont icon-right-arrow"></span>
        </div>
        <div class="item-line" v-if="index!==concentration.length-1"></div>
      </div>
    </div>
    <!-- 其他 -->
    <p class="container_item-header">其他</p>
    <div class="container_item">
      <div class="item-bar">
        <span class="item-title">使用规则</span>
        <span class="iconfont icon-right-arrow"></span>
      </div>
      <div class="item-line"></div>
      <div class="item-bar">
        <span class="item-title">我要吐槽</span>
        <span class="iconfont icon-right-arrow"></span>
      </div>
    </div>
  </div>
</template>

<script>
import BarGraph from "@/components/BarGraph.vue";
import { staDate } from "@/constants/commonType.js";
import { getMonthDateNum } from "@/utils/formatTime.js";
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
      studyFrom: [],
      defaultText: "平均时长5小时 最长16小时",
      msgNum: 10,
      concentration:[
        {
          title:'专注结束提示',
          tip:'打开', //默认开启
          router:''
        },
        {
          title:'白噪音',
          tip:'森林',
          router:''
        },{
          title:'专注暂停次数',
          tip:'2',
          router:''
        },{
          title:'专注暂停时长',
          tip:'1分钟',
          router:''
        }
      ]
    };
  },
  components: {
    BarGraph
  },
  computed: {},
  onLoad() {
    /**
     * 待请求数据初始化
     */
    this.initGraphDate();
  },
  methods: {
    initGraphDate() {
      //模拟请求数据
      //根据选择的展示类型获取x轴下标
      let graphData = [...Array(7).keys()]; //模拟待删
      this.xAxis = graphData.map((item, index) => {
        return {
          hour: item + 1,
          day: "2019-12-18",
          subscript: this.staDate[this.staType][index + 1] || "",
          height: 0 // TODO:将高置为0，实现渐变动效
        };
      });
    },
  }
};
</script>

<style lang="less" scoped>
@import "../../static/iconfont.css";
.container_item-header {
  font-size: 30rpx;
  font-weight: 600;
  color: #606b84;
  margin: 30rpx 0 10rpx 40rpx;
}
.container_item {
  width: 100%;
  background: #2e303c;
  border-radius: 30rpx;
  display: flex;
  flex-direction: column;
  color: #606b84;
  font-size: 28rpx;
  padding: 15rpx 40rpx 15rpx 40rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  .item-line {
    border-bottom: 2rpx solid #3c3e4c;
    width: 100%;
  }
  .item-bar {
    display: flex;
    justify-content: space-between;
    margin: 25rpx 0;
    align-items: center;
    .item-title {
      font-size: 36rpx;
      font-weight: 600;
      line-height: 50rpx;
      color: #ced9e4;
    }
    .item-msgNum {
      width: 45rpx;
      height: 45rpx;
      background: #ff4a50;
      border-radius: 50%;
      font-size: 26rpx;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 45rpx;
      position: absolute;
      right: 110rpx;
    }
    .item-tip {
      text-align: right;
      position: absolute;
      right: 110rpx;
    }
  }
}
</style>
