<script setup>

import {computed, ref} from 'vue'

import {useMusicStore} from '@/store/music/music.js'
import BaseIcon from '@/base/BaseIcon.vue'

const musicStore = useMusicStore()

const {} = musicStore
const volume = ref(1)
const icon = ref('volume-high')

const emit = defineEmits(['volumeChange'])


const handleSilence = () => {
  if (volume.value === 0) {
    return
  } else {
    icon.value='volume-off'
    volume.value = 0
  }
  emit('volumeChange', volume.value)
}

const formatTooltip = () => {
  return Math.floor(volume.value * 100) + '%'
}
</script>


<template>
  <div class="volume">
    <BaseIcon
        v-if="volume ===0"
        class="volume-icon"
        type="volume-off"
        :size="20"
        @btn-click="handleSilence"
    />
    <BaseIcon
        v-else-if="volume > 0 && volume < 0.5"
        class="volume-icon"
        type="volume-low"
        :size="20"
        @btn-click="handleSilence"
    /><BaseIcon
        v-else
        class="volume-icon"
        type="volume-high"
        :size="20"
        @btn-click="handleSilence"
    />
    <div class="volume-wrap">
      <el-slider
          v-model="volume"
          :max="1"
          :step="0.01"
          :format-tooltip="formatTooltip"
          @input="emit('volumeChange', volume)"
      />
    </div>
  </div>

</template>


<style lang="scss" scoped>
.volume {
  display: flex;
  align-items: center;
  width: 150px;

  .volume-icon {
    color: var(--font-color);
    cursor: pointer;
    margin-right: 8px;
  }

  .volume-wrap {
    flex: 1;
  }
}
</style>