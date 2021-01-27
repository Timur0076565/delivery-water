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
    <Button>Заказать воду</Button>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Checkbox.vue";

export default {
  components: {
    Input,
    Button,
    Checkbox,
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
		border-bottom: 1px dashed #D5DDE0;
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
}
</style>