<template>
  <div
    class="time-button-component"
    :class="{ 'active': active }"
    @click="handleOnCurrenTime"
  >
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handleOnCurrenTime() {
      this.active = !this.active;
    },
  },
};
</script>

<style scoped lang="scss">
.time-button-component {
  width: 93px;
  height: 30px;
  background: #e5edff;
  border-radius: 15px;
  color: #455273;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.active {
  background: #ffc369;
  color: #fff;
}
</style>