<template>
  <div class="completed-order-view">
    <h1 class="title">Заказ оформлен</h1>
    <div class="check-list">
      <div class="item">
        <p class="label">{{ order.product }}</p>
        <div class="value">{{ order.quantity }} шт</div>
      </div>
      <div class="item">
        <p class="label">{{ order.date }}</p>
        <div class="value">{{ order.time }}</div>
      </div>
      <div class="item">
        <p class="label">Адрес доставки</p>
        <div class="value">{{ order.adress }}</div>
      </div>
      <div class="item">
        <p class="label">Телефон</p>
        <div class="value">{{ order.phone }}</div>
      </div>
    </div>
    <TotalPrice :total="order.price" />
    <p class="inform">
      Ваш заказ <span class="order-id">№{{ order.orderId }}</span> успешно
      оформлен. В ближайшее время по указанному телефону с Вами свяжется наш
      менеджер.
    </p>
    <Button @click="handleForDoNewOrder">Новый заказ</Button>
  </div>
</template>

<script>
import TotalPrice from "@/components/TotalPrice.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    TotalPrice,
    Button,
  },
  computed: {
    order() {
      return this.$store.state.order;
    },
  },
  methods: {
    handleForDoNewOrder() {
      this.$router.push({ name: "createOrder" });
    },
  },
};
</script>

<style scoped lang="scss">
.completed-order-view {
  background: #f5f8ff;
  border-radius: 6px;
  width: 816px;
  padding: 40px;
  margin-right: 10px;
  min-width: 746px;
  @media only screen and (max-width: 980px) {
    padding: 30px 20px 60px;
    width: 100%;
    min-width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title {
    position: relative;
    padding-left: 40px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: #ffc369 url("../assets/images/icons/completed.svg") no-repeat
        center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .check-list {
    background: #fff;
    border-radius: 8px;
    padding: 5px 20px;
    @media only screen and (max-width: 980px) {
      box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px dashed #d5dde0;
      padding: 15px 0;
      flex-wrap: wrap;
      &:last-child {
        border-bottom: none;
      }
      .label {
        font-weight: 500;
      }
      .value {
        font-weight: 500;
        font-size: 12px;
        color: #babdc2;
      }
    }
  }
  .inform {
    color: #818fb3;
    padding: 30px 0;
    @media only screen and (max-width: 980px) {
      text-align: center;
    }
    .order-id {
      color: #418de8;
    }
  }
}
</style>