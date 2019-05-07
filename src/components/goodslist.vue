<template>
  <div class="card_list">
    <div class="mui-card" @click="goods_detail(item.id)" v-for="item in goods_list" :key="item.id">
      <div class="mui-card-header mui-card-media" :style="{'height':'47vw'}">
        <img :src="item.img_url" class="imgs" alt>
      </div>
      <p class="title">{{ item.title }}</p>
      <div class="mui-card-content">
        <!-- <div class="mui-card-content-inner">
          <p>Posted on January 18, 2016</p>
        </div>-->
      </div>
      <div class="price">
        <p>
          <strong style="color:red">￥{{ item.sell_price }}</strong>
          <del>￥{{ item.market_price }}</del>
        </p>
        <!-- 原类名mui-card-footer -->
        <div class="hot">
          <a class="mui-card-link">热卖中</a>
          <a class="mui-card-link">剩余{{item.stock_quantity}}件</a>
        </div>
      </div>
    </div>
    <mt-button @click="more_msg" type="danger">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  created() {
    this.get_goods_list()
  },
  data() {
    return {
      goods_list: [],
      more_goods_list: [],
      pagnum: 1
    }
  },
  methods: {
    // 获取首页数据
    async get_goods_list() {
      const { data: dt } = await this.$http.get(
        '/api/getgoods?pageindex=' + this.pagnum
      )
      this.goods_list = dt.message
      console.log(this.goods_list)
    },
    // 点击加载更多之后发送再次ajax ， 拿第二页的数据 然后把 新获得的数据
    // 循环 添加push 到老数据 数组里边 ， item 就是每一项
    async more_msg() {
      this.pagnum++
      const { data: dt } = await this.$http.get(
        '/api/getgoods?pageindex=' + this.pagnum
      )
      this.more_goods_list = dt.message

      this.more_goods_list.forEach(item => {
        this.goods_list.push(item)
      })
    },
    // 某个商品被点击的时候 跳转到详情页
    goods_detail(id) {
      this.$router.push('/home/goodsinfo/' + id)
    }
  }
}
</script>

<style>
.mint-button {
  width: 100%;
  margin: 0 5px;
}

.card_list {
  /* margin: 10px; */

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 90px;
}
.mui-card {
  max-width: 170px;

  /* width: 170px; */
  flex: 46%;

  margin: 5px;
  padding: 4px;
}
.mui-card p {
  font-size: 12px;
  /* height: 48px; */
}
.mui-card-header > img:first-child {
  width: 100%;
  height: 100%;
}
.price {
  background: #eee;
  padding: 3px;
  /* margin-top: 30px; */
}

.hot {
  display: flex;
  justify-content: space-between;
}
.hot a {
  color: #8f8f94;
  font-size: 12px;
}

.title {
  text-align: left;
  height: 50px;
}
</style>
