
<script setup>

  import { useRouter } from 'vue-router';

  const router = useRouter();

  const submitForm = e => {

    e.preventDefault();

    const data = JSON.stringify( {

      username: 'John',

      password: 'Johndoe@22',

      email: 'johndoe@gmail.com'

    } );

    const options = {

      method: 'post',

      body: data,

      headers: {

        'Content-Type': 'application/json',

        // 'Host': 'http://127.0.0.1:3000'

      } 

    }

    fetch( 'http://localhost:3000/signup/password', options )

      .then( res => {

        if ( res.ok ) router.push( { name: 'login' } );

      } )

      .then( data => console.log( data ) )

      .catch( error => alert( error.message ) )

  }

</script>

<template>

  <main class="w-screen h-screen flex justify-center items-center">

    <div class="w-96 px-4 py-8 border rounded">

      <h1 class="text-3xl font-semibold mb-8 text-center">Sign up</h1>

      <div class="flex flex-col gap-3">

        <button type="button" class="border border-neutral-300 px-4 py-2 rounded">Sign up with Google</button>

        <button type="button" class="border border-neutral-300 px-4 py-2 rounded">Sign up with Facebook</button>

      </div>

      <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 my-5">

        <hr>

        <span class="text-neutral-500 text-sm">or sign up with email</span>

        <hr>

      </div>

      <div>

        <form class="mb-4" action="" method="post">

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-2" for="username">Username</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="text" name="username" id="username" value="John" required>

          </fieldset>

          <fieldset class="flex flex-col mb-4">

            <label class="font-medium mb-2" for="email">Email</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="email" name="email" id="email" value="johndoe@gmail.com" required>

          </fieldset>

          <fieldset class="flex flex-col mb-6">

            <label class="font-medium mb-2" for="password">Password</label>

            <input class="rounded ring-transparent focus:border-transparent focus:ring-2 focus:ring-purple-800" type="password" name="password" id="password" value="Johndoe@22" required>

          </fieldset>

          <button class="px-5 py-2 bg-purple-800 text-white w-full text-bold rounded" type="submit" @click="submitForm">Create Account</button>

        </form>

        <p class="text-center text-sm">Already have an account? <router-link class="underline" to="/login">Login</router-link> </p>

      </div>

    </div>

  </main>

</template>

