<template>
  <div class="home-container">
    <Book
        v-for="book in books"
        :key="book.id"
        v-bind:title="book.title"
        v-bind:author="book.author"
        v-bind:img="book.img"
        v-bind:id="book.id"
    >
    </Book>
  </div>


</template>

<script>
    import {mapGetters} from "vuex";
    import firebase from 'firebase'
    import Book from '@/components/Book'
    import faker from 'faker'
    export default {
        data() {
            return {
                books: null
            }
        },
        components: {
          Book
        },

        async mounted() {
            const response = await firebase.database().ref('book').once('value')
            const data = response.toJSON()
            if (data) {
                this.books = data
            } else {
                for (let i = 1; i < 51 ; i ++) {
                    await firebase.database().ref(`/book/${i}`).set({
                        id: i,
                        title: faker.name.title(),
                        author: faker.name.findName(),
                        img: faker.image.image(),
                        description: faker.lorem.text(),
                        picked: false
                    })

                }
            }

        },
        computed: {
            ...mapGetters({
                user: "user"
            })
        }
    };
</script>

<style scoped>
  .home-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
</style>