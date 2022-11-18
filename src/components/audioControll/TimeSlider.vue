<script setup>


import {useMusicStore} from "@/store/music/music.js";
import {storeToRefs} from "pinia";

const musicStore = useMusicStore()

const {isPlaying,currentTime,currentSong} = storeToRefs(musicStore)

const emit = defineEmits(['timeChange','timeInput'])

const formatTime = (time,duration) => {
  const minute = Math.floor(time / 60)
  const second = Math.floor(time % 60)
  return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
}
const handleTimeChange = (e) => {
  musicStore.setCurrentTime(e)
}
</script>


<template>
  <el-slider
    @change="emit('timeChange',$event)"
    @input="emit('timeInput',$event)"
    :disabled="isPlaying"
    v-model="currentTime"
    :max="800"
    />

</template>