<template>
  <div>
    <!-- home -->

    <mt-swipe :show-indicators="false">
      <mt-swipe-item v-for="(item,k) in sw_list" :key="k">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 首页六个可点击的小图片 -->
    <ul class="main-box mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../assets/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../assets/images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../assets/images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script scoped>
// import "./lib/js/mui.js";

export default {
  created() {
    this.get_sw_list()
  },
  data() {
    return {
      sw_list: []
    }
  },
  methods: {
    async get_sw_list() {
      const { data: dt } = await this.$http.get('/api/getlunbo')
      this.sw_list = dt.message
      // console.log(dt)
    }
  }
}
</script>





<style>
.mint-swipe {
  height: 200px;
}
.mint-swipe img {
  width: 100%;
  height: 100%;
}
.main-box.mui-table-view {
  width: 100%;
  background-color: #fff;
}
.main-box.mui-table-view img {
  width: 60px;
  height: 60px;
}
</style>
