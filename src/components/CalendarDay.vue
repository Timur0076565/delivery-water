<template>
  <div class="calendar-day-wrapper">
    <input
      class="input-radio-day"
      :id="calendar.number"
      type="radio"
      name="day"
      :checked="checked"
    />
    <label
      class="calendar-day"
      @click="handleOnCurrentDay(calendar)"
      :for="calendar.number"
    >
      <p class="day-number">{{ calendar.number }}</p>
      <div class="day-name" :class="{ 'is-weekend': calendar.weekend }">
        {{ calendar.day }}
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    calendar: {
      type: Object,
      default: () => {
        return {};
      },
    },
    checked: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleOnCurrentDay(data) {
      this.$emit("handleOnCurrentDay", data);
    },
  },
};
</script>

<style scoped lang="scss">
.input-radio-day[type="radio"] {
  display: none;
}
.calendar-day {
  width: 30px;
  height: 30px;
  background: #e5edff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  margin-right: 8px;
  line-height: 11px;
  &:last-child {
    margin-right: 0;
  }
  .day-number {
    font-size: 12px;
  }
  .day-name {
    font-weight: normal;
    font-size: 9px;
    line-height: 11px;
    color: #9caedd;
  }
  .is-weekend {
    color: #fd7562;
  }
}
.input-radio-day[type="radio"]:checked + .calendar-day {
  background: #ffc369;
  color: #fff;
  .day-number,
  .day-name {
    color: #fff;
  }
}
</style>