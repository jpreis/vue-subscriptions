<template>
  <div class="subscription-card" :class="{inactive: !subscriptionActive}" @click="toggleActive" :style="backgroundStyle" @mouseenter="hovered = true" @mouseleave="hovered = false">

    <div class="name">
      {{ subscription.name }}
    </div>
    <div class="costs">
      {{ subscription.costs | dollars}}
    </div>

    <div class="controls" :class="{visible: hovered}">
      <ColorPicker :defaultColor="cardBackgroundColor" @color-selected="setCardBackgroundColor"></ColorPicker>
    </div>
  </div>
</template>

<script>
import ColorPicker from "@/components/ColorPicker.vue";
import { dollars } from "@/filter/CurrencyFilter";

export default {
  props: {
    subscription: {
      reqquired: true
    }
  },
  data: function() {
    return {
      cardBackgroundColor: "#445465",
      hovered: false
    };
  },
  filters: {
    dollars
  },
  components: {
    ColorPicker
  },
  methods: {
    setCardBackgroundColor(newColor) {
      this.cardBackgroundColor = newColor;
    },
    toggleActive() {
      this.$emit("toggle-active");
    }
  },
  computed: {
    subscriptionActive() {
      return this.subscription.active;
    },
    backgroundStyle() {
      return {
        "background-color": this.cardBackgroundColor
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.subscription-card {
  transition: all 0.3s;
  padding: 1em 1.5em;
  color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.06);
  position: relative;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }

  &.inactive {
    opacity: 0.6;
    transform: translateY(5px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.075), 0 5px 5px rgba(0, 0, 0, 0.06);
    background: repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1) 10px,
      transparent 10px,
      transparent 20px
    );
  }
}

.name {
  text-transform: uppercase;
  font-size: 1.25rem;
  letter-spacing: 0.08em;
}

.costs {
  margin-top: 6rem;
  text-align: right;
  font-size: 2.5rem;
}

.controls {
  transition: opacity 0.3s;
  position: absolute;
  top: 1em;
  right: 1em;
  opacity: 0;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 5px;
  align-items: center;

  &.visible {
    opacity: 1;
  }
}
</style>