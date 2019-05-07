<template>
  <div id="description" class="myCard">
    <h4>{{title}}</h4>
    <p>
      <span>发表时间：{{add_time | dateFormat}}</span>
      <span>点击：{{click}}次</span>
    </p>
    <hr>
    <div>
      <img class="descriptionImg" :src="i.src" alt v-for="(i,j) in pic" :key="j">
    </div>
    <p v-html="content"></p>
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
export default {
  created() {
    this.getDescription()
    this.getPicData()
    this.getCommentData()
  },
  methods: {
    async getPicData() {
      let id = this.$router.history.current.params.id
      const { data } = await this.$http.get(`/api/getthumimages/${id}`)
      this.pic = data.message
    },
    async getDescription() {
      let id = this.$router.history.current.params.id
      const { data } = await this.$http.get(`/api/getimageInfo/${id}`)
      this.title = data.message[0].title
      this.click = data.message[0].click
      this.add_time = data.message[0].add_time
      this.content = data.message[0].content
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
  },
  data() {
    return {
      title: '',
      Subheading: '',
      click: '',
      add_time: '',
      content: '',
      pic: [],
      pageindex: 1,
      CommentData: [],
      // 提交评论所需数据
      postData: {
        artid: this.$route.params.id,
        content: ''
      }
    }
  }
}
</script>

<style  scoped>
.descriptionImg {
  width: 42%;
  margin: 10px 10px;
}
#description {
  padding-bottom: 40px;
}
h4 {
  color: #26a2ff;
  font-size: 15px;
  text-align: center;
  margin: 15px 0;
}
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
