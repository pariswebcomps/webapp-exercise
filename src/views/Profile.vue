<template>
  <div class="container">
    <div class="row">
      <div class="col s6 offset-s3">
        <CardPanel v-if="person" :person="person" full="full"></CardPanel>
        <p v-else>
          Loading
        </p>
      </div>
    </div>
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
  beforeRouteEnter (route, redirect, next) {
    peoples(route.params.id)
      .get()
      .then(person => next(vm => vm.person = person))
      .catch(console.log.bind(console))
  },
  components: { CardPanel }
}
</script>

<style scoped>
.skills {
  padding: 10px;
  background-color: #FAFAFA;
}

.skills h3 {
  font-size: 24px;
  font-weight: normal;
  line-height: 1.1;
}

.skills a {
  background-color: white;
  color: #000;
  margin: 5px;
}

.links{
  text-align: center;
}

.links img{
  padding:0 5px;
}
</style>
