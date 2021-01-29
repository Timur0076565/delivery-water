<template>
  <div class="create-order-view">
    <div class="create-order-wrapper">
      <h1 class="title" v-show="!isTwoStep">Заполните данные</h1>
      <div class="form" v-show="!isTwoStep">
        <div class="inputs-wrapper">
          <div class="inputs">
            <Input
              :inputValue="formData.inputValueName"
              :placeholder="placeholderName"
              @changeInputVal="formData.inputValueName = $event"
            />
            <Input
              :inputValue="formData.inputValuePhone"
              :placeholder="placeholderPhone"
              @changeInputVal="formData.inputValuePhone = $event"
            />
          </div>
          <div class="inputs">
            <Input
              :inputValue="formData.inputValueEmail"
              :placeholder="placeholderEmail"
              @changeInputVal="formData.inputValueEmail = $event"
            />
            <Input
              :inputValue="formData.inputValueAdress"
              :placeholder="placeholderAdress"
              @changeInputVal="formData.inputValueAdress = $event"
            />
          </div>
        </div>
        <div class="checkbox-wrapper">
          <Checkbox
            class="checkbox"
            :checked="{ checked: formData.checked }"
            @getCheckboxValue="formData.checked = !formData.checked"
          />
          <p class="checkbox-descr">
            Я согласен на <span>обработку персональных данных</span>
          </p>
        </div>
        <!-- <Button @click="handleGoToNextStep" v-show="isMobile">Далее</Button> -->
      </div>
      <div
        class="prev-arroy"
        @click="handleGoToPrevStep"
        v-show="!isMobile"
      ></div>
      <div class="order-actions" v-show="!isMobile">
        <div class="choice-water">
          <h2 class="subtitle">Вода</h2>
          <div class="cards">
            <Card
              class="card"
              v-for="(card, index) in cards"
              :key="index"
              :id="index"
              :data="card"
            />
          </div>
        </div>
        <div class="choice-date">
          <h2 class="subtitle">Дата и время доставки</h2>
          <div class="day">
            <div class="label">ДЕНЬ</div>
            <div class="calendar-slider">
              <div class="arrow arrow-prev" @click="previous"></div>
              <transition-group class="calendar-wrapper" tag="div">
                <CalendarDay
                  v-for="item of calendar"
                  :key="item.id"
                  :calendar="item"
                  class="calendar-day"
                  @handleOnCurrentDay="handleOnCurrentDay"
                />
              </transition-group>
              <div class="arrow arrow-next" @click="next"></div>
            </div>
          </div>
          <div class="time">
            <div class="label">ВРЕМЯ</div>
            <div class="time-buttons">
              <TimeButton
                class="time-button"
                v-for="(time, index) in timesView"
                :key="index"
              >
                {{ time }}
              </TimeButton>
            </div>
          </div>
        </div>
      </div>
      <TotalPrice class="total" :total="total" v-show="!isMobile" />
    </div>
    <Button @click="handleForDoOrder" v-show="!isMobile">Заказать воду</Button>
    <Button
      @click="handleGoToNextStep"
      v-show="isMobile"
      :class="{
        'is-btn-disable':
          (formData.inputValueName &&
            formData.inputValueEmail &&
            formData.inputValuePhone &&
            formData.inputValueAdress) === '' || formData.checked !== true,
      }"
      >Далее</Button
    >
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Checkbox.vue";
import Card from "@/components/Card.vue";
import TimeButton from "@/components/TimeButton.vue";
import CalendarDay from "@/components/CalendarDay.vue";
import TotalPrice from "@/components/TotalPrice.vue";

