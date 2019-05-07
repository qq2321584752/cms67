<template>
  <div>
    <!-- 文章列表页面 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in listData" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <p>{{item.title}}</p>
            <span class="mui-ellipsis">发布时间：{{item.add_time | dateFormat}}</span>
            <span style="float:right" class="click">点击:{{item.click}}次</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.getListData()
  },
  data() {
    return {
      // 列表数据data
      listData: []
    }
  },
  methods: {
    // 获取列表数据
    async getListData() {
      const { data: dt } = await this.$http.get('/api/getnewslist')
      // console.log(dt)
      if (dt.status !== 0) return Toast('数据请求失败，请检查网络')
      this.listData = dt.message
    }
  }
}
</script>

<style scoped>
.mui-ellipsis,
.click {
  font-size: 12px;
  color: blue;
}
.mui-media-body p {
  color: black;
}
</style>
