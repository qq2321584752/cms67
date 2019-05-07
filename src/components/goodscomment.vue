<template>
  <div>
    <div class="mui-card comm_card">
      <h4>发表评论</h4>
    </div>

    <div class="mui-input-row" style="margin: 10px 0px;">
      <textarea id="textarea" rows="5" placeholder="请输入要BB的内容 (最多吐槽20字)"></textarea>
    </div>
    <mt-button type="primary">发表评论</mt-button>

    <div class="ment_list">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
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
