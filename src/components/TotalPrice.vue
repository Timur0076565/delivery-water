<template>
	<div class="total-component">
		<h2 class="subtitle">Итого</h2>
		<div class="total">{{ total }} ₽</div>
	</div>
</template>

<script>
export default {
	props: {
		total: {
			type: String,
			default: "",
		}
	}
}
</script>

<style scoped lang="scss">
.total-component {
  padding-bottom: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #d5dde0;
  .total {
    font-weight: 500;
    font-size: 18px;
    color: #455273;
  }
}
</style>