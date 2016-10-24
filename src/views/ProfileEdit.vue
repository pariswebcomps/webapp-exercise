<template>
  <div class="container">
    <div class="movieCardForm row">
      <div v-if="person" class="col s12 card z-depth-3">
        <div class="card-content">
          <span class="card-title">Contact informations</span>
          <form @submit="updateProfile">
            <div class="row">
              <div class="input-field">
                <input type="text"
                       id="firstname"
                       name="firstname"
                       class="validate"
                       :class="{invalid: errors.has('firstname')}"
                       v-validate
                       data-rules="required"
                       v-model="person.firstname">
                <label for="firstname"
                       :class="{active: person.firstname || errors.has('firstname')}"
                       :data-error="errors.first('firstname')"
                >Firstname</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <input type="text"
                       id="lastname"
                       name="lastname"
                       class="validate"
                       :class="{invalid: errors.has('lastname')}"
                       v-validate
                       data-rules="required"
                       v-model="person.lastname">
                <label for="lastname"
                       :class="{active: person.lastname || errors.has('lastname')}"
                       :data-error="errors.first('lastname')"
                >Lastname</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <input type="text"
                       id="email"
                       name="email"
                       class="validate"
                       :class="{invalid: errors.has('email')}"
                       v-validate
                       data-rules="required|email"
                       v-model="person.email">
                <label for="email"
                       :class="{active: person.email || errors.has('email')}"
                       :data-error="errors.first('email')"
                >Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <input type="text"
                       id="phone"
                       name="phone"
                       class="validate"
                       :class="{invalid: errors.has('phone')}"
                       v-validate
                       data-rules="required"
                       v-model="person.phone">
                <label for="phone"
                       :class="{active: person.phone || errors.has('phone')}"
                       :data-error="errors.first('phone')"
                >Phone Number</label>
              </div>
            </div>
          </form>
        </div>

        <div class="card-action">
          <router-link :to="profileLink">Cancel</router-link>
          <a href="#"
             class="btn-flat"
             role="button"
             :class="{disabled: errors.any()}"
             @click.prevent="updateProfile">Submit</a>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { peoples } from '../resources'

export default {
  name: 'ProfileEdit',
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
    updateProfile () {
      if (this.errors.any()) return
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
  }
}
</script>
