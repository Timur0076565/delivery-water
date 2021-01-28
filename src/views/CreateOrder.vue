<template>
  <div class="create-order-view">
    <h1 class="title">Заполните данные</h1>
    <div class="form">
      <div class="inputs-wrapper">
        <div class="inputs">
          <Input
            :inputValue="formData.inputValueName"
            @changeInputVal="formData.inputValueName = $event"
          />
          <Input
            :inputValue="formData.inputValuePhone"
            @changeInputVal="formData.inputValuePhone = $event"
          />
        </div>
        <div class="inputs">
          <Input
            :inputValue="formData.inputValueEmail"
            @changeInputVal="formData.inputValueEmail = $event"
          />
          <Input
            :inputValue="formData.inputValueAdress"
            @changeInputVal="formData.inputValuePhone = $event"
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
    <div class="order-actions">
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
        </div>
        <div class="time">
          <div class="label">ВРЕМЯ</div>
          <div class="time-buttons">
            <TimeButton 
							class="time-button" 
							v-for="(time, index) in times" 
							:key="index"
						>
							{{time}}
						</TimeButton>
          </div>
        </div>
      </div>
    </div>
    <div class="total-wrapper">
      <h2 class="subtitle">Итого</h2>
      <div class="total">{{ total }} ₽</div>
    </div>
    <Button>Заказать воду</Button>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Checkbox.vue";
import Card from "@/components/Card.vue";
import TimeButton from "@/components/TimeButton.vue";

export default {
  components: {
    Input,
    Button,
    Checkbox,
    Card,
    TimeButton,
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
    };
  },
};
</script>

<style scoped lang="scss">
.create-order-view {
  background: #f5f8ff;
  border-radius: 6px;
  width: 816px;
  padding: 40px;
  .form {
    border-bottom: 1px dashed #d5dde0;
    .inputs-wrapper {
      display: flex;
      justify-content: space-between;
      .inputs {
        width: 328px;
      }
    }
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      .checkbox-descr {
        font-size: 12px;
        span {
          color: #418de8;
        }
      }
    }
  }
  .order-actions {
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
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .choice-date {
      .day,
      .time {
        .label {
          font-weight: 500;
          font-size: 10px;
          letter-spacing: 0.05em;
          color: #babdc2;
        }
			}
			.time {
				.time-buttons {
					display: flex;
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
  .total-wrapper {
    padding-bottom: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 1px solid #d5dde0;
    margin-bottom: 50px;
    .total {
      font-weight: 500;
      font-size: 18px;
      color: #455273;
    }
  }
}
</style>