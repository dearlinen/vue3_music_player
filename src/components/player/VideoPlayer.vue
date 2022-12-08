<script setup>

import {ref} from "vue";

const videoEl = ref(null)

videoEl.value.addEventListener('timeupdate', (e) => {
  console.log(e.target.currentTime)
})


</script>

<template>
  <div>
    <video ref="videoEl"></video>
  </div>
</template>