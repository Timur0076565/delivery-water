<template>
  <button 
		type="button" 
		class="component-button" 
		v-on="$listeners"
	>
    <slot />
  </button>
</template>

<style scoped lang="scss">
.component-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
	font-size: 14px;
  text-transform: inherit;
  color: #fff;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  cursor: pointer;
  width: 165px;
  height: 40px;
  min-height: 40px;
	background: #418DE8;
	border-radius: 20px;
  &:hover {
    opacity: .8;
  }
  @media only screen and (max-width: 980px) {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>