<template>
  <div>
    <div class="mui-card comm_card">
      <h4>发表评论</h4>
    </div>

    <div class="mui-input-row" style="margin: 10px 0px;">
      <textarea id="textarea" rows="5" v-model="postData.content" placeholder="请输入要BB的内容 (最多吐槽20字)"></textarea>
    </div>
    <mt-button type="primary" @click="postComment()">发表评论</mt-button>
    <div class="cmt-list" v-for="(item,index) in CommentData" :key="index">
      <div class="cmt-title">第{{index+1}}楼 用户：{{item.user_name}} 发表时间：{{item.add_time | dateFormat}}</div>
      <div class="cmt-body">{{item.content}}</div>
    </div>
    <!-- 加载更多按钮 -->
    <button
      type="button"
      class="mui-btn mui-btn-danger mui-btn-outlined"
      @click="getMoreData()"
    >加载更多</button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  filters: {
    dateFormat(orgin) {
      return new Date(orgin).toLocaleString()
      //   return moment(orgin).format('YYYY--DD--MM')
    }
  },
  created() {
    this.getList()
    this.getCommentData()
  },
  data() {
    return {
      // 获取上一页面的id
      DataObj: {},
      // 评论数据data
      pageindex: 1,
      CommentData: [],
      // 提交评论所需数据
      postData: {
        artid: this.$route.params.id,
        content: ''
      }
    }
  },
  methods: {
    // 根据id拿到对应文章数据
    async getList() {
      const { data: dt } = await this.$http.get(
        '/api/getnew/' + this.postData.artid
      )
      if (dt.status !== 0) return Toast('数据请求失败，请检查网络')
      this.DataObj = dt.message[0]
    },
    // 获取评论内容
    async getCommentData() {
      const { data: dt } = await this.$http.get(
        `/api/getcomments/${this.postData.artid}?pageindex=${this.pageindex}`
      )
      this.CommentData = dt.message
    },
    // 加载更多
    async getMoreData() {
      this.pageindex++
      const { data: dt } = await this.$http.get(
        `/api/getcomments/${this.postData.artid}?pageindex=${this.pageindex}`
      )
      this.CommentData = this.CommentData.concat(dt.message)
    },
    // 提交评论功能
    async postComment() {
      if (this.postData.content.trim() === '') return Toast('评论不能为空')
      const { data: dt } = await this.$http.post(
        `/api/postcomment/${this.postData.artid}`,
        this.postData
      )
      if (dt.status === 0) {
        Toast(dt.message)
      }
      this.getCommentData()
      this.postData.content = ''
    }
  }
}
</script>



<style scoped>
.text-area,
.combox,
.cmt-list {
  padding: 0 4px;
}
h3 {
  font-size: 16px;
  text-align: center;
  margin: 15px 0;
  color: red;
}
.flexbox {
  font-size: 13px;
  color: #226aff;
}
textarea {
  height: 85px;
  margin: 0;
}
.mui-btn-primary,
.mui-btn-danger {
  width: 100%;
  height: 40px;
  font-size: 18px;
}
.cmt-title {
  margin-top: 5px;
  line-height: 30px;
  background-color: #ccc;
  font-size: 13px;
}
.cmt-body {
  font-size: 13px;
  line-height: 35px;
  text-indent: 2em;
}
.mui-btn-danger {
  margin-bottom: 50px;
}

.comm_card {
  margin: 0;
  padding-bottom: 5px;
}
.mint-button {
  width: 100%;
}
textarea {
  margin: 0;
}
</style>

