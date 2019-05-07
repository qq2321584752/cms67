<template>
  <div>newlist</div>
</template>

<script>
export default {
  created() {
    this.getListData()
  },
  methods: {
    async getListData() {
      const { data: dt } = await this.$http.get('/api/getnewslist')
      console.log(dt)
    }
  }
}
</script>

<style>
</style>
