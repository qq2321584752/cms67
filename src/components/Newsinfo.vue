<template>
  <div>
    <!-- 文章详情页面 -->
    <div class="text-area">
      <h3>{{ DataObj.title }}</h3>
      <div class="flexbox">
        <span>发表时间：{{ DataObj.add_time | dateFormat }}</span>
        <span style="float:right">点击：{{ DataObj.click }}次</span>
      </div>
      <hr>
      <div v-html="DataObj.content"></div>
    </div>
    <!-- 发布评论框 -->
    <div class="combox">
      <h4>发表评论</h4>
      <hr>
      <textarea placeholder="请发表您的留言" v-model="postData.content"></textarea>
      <button type="button" class="mui-btn mui-btn-primary" @click="postComment()">发表评论</button>
    </div>
    <!-- 获取评论页面 -->
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
</style>
