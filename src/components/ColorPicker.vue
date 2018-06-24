<template>
  <div class="color-picker">
    <input type="color" v-model="selectedColor" @click.stop>
  </div>
</template>

<script>
export default {
  props: {
    defaultColor: {}
  },
  updated() {
    this.$emit("color-selected", this.selectedColor);
  },
  data: function() {
    return {
      selectedColor: this.defaultColor
    };
  }
};
</script>

<style lang="scss" scoped>
input {
  transition: transform 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
}

input[type="color"] {
  -webkit-appearance: none;
  border: none;
  background: transparent;
  width: 25px;
  height: 25px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

input:focus {
  outline: none;
}
</style>