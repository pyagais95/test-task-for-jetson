<template>
  <div class="profile-container">
    <div class="user-info" v-if="user">
      <h1>{{user.name}}</h1>
      <h2>{{user.email}}</h2>
    </div>
    <div class="user-books" v-if="userBooks.length">
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
        <tr v-for="book in userBooks" :key="book.id">
          <td>{{book.title}}</td>
          <td>{{book.author}}</td>
          <td >
            <button
                v-if="book.refreshed < 3 && true"
                @click="refresh(book.reserveId)"
            >
              refresh
            </button>
            <button v-else disabled>
              you can refresh only 3 times
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  export default {
      data() {
          return {
              uid: '',
              user: null,
              userBooks: [],
          }
      },
      mounted() {
          this.getUser()
          this.getMyBooks()
      },
      methods: {
          async getUser() {
              const uid = firebase.auth().currentUser.uid
              if (uid) {
                  this.uid = uid
              }
              const user = (await firebase.database().ref('users').child(`${uid}`).once('value')).toJSON()
              if (user) {
                  this.user = user
              }
          },
          async getMyBooks() {
              const takenBooks = (await firebase.database().ref('taken-books').once('value')).toJSON()
              for (let item in takenBooks) {
                  if (takenBooks[item].user === this.uid) {
                      const id = takenBooks[item].bookId
                      const book = (await firebase.database().ref(`book/${id}`).once('value')).toJSON()
                      const updatedBook = {...book}
                      updatedBook.reserveId = item
                      updatedBook.refreshed = takenBooks[item].refreshed
                      this.userBooks.push(updatedBook)
                  }
              }
          },
          async refresh (id) {
              const takenBook = (await firebase.database().ref('taken-books').child(`${id}`).once('value')).toJSON()
              takenBook.refreshed = takenBook.refreshed + 1
              await firebase.database().ref('taken-books').child(`${id}`).update(takenBook)
          }
      }
  }
</script>
<style scope>
  th {
    text-align: left;
    padding: 5px;
  }
  td {
    padding: 5px;
    text-align: left;
  }
  .profile-container {
    display: flex;
    width: 100%
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  .user-books {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>