<template>
  <div>
    <div class="goods_desc1" v-for="(item,k) in goods_desc_list" :key="k">
      <h3>{{item.title}}</h3>
      <p v-html="item.content"></p>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.get_goods_desc_id()
    this.get_goods_desc()
  },
  data() {
    return {
      goods_desc_id: 0,
      goods_desc_list: []
    }
  },
  methods: {
    //   获取商品id方法
    get_goods_desc_id() {
      this.goods_desc_id = this.$router.history.current.params.id - 0
      // //   console.log(this.goods_desc_id)
    },
    async get_goods_desc() {
      const { data: dt } = await this.$http.get(
        `/api/goods/getdesc/${this.goods_desc_id}`
      )
      this.goods_desc_list = dt.message
      //   console.log(dt)
    }
  }
}
</script>

<style>
/* 没有加scoped 加上 之后 控制 不来图片的宽度 */
.goods_desc h3 {
  text-align: center;
  font-size: 16px;
  padding: 15px 0;
  border-bottom: 1px solid rgb(148, 146, 146);
  color: #226aff;
}
.gomeImgLoad {
  width: 100%;
}
.goods_desc {
  padding: 0 6px;
}
</style>
