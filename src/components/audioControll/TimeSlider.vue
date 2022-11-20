<script setup>


import {useMusicStore} from "@/store/music/music.js";
import {storeToRefs} from "pinia";
import {formatCurrentTime, formatDuration} from "utils/publicTools";
import {computed, watch} from "vue";

const musicStore = useMusicStore()

const {isPlaying, currentTime, currentSong} = storeToRefs(musicStore)

const emit = defineEmits(['timeChange', 'timeInput'])


const duration = computed(() => {
  // test
  return Math.floor(currentSong.value.rawDuration / 1000)||500
})

const playedTime = computed(() => {
  return Math.floor(currentTime.value)
})

const disabled = computed(() => {
  return !isPlaying.value
})
</script>


<template>
  <el-slider
      :disabled="false"
      @input="emit('timeInput',$event)"
      @change="emit('timeChange',$event)"
      :model-value="playedTime"
      :format-tooltip="formatCurrentTime"
      :max="duration"
  />

</template>