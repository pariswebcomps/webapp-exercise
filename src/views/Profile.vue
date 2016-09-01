<template>
  <div>
    <CardPanel v-if="person" :person="person" full="full"></CardPanel>
    <p v-else>
      Loading
    </p>
  </div>
</template>

<script>
import CardPanel from 'components/CardPanel.vue'
import { peoples } from '../resources'

export default {
  data () {
    return {
      person: null
    }
  },
  beforeMount () {
    peoples(this.$route.params.id)
      .get()
      .then(person => this.person = person)
      .catch(console.log.bind(console))
  },
  components: { CardPanel }
}
</script>

<style>
</style>
