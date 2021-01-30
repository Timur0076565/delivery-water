<template>
  <div class="main">
    <Tieser />
    <router-view base="/delivery-water/" class="view"/>
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
