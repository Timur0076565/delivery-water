<template>
  <div class="create-order-view">
    <h1 class="title">Заполните данные</h1>
    <div class="form">
      <div class="inputs-wrapper">
        <Input
          :inputValue="formData.inputValueName"
          @changeInputVal="formData.inputValueName = $event"
        />
				<Input
          :inputValue="formData.inputValuePhone"
          @changeInputVal="formData.inputValuePhone = $event"
        />
      </div>
      <div class="inputs-wrapper">
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
    <Button>Заказать воду</Button>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      formData: {
        inputValueName: "Кудряшов Вячеслав Сергеевич",
        inputValueEmail: "voda@mail.ru",
        inputValuePhone: "+7 (905) 606-40-04",
        inputValueAdress: "г. Самара, ул. Спортивная 25, офис 305",
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
		display: flex;
		justify-content: space-between;
		.inputs-wrapper {
			width: 328px;
		}
	}
}
</style>