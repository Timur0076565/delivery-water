<template>
  <div class="card-component" :value="id" :class="{'active-card': activeCard.includes(id)}" @click="handleOnCurrentCard(id)">
    <div class="info">
      <div class="subtitle">{{ data.liters }} л</div>
      <div class="quantity">{{ data.quantity }} шт</div>
    </div>
    <div class="cost">{{ data.cost }} ₽</div>
    <img class="icon-card" :src="data.img" />
		<div class="counter" v-show="activeCard.includes(id)">
			<div class="count" @click="decrease">
				<img src="@/assets/images/icons/minus.svg" alt="Minus">
			</div>
			<div class="count-sum">{{sum}}</div>
			<div class="count" @click="increase">
				<img src="@/assets/images/icons/plus.svg" alt="Plus">
			</div>
		</div>
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
			default: 0
		}
	},
	data() {
		return {
			sum: 0,
			activeCard: [],
		}
	},
	methods: {
		handleOnCurrentCard(index) {
			const id = this.activeCard.indexOf(index)
			id >= 0 ? this.activeCard.splice(id, 1) : this.activeCard.push(index);
		},
		increase() {
			event.stopPropagation()
			this.sum++
		},
		decrease() {
			event.stopPropagation()
			this.sum > 0 ? this.sum-- : this.sum
		}
	}
};
</script>

<style scoped lang="scss">
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
		content: '';
		position: absolute;
		top: 10px;
		right: 10px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #D5DDE0;
	}
  .info {
    .subtitle {
      font-weight: 500;
		}
		.quantity {
			font-size: 10px;
			color: #BABDC2;
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
		.count {
			&:hover {
				opacity: .8;
			}
		}
		.count-sum {
			font-size: 12px;
			color: #455273;
			padding: 0 10px 3px;
		}
	}
}
.active-card {
	&::after {
		background: #FFC369;
	}
}
</style>