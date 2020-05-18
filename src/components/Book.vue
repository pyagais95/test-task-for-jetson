<template>
  <div
      class="book-container"
      @click="getSingleBook"
  >
    <h1>{{title}}</h1>
    <h2>{{author}}</h2>
    <img src="../../public/book.jpg" alt="img" class="image-container">
  </div>
</template>

<script>
  export default {
      props: {
          id: Number,
          title: String,
          author: String,
          img: String,
      },
      methods: {
          getSingleBook () {
              this.$router.push(`book/${this.id}`);
          }
      }
  }
</script>

<style scoped>
  .book-container {
    width: 450px;
    height: 600px;
  }
  .image-container{
    width: 300px;
    height: 400px;
  }
</style>