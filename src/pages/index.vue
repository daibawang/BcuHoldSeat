<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="userinfo" @click="bindViewTap">
      <img
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <van-tag>标签</van-tag>
    <van-tag type="danger">标签</van-tag>
    <van-tag type="primary">标签</van-tag>
    <van-tag type="success">标签</van-tag>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input
        type="text"
        class="form-control"
        v-model="motto"
        placeholder="v-model"
      />
      <input
        type="text"
        class="form-control"
        v-model.lazy="motto"
        placeholder="v-model.lazy"
      />
    </form>
    <div @click.stop="goVue">
      去往Vuex示例页面
    </div>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  mpType: "page",

  data() {
    return {
      motto: "Hello World",
      userInfo: {}
    };
  },

  components: {
    card
  },

  methods: {
    goVue() {
      this.$router.push("/pages/counter");
      console.log("ddd");
      
    },
    bindViewTap() {
    },
    getUserInfo() {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo)
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
          }
        }
      });
      // 调用登录接口
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         console.log(res);
              
      //         this.userInfo = res.userInfo;
      //         console.log(this.userInfo);
              
      //       }
      //     });
      //   }
      // },);
    },
    clickHandle(msg, ev) {
      // eslint-disable-next-line
      console.log("clickHandle:", msg, ev);
    }
  },
  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    // this.$proxy.get('BookBorrow/getalluser')
    // .then((res) =>{
    //   console.log(res);
      
    // })
  }
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
