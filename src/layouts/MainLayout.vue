<template>
  <div class="main">
    <Tieser />
    <!-- <transition name="fade"> -->
      <router-view class="view"/>
    <!-- </transition> -->
  </div>
</template>

<script>
import Tieser from '../components/Tieser.vue';

export default {
  components: {
    Tieser,
  },
};
</script>

<style scoped lang="scss">
// .fade-enter {
//   opacity: 0;
// }
// .fade-enter-active {
//   transition: opacity 0.2s;
// }
// .fade-leave-active {
//   transition: opacity 0.2s;
// }
// .fade-leave-to {
//   opacity: 0;
// }
.main {
  background-color: #e9effc;
  height: 100vh;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 980px) {
    background: #F5F8FF;
    align-items: flex-start;
  }
}
</style>
