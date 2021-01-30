<template>
  <div class="component-checkbox">
    <div class="content-checkbox">
      <label class="checkbox-label">
        <input type="checkbox" v-model="showCheckbox" />
        <span></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    showCheckbox: {
      get() {
        if (this.checked.checked === true) {
          return this.checked.checked;
        } else {
          return this.checked.checked;
        }
      },
      set(newValue) {
        this.$emit("getCheckboxValue", newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.component-checkbox {
  position: relative;
  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    cursor: pointer;
    border: 1.5px solid #d5dde0;
    border-radius: 3px;
    &::after {
      content: "";
      width: 16px;
      height: 16px;
      background: #418de8 url("../assets/images/icons/checked.svg") no-repeat
        center;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      display: block;
    }
  }
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked ~ span::after {
    transform: translate(-50%, -50%) scale(1);
  }
  .content-checkbox {
    width: 20px;
    height: 20px;
  }
}
</style>