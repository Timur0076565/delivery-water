<template>
  <input 
		class="input-component" 
		type="text" 
		:value="inputValue"
    @input="changeInputVal"/>
</template>

<script>
export default {
  components: {},
  props: {
    // isPhone: {
    //   type: Boolean,
    //   default: false,
		// },
		inputValue: {
      type: String,
      default: "",
    },
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
}
</style>