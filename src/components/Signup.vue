<template>
  <div class="container">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp" class="sign-up-form">
      <input
          type="text"
          placeholder="name"
          v-model="name"
      />
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
        Sign Up
      </button>
    </form>
  </div>

</template>

<script>
    import firebase from 'firebase'

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                error: null
            }
        },
        methods: {
            async signUp() {
                try {
                    await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)

                    const user = firebase.auth().currentUser

                    if (user) {
                        await firebase.database().ref(`users/${user.uid}`).set({
                            name: this.name,
                            email: this.email,
                        })
                    }
                    this.$router.push('/all-books')
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>
  .sign-up-form {
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