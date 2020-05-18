<template>
  <div class="details-container">
    <Book
        v-bind:title="book.title"
        v-bind:author="book.author"
    />
    <div class="description">
      <div>
        {{book.description}}
      </div>
      <button @click="takeBook" v-if="bookIsTaken" disabled="true">
        book is already taken
      </button>
      <button @click="takeBook" v-else>
        take a book
      </button>
    </div>
  </div>
</template>

<script>
  import Book from "@/components/Book"
  import firebase from "firebase";

  export default {
      data() {
          return {
              book: null,
              bookIsTaken: false
          }
      },
      async mounted() {
          const book = await firebase.database().ref(`book/${this.$route.params.id}`).once('value')
          this.book = book.toJSON()
          this.disableButton()
      },
      components: {
          Book
      },
      methods: {
          async takeBook () {
              const user = await firebase.auth().currentUser
              if (user && !this.bookIsTaken) {
                  await firebase.database().ref('taken-books').push({
                      user: user.uid,
                      bookId: this.book.id,
                      date: new Date().toDateString(),
                      refreshed: 0,
                  })
                  this.disableButton()
              }
          },
          async disableButton () {
              const takenBooks = (await firebase.database().ref('taken-books').once('value')).toJSON()
              for (let item in takenBooks) {
                  if (takenBooks[item].bookId === this.book.id) {
                      this.bookIsTaken = true
                  }
              }
          }
      }
  }
</script>

<style scoped>
  .details-container {
    display: flex;
  }
  .description {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 24px;
    text-align: left;
    padding-top: 50px;
  }
</style>