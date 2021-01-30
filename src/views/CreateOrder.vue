<template>
  <div class="create-order-view">
    <div class="create-order-wrapper">
      <h1 class="title" :class="{ 'is-one-step': isOneStep }">
        Заполните данные
      </h1>
      <div class="form" :class="{ 'is-one-step': isOneStep }">
        <div class="inputs-wrapper">
          <div class="inputs">
            <Input
              :inputValue="formData.inputValueName"
              :placeholder="placeholderName"
              @changeInputVal="formData.inputValueName = $event"
              :class="{ 'is-invalid': invalidName }"
            />
            <Input
              :inputValue="formData.inputValuePhone"
              :placeholder="placeholderPhone"
              :isPhone="true"
              @changeInputVal="formData.inputValuePhone = $event"
              :class="{ 'is-invalid': invalidPhone }"
            />
          </div>
          <div class="inputs">
            <Input
              :inputValue="formData.inputValueEmail"
              :placeholder="placeholderEmail"
              @changeInputVal="formData.inputValueEmail = $event"
              :class="{ 'is-invalid': invalidEmail }"
            />
            <Input
              :inputValue="formData.inputValueAdress"
              :placeholder="placeholderAdress"
              @changeInputVal="formData.inputValueAdress = $event"
              :class="{ 'is-invalid': invalidAdress }"
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
      </div>
      <div
        class="prev-arroy"
        @click="handleGoToPrevStep"
        :class="{ 'is-mobile': isMobile }"
      ></div>
      <div class="order-actions" :class="{ 'is-mobile': isMobile }">
        <div class="choice-water">
          <h2 class="subtitle">Вода</h2>
          <div class="cards">
            <Card
              class="card"
              v-for="(card, index) in cards"
              :key="index"
              :id="index"
              :data="card"
              :checked="index === 0 ? 'checked' : ''"
              @getValueCurrentCard="getValueCurrentCard"
              @increase="increase"
              @decrease="decrease"
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
                  :checked="item.id === 0 ? 'checked' : ''"
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
                :name="time"
                :checked="index === 0 ? 'checked' : ''"
                @getSelectedTime="getSelectedTime"
              >
                {{ time }}
              </TimeButton>
            </div>
          </div>
        </div>
      </div>
      <TotalPrice
        class="total"
        :total="totalPrice"
        :class="{ 'is-mobile': isMobile }"
      />
    </div>
    <Button
      class="btn-order"
      @click="handleForDoOrder"
      :class="{
        'is-btn-disable': isFormEmpty,
        'is-mobile': isMobile,
      }"
      >Заказать воду</Button
    >
    <Button
      class="btn-next-step"
      @click="handleGoToNextStep"
      :class="{
        'is-btn-disable': isFormEmpty,
        'is-one-step': isOneStep,
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
        inputValueName: "",
        inputValueEmail: "",
        inputValuePhone: "",
        inputValueAdress: "",
        checked: false,
      },
      placeholderName: "ФИО",
      placeholderEmail: "Email",
      placeholderPhone: "Телефон",
      placeholderAdress: "Адрес доставки",
      cards: [
        {
          productName: "Бутыль 18,9 л",
          quantity: 1,
          cost: 220,
          img: require("@/assets/images/icons/big-bottle.svg"),
        },
        {
          productName: "Блок по 1,5 л",
          quantity: 6,
          cost: 175,
          img: require("@/assets/images/icons/little-bottles.svg"),
        },
        {
          productName: "Блок по 0,5 л",
          quantity: 12,
          cost: 270,
          img: require("@/assets/images/icons/little-bottles.svg"),
        },
      ],
      total: 220,
      totalPrice: 220,
      quantity: 1,
      selectedTime: "10:00 - 11:00",
      selectedDay: "11",
      productName: "Бутыль 18,9 л",
      times: ["10:00 - 11:00", "12:00 - 13:00", "15:00 - 16:00"],
      calendar: [
        { day: "вт", number: "11", id: 0, weekend: false },
        { day: "ср", number: "12", id: 1, weekend: false },
        { day: "чт", number: "13", id: 2, weekend: false },
        { day: "пт", number: "14", id: 3, weekend: false },
        { day: "сб", number: "15", id: 4, weekend: true },
        { day: "вс", number: "16", id: 5, weekend: true },
      ],
      isWeekend: false,
      isMobile: false,
      isBtnDisable: true,
      isOneStep: false,
      invalidName: false,
      invalidEmail: false,
      invalidPhone: false,
      invalidAdress: false,
    };
  },
  computed: {
    timesView() {
      return this.times.filter((time) =>
        this.isWeekend ? time !== "10:00 - 11:00" : time
      );
    },
    isFormEmpty() {
      return (
        (this.formData.inputValueName &&
          this.formData.inputValueEmail &&
          this.formData.inputValuePhone &&
          this.formData.inputValueAdress) === "" ||
        this.formData.checked !== true
      );
    },
    validForm() {
      return !this.invalidName && !this.invalidEmail && !this.invalidPhone && !this.invalidAdress;
    }
  },
  methods: {
    conditionalName() {
      if (
        this.formData.inputValueName === "" ||
        this.formData.inputValueName.length < 3
      ) {
        this.invalidName = true;
      } else {
        this.invalidName = false;
      }
    },
    conditionalPhone() {
      if (this.formData.inputValuePhone === "") {
        this.invalidPhone = true;
      } else {
        this.invalidPhone = false;
      }
    },
    validEmail(email) {
      // eslint-disable-next-line no-useless-escape
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(email);
    },
    conditionalEmail() {
      if (!this.validEmail(this.formData.inputValueEmail)) {
        this.invalidEmail = true;
      } else {
        this.invalidEmail = false;
      }
    },
    conditionalAdress() {
      if (this.formData.inputValueAdress === "") {
        this.invalidAdress = true;
      } else {
        this.invalidAdress = false;
      }
    },
    next() {
      const first = this.calendar.shift();
      this.calendar = this.calendar.concat(first);
    },
    previous() {
      const last = this.calendar.pop();
      this.calendar = [last].concat(this.calendar);
    },
    handleOnCurrentDay(data) {
      this.isWeekend = data.weekend;
      this.selectedDay = data.number;
    },
    handleForDoOrder() {
      this.conditionalName();
      this.conditionalEmail();
      this.conditionalPhone();
      this.conditionalAdress();
      const { inputValuePhone, inputValueAdress } = this.formData;
      const data = {
        orderId: Math.floor(Math.random() * Math.floor(999)),
        price: this.totalPrice,
        product: this.productName,
        quantity: this.quantity,
        date: `${this.selectedDay} февраля`,
        time: this.selectedTime,
        adress: inputValueAdress,
        phone: inputValuePhone,
      };
      if (!this.isFormEmpty && this.validForm) {
        this.$store.dispatch("CREATE_ORDER", data);
        this.$router.push({ name: "completedOrder" });
      }
      console.log(this.validForm)
    },
    handleGoToNextStep() {
      if (!this.isFormEmpty) {
        this.isMobile = true;
        this.isOneStep = true;
      }
    },
    handleGoToPrevStep() {
      this.isMobile = false;
      this.isOneStep = false;
    },
    getValueCurrentCard(data) {
      this.productName = data.productName;
      this.totalPrice = data.cost;
      this.total = data.cost;
    },
    increase(sum) {
      this.quantity = sum;
      this.totalPrice += this.total;
    },
    decrease(sum) {
      this.quantity = sum;
      this.totalPrice > 0 ? (this.totalPrice -= this.total) : this.totalPrice;
    },
    getSelectedTime(value) {
      this.selectedTime = value;
    },
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
      .is-invalid {
        border-bottom: 1px solid red;
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
      display: none;
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
    @media only screen and (max-width: 980px) {
      display: none;
    }
    @media only screen and (max-width: 980px) {
      flex-direction: column;
      align-items: center;
      border-top: none;
    }
    .choice-water {
      @media only screen and (max-width: 980px) {
        min-width: 100%;
        border-bottom: 1px dashed #d5dde0;
      }
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
          @media only screen and (max-height: 690px) {
            margin-bottom: 5px;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .choice-date {
      min-width: 297px;
      @media only screen and (max-width: 980px) {
        min-width: 100%;
        padding-bottom: 30px;
      }
      @media only screen and (max-height: 690px) {
        padding-bottom: 10px;
      }
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
    @media only screen and (max-width: 980px) {
      display: none;
    }
    @media only screen and (max-height: 750px) {
      margin-bottom: 30px;
    }
  }
  .btn-order {
    @media only screen and (max-width: 980px) {
      display: none;
    }
  }
  .btn-next-step {
    display: none;
    @media only screen and (max-width: 980px) {
      display: flex;
    }
  }
  .is-mobile {
    @media only screen and (max-width: 980px) {
      display: flex;
    }
  }
  .is-one-step {
    @media only screen and (max-width: 980px) {
      display: none;
    }
  }
  .is-btn-disable {
    opacity: 0.4;
  }
}
</style>