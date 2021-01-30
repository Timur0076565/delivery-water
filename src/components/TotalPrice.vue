<template>
  <div class="total-component">
    <h2 class="subtitle">Итого</h2>
    <div class="total">{{ total }}<span class="total-span">,00 ₽</span></div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
};
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
    .total-span {
      color: #babdc2;
    }
  }
}
</style>