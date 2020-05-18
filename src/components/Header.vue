<template>

  <div v-if="!user.loggedIn" class="header-container">
    <div class="links">
      <router-link to="/all-books" class="link">All Books</router-link>
      <router-link to="/signin" class="link">Sign In</router-link>
      <router-link to="/signup" class="link">Sign Up</router-link>
    </div>

  </div>
  <div v-else class="header-container">
    <div class="links">
      <router-link to="/all-books" class="link">All Books</router-link>
      <router-link to="/profile" class="link">Profile</router-link>
      <div
          @click="signOut"
          class="signout-btn"
      >Sign Out</div>
    </div>

  </div>

</template>

<script>
    import { mapGetters } from "vuex";
    import firebase from "firebase";

    export default {
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        methods: {
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.push('/all-books');
                    });
            }
        }
    };
</script>

<style scoped>
  .header-container {
    width: 100%;
    height: 50px;
    background: #4f8a8c;
    display: flex;
    padding: 12px;
    box-sizing: border-box;
    justify-content: flex-end;
    color: #2c3e50;
  }
  .link {
    text-decoration: none;
    padding-right: 12px;
  }
  .link:visited {
    color: #2c3e50;
  }
  .signout-btn {
    display: flex;
    align-items: center;
    position: relative;
    float: right;
    cursor: pointer;
  }
</style>