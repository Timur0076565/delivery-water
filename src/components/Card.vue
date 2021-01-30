<template>
  <div class="card-wrapper">
    <input
      class="input-radio-card"
      :id="data.productName"
      type="radio"
      name="card"
      ref="radioCard"
			:checked="checked"
    />
    <label
      class="card-component label"
      :value="id"
      :for="data.productName"
      @click="handleOnCurrentCard(data)"
    >
      <div class="info">
        <div class="subtitle">{{ productName }}</div>
        <div class="quantity">{{ data.quantity }} шт</div>
      </div>
      <div class="cost">{{ data.cost }} ₽</div>
      <img class="icon-card" :src="data.img" />
      <div class="counter" >
        <div class="count" @click="decrease">
          <img src="@/assets/images/icons/minus.svg" alt="Minus" />
        </div>
        <div class="count-sum">{{ sum }}</div>
        <div class="count" @click="increase">
          <img src="@/assets/images/icons/plus.svg" alt="Plus" />
        </div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    id: {
      type: Number,
      default: 0,
		},
		checked: {
			type: String,
			default: "",
		}
  },
  data() {
    return {
      sum: 1,
      activeCard: false,
    };
  },
  computed: {
    productName() {
      return this.data.productName
        .split(" ")
				.filter((word) => word !== "Бутыль" && word !== "Блок" && word !=="по")
				.join(" ")
    },
  },
  methods: {
    handleOnCurrentCard(data) {
			this.sum = 1;
      this.$emit("getValueCurrentCard", data);
    },
    increase() {
      event.stopPropagation();
      this.sum++;
      this.$emit("increase", this.sum);
    },
    decrease() {
      event.stopPropagation();
      this.sum > 1 ? this.sum-- : this.sum;
      this.$emit("decrease", this.sum);
    },
  },
};
</script>

<style scoped lang="scss">
.input-radio-card[type="radio"] {
  display: none;
}
.card-component {
  width: 96px;
  height: 130px;
  background: #fff;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d5dde0;
  }
  .info {
    .subtitle {
      font-weight: 500;
    }
    .quantity {
      font-size: 10px;
      color: #babdc2;
    }
  }
  .cost {
    z-index: 1;
    font-size: 12px;
    color: #fff;
  }
  .icon-card {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .counter {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
		align-items: center;
		display: none;
    .count {
      &:hover {
        opacity: 0.8;
      }
    }
    .count-sum {
      font-size: 12px;
      color: #455273;
      padding: 0 10px 3px;
    }
  }
}
.input-radio-card[type="radio"]:checked + .card-component {
  &::after {
    background: #ffc369;
	}
	.counter {
		display: flex;
	}
}
</style>