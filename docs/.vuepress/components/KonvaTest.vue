<template lang="pug">
  v-stage.test(:config="configKonva" ref="stage")
    v-layer
      v-circle(:config="configCircle")
</template>

<script>
export default {
  data() {
    return {
      configKonva: {
        width: 200,
        height: 200,
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: 'magenta',
        stroke: 'red',
        strokeWidth: 4,
      },
    };
  },
};
</script>

<style scoped>
.test {
  margin: 0 auto;
  border: 1px solid black;
}
</style>
