<template>
  <div class="time-button-wrapper">
    <input
      class="input-radio-time"
      :id="name"
      type="radio"
      name="time"
      :checked="checked"
    />
    <label
      class="time-button-component"
      @click="handleOnCurrenTime(name)"
      :for="name"
    >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    checked: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handleOnCurrenTime(value) {
      this.$emit("getSelectedTime", value);
    },
  },
};
</script>

<style scoped lang="scss">
.input-radio-time[type="radio"] {
  display: none;
}
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
  font-size: 12px;
}
.input-radio-time[type="radio"]:checked + .time-button-component {
  background: #ffc369;
  color: #fff;
}
</style>