<template>
  <div class="container">
    <h1>Sign In</h1>
    <form @submit.prevent="signIn" class="sign-in-form">
      <input
          type="email"
          placeholder="email"
          v-model="email"
      />
      <input
          type="password"
          placeholder="password"
          v-model="password"
      />
      <button
          type="submit"
          name="submit"
          class="submit-button"
      >
        Sign In
      </button>
    </form>
  </div>

</template>

<script>
    import firebase from 'firebase'

    export default {
        data() {
            return {
                email: '',
                password: '',
                error: null
            }
        },
        methods: {
            async signIn() {
                try {
                    const response = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    if(response) {
                        this.$router.push('/all-books')
                    }
                } catch (e) {
                    console.log(e)
                }

            }
        }
    }
</script>

<style scoped>
  .sign-in-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .submit-button {
    width: 312px;
    height: 30px;
    margin: 5px;
    background: cornflowerblue;
    border: 1px solid cornflowerblue;
    border-radius: 4px;
    color: #ffffff;
  }

  input {
    width: 300px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid cornflowerblue;
    padding: 5px;
    margin: 5px;
  }

</style>