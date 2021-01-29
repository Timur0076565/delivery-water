<template>
  <div class="tieser" :class="{'is-cliked': isClicked}">
    <Logo />
    <h1 class="title">Чистая Вода</h1>
    <p class="descr">
      Питьевая вода, предназначенная для ежедневного потребления, идеально
      подходит для кулеров. Закажите доставку воды и мы привезем её на дом или в
      офис.
    </p>
    <Button class="tieser-buttom" @click="handleOnBtn">Заказать воду</Button>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Logo,
    Button,
	},
	data() {
    return {
      isClicked: false,
    }
  },
	methods: {
    handleOnBtn() {
			this.isClicked = true;
    }
  }
};
</script>

<style scoped lang="scss">
.tieser {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 474px;
  width: 100%;
  @media only screen and (max-width: 980px) {
		max-width: 100%;
		height: 100%;
    z-index: 1;
    position: absolute;
    background: #f5f8ff;
  }
  .title {
    padding-top: 25px;
  }
  .descr {
    max-width: 240px;
    text-align: center;
  }
  .tieser-buttom {
    margin-top: 60px;
    display: none;
    @media only screen and (max-width: 980px) {
      display: block;
    }
  }
}
.is-cliked {
	z-index: -1;
}
</style>