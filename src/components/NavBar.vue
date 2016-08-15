<template>
  <nav>
    <div class="nav-wrapper">
      <router-link to="/">
        <img class="logo" src="~images/logo-people.svg">
      </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li>
          <router-link to="/">Peoples</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

<style>
.logo {
  margin-left: 10px;
  height: 100%;
}

nav {
  background-color: #0168AB;
}
</style>
