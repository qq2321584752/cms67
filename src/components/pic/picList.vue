<template>
  <div id="qpp" class="myCard">
    <div class="nav">
      <a @click="getPicList(14)">全部</a>
      <a class="navbar" v-for="(i,j) in picListInfo" :key="j" @click="getPicList(i.id)">{{i.title}}</a>
    </div>
    <ul>
      <mt-loadmore
        :bottom-method="loadBottom"
        :top-method="loadTop"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <li class="liStyle" v-for="(item,i) in picList" :key="i">
          <router-link :to="'/description/'+item.id">
            <img :src="item.img_url" alt>
          </router-link>
          <div class="poa">
            <div class="spanOne">{{item.title}}</div>
            <span class="spanTwo">{{item.zhaiyao}}</span>
          </div>
        </li>
      </mt-loadmore>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.getPicList(17)
    this.getPicListInfo()
  },
  methods: {
    async loadBottom() {
      console.log(111)
      // this.allLoaded = true // 若数据已全部获取完毕
      // this.$refs.loadmore.onBottomLoaded()
    },
    loadTop() {
      console.log(222)
      // this.$refs.loadmore.onTopLoaded()
    },

    // 图片描述
    async getPicDescription(v) {
      const dt = await this.$http.get(`/api/getimageInfo/${v}`)
      this.picDescriptionContent = dt.data.message[0].content
      this.picDescriptionTitle = dt.data.message[0].title
    },
    async getPicList(v) {
      var id = v + 3

      // 图片列表id 23~16
      const dt = await this.$http.get(`/api/getimages/${id}`)
      if (dt.data.message.length === 0) {
        return Toast({
          message: '数据获取失败',
          position: 'center',
          duration: 5000
        })
      }
      this.picList = dt.data.message
    },
    // /api/getimgcategory 图片文字列表
    async getPicListInfo() {
      const dt = await this.$http.get('/api/getimgcategory')
      if (dt.request.status !== 200) {
        return Toast({
          message: '数据获取失败',
          position: 'center',
          duration: 5000
        })
      }
      this.picListInfo = dt.data.message
    }
  },
  data() {
    return {
      picList: [],
      picListInfo: [],
      selected: 14,
      picDescriptionTitle: '',
      picDescriptionContent: '',
      allLoaded: false,
      autoFill: false
    }
  }
}
</script>

<style  scoped>
.liStyle {
  box-shadow: 0 0 9px #999;
  margin-bottom: 10px;
  width: 100%;
  position: relative;
}
.poa {
  position: absolute;
  bottom: 0;
  height: 23%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 12px;
  overflow: hidden;
}
.nav {
  padding: 10px 5px;
  overflow: auto;
  text-align: center;
  white-space: nowrap;
}
.navbar {
  display: inline-block;
  width: 33%;
}
.option {
  flex: 1;
}
.home {
  color: blue;
  width: 20%;
  font-weight: 500;
}
.router-link-active {
  background-color: lightgreen;
}
#qpp {
  padding-bottom: 50px;
}
</style>  
