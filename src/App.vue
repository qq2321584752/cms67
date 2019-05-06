<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <mt-header fixed title="固定在顶部"></mt-header>
    <nav class="mui-bar mui-bar-tab">
      <routerLink class="mui-tab-item" to="home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </routerLink>
      <routerLink class="mui-tab-item" to="member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </routerLink>
      <routerLink class="mui-tab-item" to="shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">9</span>
        </span>

        <span class="mui-tab-label">购物车</span>
      </routerLink>
      <routerLink class="mui-tab-item" to="search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </routerLink>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* 固定定位的 头部已经处于脱标状态 ， 不占文档流位置所以需要 padding挤出来 */
#app {
  padding-top: 40px;
}
/* .mint-header {
  margin-bottom: 40px;
} */
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
