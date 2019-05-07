<template>
  <div>
    <!-- home -->

    <mt-swipe :show-indicators="false">
      <mt-swipe-item v-for="(item,k) in sw_list" :key="k">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
// import "./lib/js/mui.js";

export default {
  created() {
    this.get_sw_list();
  },
  data() {
    return {
      sw_list: []
    };
  },
  methods: {
    async get_sw_list() {
      const { data: dt } = await this.$http.get("/api/getlunbo");
      this.sw_list = dt.message;
      console.log(dt);
    }
  }
};
</script>

<style>
.mint-swipe {
  height: 200px;
  background: pink;
}
.mint-swipe img {
  width: 100%;
  height: 100%;
}
</style>
