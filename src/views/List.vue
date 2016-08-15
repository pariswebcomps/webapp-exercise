<template>
  <div>
    <div class="container">
      <div class="header row">
        <span class="col s6">You have 2 contacts</span>
      </div>

      <div class="row">

        <Search v-model="query"></Search>

        <div class="col s12">

          <div class="col s6">
            <CardPanel></CardPanel>
          </div>

        </div>
      </div>
    </div>

    <div class="fixed-action-btn horizontal" style="bottom: 45px; right: 24px;">
      <router-link to="/peoples/create" class="btn-floating btn-large red">
        <i class="large material-icons">mode_edit</i>
      </router-link>
      <a >
      </a>
    </div>
  </div>
</template>

<script>
import CardPanel from 'components/CardPanel.vue'
import Search from 'components/Search.vue'

export default {
  data () {
    return {
      query: ''
    }
  },
  components: { CardPanel, Search }
}
</script>

<style>
.header {
  margin-top: 20px;
  font-size: 24px;
}
</style>
