<template>
  <div class="container homePage-container">
    <div class="homePage-bar">
      <p class="homePage-bar-greeting">{{ timePhrases }}好</p>
      <p class="homePage-bar-intro">
        {{ intro }}
        <span class="iconfont icon-right-arrow-bg bar-iconfont"></span>
      </p>
      <div class="homePage-bar-avatar" @click="jump('mine')">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <div class="homePage-bar-msg">{{ msgNum }}</div>
      <div class="homePage-bar-richScan">
        <span>{{ studyNum }}人正在努力中赶快加入吧</span>
        <div class="richScan-btn">扫一扫</div>
      </div>
    </div>
    <div class="homePage-content">
      <div
        class="content-item"
        v-for="(item, index) of routerList"
        :key="index"
      >
        <p class="item-title">{{ item.title }}</p>
        <div class="item-icon-container">
          <img class="item-icon" :src="item.icon" alt="" />
        </div>
        <p class="item-num">
          {{ item.num }}
          <span class="itrm-unit">{{ item.unit }}</span>
        </p>
        <p class="item-tip">{{ item.tip }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BarGraph from "@/components/BarGraph.vue";
import { staDate } from "@/constants/commonType.js";
import { getTimePhrases } from "@/utils/formatTime.js";
export default {
  data() {
    return {
      timePhrases: getTimePhrases(),
      intro: "是谁用烟云般的字体，在南方的群星间写下你的名字",
      msgNum: 10,
      studyNum: 120,
      routerList: [
        {
          title: "学习次数",
          icon: "/static/images/study.png",
          num: 10,
          unit: "次",
          tip: "学习123小时"
        },
        {
          title: "学习次数",
          icon: "/static/images/study.png",
          num: 10,
          unit: "次",
          tip: "学习123小时"
        },
        {
          title: "学习次数",
          icon: "/static/images/study.png",
          num: 10,
          unit: "次",
          tip: "学习123小时"
        }
      ]
    };
  },
  components: {},
  computed: {},
  onLoad() {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../static/iconfont.css";
.homePage-container {
  padding: 20rpx 30rpx;
  .homePage-bar {
    position: relative;
    .homePage-bar-greeting {
      font-size: 48rpx;
      font-weight: bold;
      color: #ffffff;
    }
    .homePage-bar-intro {
      font-size: 28rpx;
      color: #606b84;
      line-height: 48rpx;
      width: 474rpx;
      margin-top: 28rpx;
      .bar-iconfont {
        position: absolute;
        margin-left: 10rpx;
      }
    }
    .homePage-bar-avatar {
      position: absolute;
      right: 50rpx;
      top: 80rpx;
      height: 100rpx;
      width: 100rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    .homePage-bar-msg {
      position: absolute;
      right: 55rpx;
      top: 155rpx;
      width: 32rpx;
      height: 32rpx;
      background: #ff4a50;
      border-radius: 50%;
      font-size: 16rpx;
      color: #ffffff;
      text-align: center;
      line-height: 32rpx;
    }
    .homePage-bar-richScan {
      font-size: 32rpx;
      color: #ced9e4;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 50rpx;
      .richScan-btn {
        width: 126rpx;
        height: 56rpx;
        line-height: 56rpx;
        background: #3c3e4c;
        border-radius: 28rpx;
        text-align: center;
        font-size: 24rpx;
        color: #729cea;
      }
    }
  }
  .homePage-content {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 60rpx;
    .content-item {
      width: 330rpx;
      height: 364rpx;
      background: #2e303d;
      border-radius: 30rpx;
      padding: 30rpx;
      box-sizing: border-box;
      margin-bottom: 30rpx;
      .item-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #d3dbe6;
      }
      .item-icon-container {
        width: 100%;
        text-align: center;
        margin: 35rpx 0;
        .item-icon {
          width: 100rpx;
          height: 100rpx;
        }
      }

      .item-num {
        font-size: 36rpx;
        color: #d3dbe6;
        .itrm-unit {
          font-size: 30rpx;
        }
      }
      .item-tip {
        font-size: 24rpx;
        font-weight: bold;
        color: #5c667f;
      }
    }
  }
}
</style>
