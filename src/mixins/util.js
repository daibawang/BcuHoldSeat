// https://github.com/F-loat/mpvue-router-patch
const routerMap = {
    statistics: "/pages/statistics", //统计页面
    mine:'/pages/mine', //个人主页
    homePage:'/pages/homePage',//首页
  };
export default {

    methods: {
        //普通跳转
        jump(router,query,reLaunch) {
            console.log("即将跳转"+routerMap[router]);
            const params={
                path:routerMap[router],
                query,
                reLaunch
            }
            this.$router.push(params);
        },
        //关闭当前页跳转
        closeJump(router){
            this.$router.replace(routerMap[router]);
        }
    },
};