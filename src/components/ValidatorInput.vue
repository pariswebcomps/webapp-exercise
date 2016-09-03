<template>
  <div class="input-field">
    <input type="text"
           :id="id"
           :class="this.invalid ? 'invalid' : ''"
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
    errorMessage: String,
    value: String,
    id: String,
    validator: Function
  },
  computed: {
    model () { return this.value },
    invalid () {
      return !this.validator(this.value)
    },
    labelClasses () {
      return {
        active: this.value
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
