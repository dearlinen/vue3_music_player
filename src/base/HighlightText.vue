<script setup>

import {computed} from "vue";

const {text, highlight} = defineProps({
  text: {
    type: String,
    required: true
  },
  highlight: {
    type: String,
    required: true
  }
})


const highlightText = computed(() => {
  const reg = new RegExp(highlight, 'gi');
  return text.replace(reg, `<span class="high-light-text">${highlight}</span>`)
})


</script>

<template>
  <div  v-html="highlightText"></div>
</template>

<style lang="scss">
.high-light-text {
  color: $blue;
}
</style>