export default {
  components: {
    Input,
    Button,
    Checkbox,
    Card,
    TimeButton,
    CalendarDay,
    TotalPrice,
  },
  data() {
    return {
      formData: {
        inputValueName: "Кудряшов Вячеслав Сергеевич",
        inputValueEmail: "voda@mail.ru",
        inputValuePhone: "+7 (905) 606-40-04",
        inputValueAdress: "г. Самара, ул. Спортивная 25, офис 305",
        checked: false,
      },
      placeholderName: "ФИО",
      placeholderEmail: "Email",
      placeholderPhone: "Телефон",
      placeholderAdress: "Адрес доставки",
      cards: [
        {
          liters: "18,9",
          quantity: 1,
          cost: 220,
          img: require("@/assets/images/icons/big-bottle.svg"),
        },
        {
          liters: "1,5",
          quantity: 6,
          cost: 175,
          img: require("@/assets/images/icons/little-bottles.svg"),
        },
        {
          liters: "0,5",
          quantity: 12,
          cost: 270,
          img: require("@/assets/images/icons/little-bottles.svg"),
        },
      ],
      total: "220,00",
      times: ["10:00 - 11:00", "12:00 - 13:00", "15:00 - 16:00"],
      calendar: [
        { day: "вт", number: "11", id: 0, weekend: false },
        { day: "ср", number: "12", id: 1, weekend: false },
        { day: "чт", number: "13", id: 2, weekend: false },
        { day: "пт", number: "14", id: 3, weekend: false },
        { day: "сб", number: "15", id: 4, weekend: true },
        { day: "вс", number: "16", id: 5, weekend: true },
      ],
      activeCalendar: false,
      isWeekend: false,
      isMobile: false,
      isTwoStep: false,
      isBtnDisable: true,
    };
  },
  computed: {
    timesView() {
      return this.times.filter((time) =>
        this.isWeekend ? time !== "10:00 - 11:00" : time
      );
    },
  },
  methods: {
    next() {
      const first = this.calendar.shift();
      this.calendar = this.calendar.concat(first);
    },
    previous() {
      const last = this.calendar.pop();
      this.calendar = [last].concat(this.calendar);
    },
    handleOnCurrentDay(value) {
      this.isWeekend = value;
    },
    handleForDoOrder() {
      this.$router.push({ name: "completedOrder" });
    },
    hiddenElementsIsMobile() {
      window.innerWidth <= 980 ? (this.isMobile = true) : this.isMobile;
    },
    handleGoToNextStep() {
      const {
        inputValueName,
        inputValueEmail,
        inputValuePhone,
        inputValueAdress,
        checked,
      } = this.formData;
      if (
        (inputValueName &&
          inputValueEmail &&
          inputValuePhone &&
          inputValueAdress) !== "" &&
        checked
      ) {
        this.isMobile = false;
        this.isTwoStep = true;
      }
    },
    isNoDisableBtn() {
      const {
        inputValueName,
        inputValueEmail,
        inputValuePhone,
        inputValueAdress,
        checked,
      } = this.formData;
      if (
        (inputValueName &&
          inputValueEmail &&
          inputValuePhone &&
          inputValueAdress) !== "" &&
        checked
      ) {
        this.isBtnDisable = true;
      }
    },
    handleGoToPrevStep() {
      this.isMobile = true;
      this.isTwoStep = false;
    },
  },
  mounted() {
    this.hiddenElementsIsMobile();
    this.isNoDisableBtn();
  },
};
</script>

<style scoped lang="scss">
.create-order-view {
  background: #f5f8ff;
  border-radius: 6px;
  width: 816px;
  padding: 40px;
  margin-right: 10px;
  @media only screen and (max-height: 750px) {
    padding: 20px;
  }
  @media only screen and (max-width: 1050px) {
    padding: 20px;
  }
  @media only screen and (max-width: 980px) {
    padding: 30px 20px 60px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .form {
    .inputs-wrapper {
      display: flex;
      justify-content: space-between;
      @media only screen and (max-width: 980px) {
        flex-direction: column;
        width: 100%;
      }
      .inputs {
        width: 328px;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
        @media only screen and (max-width: 980px) {
          width: 100%;
          margin-right: 0;
        }
      }
    }
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      @media only screen and (max-height: 750px) {
        padding-bottom: 20px;
      }
      @media only screen and (max-width: 980px) {
        margin-bottom: auto;
      }
      .checkbox-descr {
        font-size: 12px;
        span {
          color: #418de8;
        }
      }
    }
  }
  .prev-arroy {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #418de8;
    position: relative;
    display: none;
    @media only screen and (max-width: 980px) {
      display: block;
    }
    &::after {
      content: "";
      width: 30px;
      height: 30px;
      background: url("../assets/images/icons/white-arrow.svg") no-repeat center;
      position: absolute;
    }
  }
  .order-actions {
    border-top: 1px dashed #d5dde0;
    border-bottom: 1px dashed #d5dde0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .choice-water {
      .subtitle {
        padding-bottom: 20px;
      }
      .cards {
        display: flex;
        .card {
          margin-right: 20px;
          margin-bottom: 60px;
          @media only screen and (max-height: 750px) {
            padding-bottom: 30px;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .choice-date {
      min-width: 297px;
      .subtitle {
        padding-bottom: 20px;
      }
      .day {
        .calendar-slider {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          .calendar-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            .calendar-day {
              transition: 0.3s ease all;
            }
          }
          .arrow {
            width: 30px;
            height: 30px;
            border: 1.5px solid #e5edff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
          }
          .arrow-prev {
            &::after {
              content: "";
              width: 16px;
              height: 16px;
              background: url("../assets/images/icons/arrow-prev.svg") no-repeat
                center;
              border-radius: 3px;
              position: absolute;
              display: block;
            }
          }
          .arrow-next {
            &::after {
              content: "";
              width: 16px;
              height: 16px;
              background: url("../assets/images/icons/arrow-next.svg") no-repeat
                center;
              border-radius: 3px;
              position: absolute;
              display: block;
            }
          }
        }
      }
      .day,
      .time {
        .label {
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.05em;
          color: #babdc2;
          padding-bottom: 10px;
        }
      }
      .time {
        .time-buttons {
          display: flex;
          justify-content: center;
          .time-button {
            margin-right: 9px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .total {
    margin-bottom: 50px;
    @media only screen and (max-height: 750px) {
      margin-bottom: 30px;
    }
  }
  .is-btn-disable {
    opacity: 0.4;
  }
}
</style>