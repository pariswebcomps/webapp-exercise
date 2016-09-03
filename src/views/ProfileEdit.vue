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
              <ValidatorInput class="col s12"
                              id="last_name"
                              v-model="person.lastname"
                              :validator="validateNonEmpty"
              >Lastname</ValidatorInput>
            </div>
            <div class="row">
              <ValidatorInput class="col s12"
                              id="email"
                              v-model="person.email"
                              :validator="validateEmail"
              >Email</ValidatorInput>
            </div>
            <div class="row">
              <ValidatorInput class="col s12"
                              id="phone"
                              v-model="person.phone"
                              :validator="validateNonEmpty"
              >Phone number</ValidatorInput>
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
import isEmail from 'validator/lib/isEmail'

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
    validateEmail (str) {
      return isEmail(str) || 'Please, provide a valide email"'
    },
    validateNonEmpty (str) {
      return str && str.length > 0 || 'This field cannot be empty'
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
