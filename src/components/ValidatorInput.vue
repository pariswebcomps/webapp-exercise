<template>
  <div class="input-field">
    <input type="text"
           :id="id"
           class="validate"
           :class="inputClasses"
           @input="onInput"
           v-model="model">
    <label :for="id"
           :data-error="errorMessage"
           :class="labelClasses"
    ><slot></slot></label>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    id: String,
    validator: Function
  },
  computed: {
    model () { return this.value },
    inputClasses () {
      return {
        invalid: this.valid !== true
      }
    },
    valid () {
      return this.validator(this.value)
    },
    errorMessage () {
      return this.valid.length && this.valid
    },
    labelClasses () {
      return {
        active: this.value || this.errorMessage
      }
    }
  },
  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style>
.input-field label {
  width: 100%;
}
</style>
