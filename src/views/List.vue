<template>
  <div>
    <div class="container">
      <div class="header row">
        <span class="col s6">You have {{peoples.length}} contacts</span>
      </div>

      <div class="row">

        <Search v-model="query"></Search>

        <div class="col s12">

          <div class="col s6" v-for="person in peopleFiltered">
            {{person.score}}
            <CardPanel :person="person"></CardPanel>
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
import Fuse from 'fuse.js'
import CardPanel from 'components/CardPanel.vue'
import Search from 'components/Search.vue'

import { peoples } from '../resources'

export default {
  data () {
    return {
      ready: false,
      query: '',
      peoples: []
    }
  },
  computed: {
    peopleFuse () {
      return new Fuse(this.peoples, {
        shouldSort: true,
        keys: [ 'firstname', 'lastname', 'entity', 'email' ]
      })
    },
    peopleFiltered () {
      if (!this.query) return this.peoples
      return this.peopleFuse.search(this.query)
    }
  },
  components: { CardPanel, Search },
  beforeMount () {
    peoples
      .get()
      .then((list) => {
        this.ready = true
        this.peoples = list
      })
      .catch(console.log.bind(console))
  }
}
</script>

<style>
.header {
  margin-top: 20px;
  font-size: 24px;
}
</style>
