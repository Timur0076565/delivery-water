<template>
  <input
    class="input-component"
    type="text"
    :value="inputValue"
    @input="changeInputVal"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    inputValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isPhone: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValueLocal: this.inputValue,
    };
  },
  methods: {
    changeInputVal(event) {
      this.isPhone
        ? (this.inputValueLocal = event.target.value = event.target.value
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0})/g, '+$1')
            .substr(0, 12))
        : (this.inputValueLocal = event.target.value);
      this.$emit("changeInputVal", this.inputValueLocal);
    },
  },
};
</script>

<style scoped lang="scss">
.input-component {
  outline: none;
  border: none;
  border-bottom: 1px solid #d5dde0;
  background-color: inherit;
  width: 100%;
  padding-bottom: 8px;
  margin-bottom: 30px;
  &::placeholder {
    font-weight: normal;
    font-size: 12px;
    color: #babdc2;
  }
}
</style>