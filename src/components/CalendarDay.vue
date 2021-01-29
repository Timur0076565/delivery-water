<template>
  <div
    class="calendar-day"
    :class="{ 'active-calendar-day': activeCalendar }"
    @click="handleOnCurrentDay(calendar.weekend)"
  >
    <p class="day-number">{{ calendar.number }}</p>
    <div class="day-name" :class="{ 'is-weekend': calendar.weekend }">
      {{ calendar.day }}
    </div>
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
  },
  data() {
    return {
      activeCalendar: false,
    };
	},
	methods: {
		handleOnCurrentDay(value) {
			this.activeCalendar = !this.activeCalendar
			this.$emit('handleOnCurrentDay', value)
		}
	}
};
</script>

<style scoped lang="scss">
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
.active-calendar-day {
  background: #ffc369;
  color: #fff;
  .day-number,
  .day-name {
    color: #fff;
  }
}
</style>