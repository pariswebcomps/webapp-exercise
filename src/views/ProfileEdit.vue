<template>
  <div class="container">
    <div class="movieCardForm row">
      <div v-if="person" class="col s12 card z-depth-3">
        <div class="card-content">
          <span class="card-title">Contact informations</span>
          <form @submit="updateProfile">
            <div class="row">
              <ValidatorInput class="col s12"
                              id="title"
                              v-model="person.firstname"
                              :validator="validateNonEmpty"
              >Firstname</ValidatorInput>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="last_name" type="text" v-model="person.lastname" class="invalid">
                <label data-error="wrong" data-success="right" for="last_name">Lastname</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="text" class="validate" v-model="person.email">
                <label for="email">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="phone" type="text" class="validate" v-model="person.phone">
                <label for="phone">Phone number</label>
              </div>
            </div>
          </form>
        </div>
        <div class="card-action">
          <router-link :to="profileLink">Cancel</router-link>
          <a href="#" role="button" @click="updateProfile">Submit</a>
        </div>
      </div>

    </div>
</div>
</template>

<script>
import ValidatorInput from 'components/ValidatorInput'
import { peoples } from '../resources'

export default {
  data () {
    return {
      person: null
    }
  },
  computed: {
    profileLink () {
      return {
        name: 'profile',
        params: {
          id: this.person.id
        }
      }
    }
  },
  methods: {
    validateNonEmpty (str) {
      return str && str.length
    },
    updateProfile () {
      peoples(this.person.id)
      .put(this.person)
      .then(() => {
        this.$router.push(this.profileLink)
      })
      .catch(console.log.bind(console))
    }
  },
  beforeRouteEnter (route, redirect, next) {
    peoples(route.params.id)
      .get()
      .then(person => next(vm => vm.person = person))
      .catch(console.log.bind(console))
  },
  components: { ValidatorInput }
}
</script>
