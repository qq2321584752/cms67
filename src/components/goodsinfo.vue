<template>
  <div>
    <mt-swipe :show-indicators="true">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
    <!-- =============================================================== -->
    <div v-for="item in goods_detail" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-header">{{ item.title }}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <span>市场价：</span>
            <del>{{ item.market_price }}</del>
            <span>销售价：</span>
            <strong>￥{{ item.sell_price }}</strong>
            <br>
            <!-- 限制最大值 data-numbox-max="9" -->
            <div class="buy_box">
              <span>购买数量 ：</span>
              <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
                <button
                  @click="minus_btn"
                  class="mui-btn mui-btn-numbox-minus"
                  :disabled="goods_num <= 0 ? true :false"
                  type="button"
                >-</button>
                <input id="test" class="mui-input-numbox" type="number" :value="goods_num">
                <button @click="add_btn" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
            </div>

            <div class="btn_box">
              <mt-button size="small" type="primary">立即购买</mt-button>
              <mt-button size="small" type="danger">加入购物车</mt-button>
            </div>
          </div>
        </div>
        <!-- <div class="mui-card-footer">页脚</div> -->
        <!-- ====================================================== -->
      </div>

      <div class="mui-card mui-ba">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号：{{ item.goods_no }}</p>
            <p>库存情况：{{ item.stock_quantity }}</p>
            <p>上架时间：{{ item.add_time | Format}}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button class="introduction pic_desc" @click="pic_desc" type="primary" plain>图文介绍</mt-button>
          <br>
          <mt-button class="introduction" type="danger" @click="goodscomment" plain>商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.get_goods_detail_id()
    this.get_goods_detail()
  },
  data() {
    return {
      goods_detail_id: 0,
      goods_detail: [],
      //   总商品数量
      goods_num: 1
    }
  },
  filters: {
    Format(orgin) {
      return new Date(orgin).toLocaleString()
      //   return moment(orgin).format('YYYY--DD--MM')
    }
  },
  methods: {
    // 拿到 那边 数据传来的 详情id值
    get_goods_detail_id() {
      this.goods_detail_id = this.$router.history.current.params.id - 0
      //   window.location.reload()
      //   console.log(this.goods_detail_id)
    },
    // 获取单个商品 详情数据
    async get_goods_detail() {
      const { data: dt } = await this.$http.get(
        `/api/goods/getinfo/${this.goods_detail_id}`
      )
      this.goods_detail = dt.message
      //   console.log(dt)
    },
    // 加 数量 按钮
    add_btn() {
      this.goods_num++
    },
    minus_btn() {
      this.goods_num--
    },
    // 图文介绍按钮
    pic_desc() {
      this.$router.push('/home/goodsdesc/' + this.goods_detail_id)
    },
    // 商品评论
    goodscomment() {
      this.$router.push('/home/goodscomment/' + this.goods_detail_id)
    }
  }
}
</script>

<style>
.mui-ba {
  margin-bottom: 70px;
}
.introduction {
  width: 100%;
}
.mui-card-footer {
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
}
.btn_box {
  padding: 12px 0;
}
.buy_box {
  padding-top: 12px;
}
.mint-swipe {
  margin: 10px;
  height: 200px;
  background: pink;
}
.mui-card-content-inner span,
del {
  color: #8f8f94;
}
.mui-card-content-inner strong {
  font-size: 16px;
  color: red;
}
</style>
