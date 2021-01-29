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
    }
	},
	data() {
    return {
      inputValueLocal: this.inputValue,
    };
  },
  methods: {
    changeInputVal(event) {
      this.inputValueLocal = event.target.value;
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
    color: #BABDC2;
  }
}
</style>