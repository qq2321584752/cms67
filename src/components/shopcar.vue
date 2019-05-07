<template>
  <div>
    <div v-for="(item,k) in car_goods_list" :key="k">
      <div class="mui-card one-card">
        <div class="switch_box">
          <mt-switch v-model="value"></mt-switch>
          <img :src="item.thumb_path" alt>
        </div>
        <div class="unit_price">
          <p>{{ item.title }}</p>
          <span>
            固定单价
            <strong style="color:red">￥{{ item.sell_price }}</strong>
          </span>
          <div class="buy_box">
            <span>购买数量 ：</span>
            <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
              <button
                @click="minus_btn1"
                class="mui-btn mui-btn-numbox-minus"
                :disabled="goods_num1 <= 0 ? true :false"
                type="button"
              >-</button>
              <input id="test" class="mui-input-numbox" type="number" :value="goods_num1">
              <button @click="add_btn1" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
            <a href="javascript:;">删除</a>
          </div>
        </div>
      </div>
      <div class="mui-content">
        <div class="mui-card">
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <div class="total_">
                <p>总计 (不含运费)</p>
                <p>
                  已勾选
                  <strong>{{ value? goods_num1:0 }}</strong>件
                  ，总价
                  <strong>￥{{ goods_num1 * item.sell_price }}</strong>
                </p>
              </div>
              <div class="settlement">
                <mt-button type="danger">去结算</mt-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import car from './car.js'

export default {
  created() {
    this.get_goods_id()

    // car.$on('jiezhi', data => {
    //   console.log(data)
    //   console.log(car)
    // })
  },
  data() {
    return {
      // 用户点击的商品数量
      goods_num1: 0,
      // 该商品的id
      goods_id: 0,
      value: false,
      // 商品数据
      car_goods_list: []
    }
  },
  methods: {
    async get_goods_id() {
      this.goods_id = this.$router.history.current.params.id - 0
      this.goods_num1 = this.$router.history.current.params.num - 0
      // console.log(this.goods_id, this.goods_num1)
      const { data: dt } = await this.$http.get(
        `/api/goods/getshopcarlist/${this.goods_id}`
      )
      this.car_goods_list = dt.message
      console.log(dt)
    },
    // 加 数量 按钮
    add_btn1() {
      this.goods_num1++
    },
    minus_btn1() {
      this.goods_num1--
    },
    get_shop_car_data() {
      this.$http.get(`/api/goods/getshopcarlist/:ids`)
    }
  }
}
</script>

<style scoped>
strong {
  color: red;
}
.mui-card-content-inner {
  display: flex;

  flex-wrap: wrap;
  /* 两边对齐 中间留白 */
  justify-content: space-between;
  /* 垂直居中 */
  align-items: center;
}
.one-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.switch_box {
  display: flex;
  flex: 43%;
}
.switch_box img {
  width: 51%;
  height: 100%;
}
</style>
