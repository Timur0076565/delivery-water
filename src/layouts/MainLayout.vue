<template>
  <div class="main">
    <div class="tieser">
      <Logo />
      <h1 class="title">Чистая Вода</h1>
      <p class="descr">
        Питьевая вода, предназначенная для ежедневного потребления, идеально
        подходит для кулеров. Закажите доставку воды и мы привезем её на дом или
        в офис.
      </p>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
  components: {
    Logo,
  },
};
</script>

<style scoped lang="scss">
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-leave-to {
  opacity: 0;
}
.main {
  background-color: #e9effc;
  height: 100vh;
  display: flex;
  align-items: center;
  .tieser {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .descr {
      max-width: 240px;
      text-align: center;
    }
  }
}
</style>
