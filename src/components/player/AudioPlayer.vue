<script setup>
import {computed, nextTick, ref, watch} from "vue";
import {getVolume} from "utils/stroageController.js";

import {useMusicStore} from '@/store/music/music.js'
import BaseIcon from '@/base/BaseIcon.vue'
import VolumeSlider from "@/components/player/audioControll/VolumeSlider.vue";
import TimeSlider from "@/components/player/audioControll/TimeSlider.vue";
import {formatPlayedTime} from '@/utils/publicTools.js';

import {storeToRefs} from "pinia";
import {throttle} from "utils/debounce.js";

const musicStore = useMusicStore()

const audioEl = ref(null);
const volume = ref(getVolume() || 1)
const songReady = ref(false)

const playerSHow = ref(false)
const playedTime = ref(0)
const isAlbumShow = ref(false)


const {currentSong, playlist, currentTime, playMode, isPlaying} = storeToRefs(musicStore)


// audio元素事件
const handleEnded = () => {
  handleNextClick()
}

const handleCanPlay = () => {
  songReady.value = true
}

const handleTimeUpdate = (e) => {
  throttle(() => {
    musicStore.setCurrentTime(e.target.currentTime)
    playedTime.value = e.target.currentTime
  }, 1000)()
}


//控制事件
const handleMainBtnClick = () => {
  if (isPlaying.value) {
    musicStore.setIsPlaying(false)
  } else {
    audioPlay(currentSong.value.url)
  }
}


const handlePlaylistClick = () => {
  console.log('playlist')
}

const handleNextClick = () => {
  if (playMode.value === 'single') {
    audioEl.value.currentTime = 0
    audioEl.value.play()
  } else {
    musicStore.playNext()
  }
}

const handlePrevClick = () => {
  if (playMode.value === 'single') {
    audioEl.value.currentTime = 0
    audioEl.value.play()
  } else {
    musicStore.playPrev()
  }
}


//滑块事件
const handleTimeInput = (newTime) => {
  audioEl.value.currentTime = newTime
}

const handleVolumeChange = (newVolume) => {
  audioEl.value.volume = newVolume
}


//侦听
watch(currentSong, async (newSong) => {
  if (newSong) {
    handleMediaSession(newSong)
    musicStore.setCurrentTime(0)
    await nextTick()
    await audioPlay(newSong.url)
  }
})

const playedText = computed(() => {
  return formatPlayedTime(currentTime.value)
})


watch(isPlaying, async (newPlaying) => {
  await nextTick()
  if (newPlaying) {
    await audioPlay(newPlaying)
  } else {
    audioPause()
  }
})


// mediaSession

const handleMediaSession = (currentSong) => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentSong.name,
      artist: currentSong.artist,
      album: currentSong.album,
      artwork: [
        {src: currentSong.albumPic, sizes: '96x96', type: 'image/png'},
        {src: currentSong.albumPic, sizes: '128x128', type: 'image/png'},
        {src: currentSong.albumPic, sizes: '192x192', type: 'image/png'},
        {src: currentSong.albumPic, sizes: '256x256', type: 'image/png'},
        {src: currentSong.albumPic, sizes: '384x384', type: 'image/png'},
        {src: currentSong.albumPic, sizes: '512x512', type: 'image/png'},
      ]
    })

    navigator.mediaSession.setActionHandler('play', () => {
      musicStore.setIsPlaying(true)
    })

    navigator.mediaSession.setActionHandler('pause', () => {
      musicStore.setIsPlaying(false)
    })

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      handlePrevClick()
    })

    navigator.mediaSession.setActionHandler('nexttrack', () => {
      handleNextClick()
    })

    navigator.mediaSession.setActionHandler('seekbackward', () => {
      audioEl.value.currentTime -= 10
    })

    navigator.mediaSession.setActionHandler('seekforward', () => {
      audioEl.value.currentTime += 10
    })
  }
}

// control button event

const audioPlay = async (src) => {
  audioEl.value.src = currentSong.value.url
  if (songReady.value) {
    try {
      await audioEl.value.play()
    }catch (e) {
      await audioEl.value.play()
    }
  }

}
const audioPause = () => {
  musicStore.setIsPlaying(false)
  audioEl.value.pause()
}


const toggleAlbumShow = () => {
  isAlbumShow.value = !isAlbumShow.value
}
</script>


<template>

  <div class="audio-player">

    <div class="song">

      <div @click="toggleAlbumShow" class="img-wrap">
        <div class="mask"></div>
        <el-image lazy :src="currentSong.albumPic"/>
        <div class="player-control">
          <!--          <Icon :size="24" :type="playControlIcon" color="white"/>-->
          <BaseIcon type="arrow-down" :size="24" color="white"/>
        </div>
      </div>
      <div class="content">
        <div class="top">
          <p class="name">{{ currentSong.name }}</p>
          <p class="split">-</p>
          <p class="artists">{{ currentSong.artist }}</p>
        </div>
        <div class="time">
                      <span class="played-time">{{
                          playedText
                        }}</span>
          <span class="split">/</span>
          <span class="total-time">{{
              currentSong.duration
            }}</span>
        </div>
      </div>

    </div>
    <!--     控制台-->
    <div class="control">
      <BaseIcon type="arrow-back" :size="24" class="icon" @click="handlePrevClick"/>
      <div @click="handleMainBtnClick" class="play-icon" slot="reference">
        <BaseIcon type="pause" :size="24" v-if="isPlaying"/>
        <BaseIcon type="play" :size="24" v-else/>
      </div>
      <BaseIcon type="arrow-forward" :size="24" class="icon" @click="handleNextClick"/>
    </div>
    <!--     控制台结束-->

    <!--    模式切换和歌单-->
    <div class="mode">
      <!-- 模式 -->
      <el-popover placement="top" trigger="click" width="160">
        <p>模式</p>

        <template #reference>
          <BaseIcon :size="20" @btnClick="handlePlaylistClick" type="shuffle" class="mode-item"/>
        </template>
      </el-popover>

      <!-- 播放列表 -->
      <BaseIcon :size="20" @btnClick="handlePlaylistClick" type="playlist" class="mode-item"/>
      <!-- 音量 -->
      <div class="volume-item">
        <VolumeSlider @volume-change="handleVolumeChange"/>
      </div>
    </div>
    <!--    模式和歌单结束-->
    <!--     进度条-->
    <div class="progress-bar-wrap">
      <TimeSlider :plyedTime="playedTime" @time-input="handleTimeInput"/>
    </div>
    <!--     进度条结束-->
    <audio
        @canplay="handleCanPlay"
        @ended="handleEnded"
        @timeupdate="handleTimeUpdate"
        :src="currentSong.url"
        ref="audioEl"
    ></audio>
  </div>
</template>

<style lang="scss" scoped>
.audio-player {
  position: fixed;
  z-index: $mini-player-z-index;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  padding: 8px 16px;
  padding-right: 24px;
  background: var(--body-bgcolor);

  .song {
    display: flex;
    flex: 4;
    overflow: hidden;

    .img-wrap {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      @include img-wrap(40px);

      img {
        &.blur {
          filter: blur(2px);
        }
      }

      .player-control {
        @include abs-center;
      }

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: var(--font-color-white);
          @include text-ellipsis;
        }

        .split {
          font-size: $font-size-xs;
          margin: 0 4px;
        }

        .artists {
          font-size: $font-size-xs;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: $font-size-xs;
        color: var(--font-color-grey);

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;

      i {
        color: #fff;
      }

      .icon-play {
        transform: translateX(1px);
      }
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }

    .volume-item {
      margin-right: 22px;
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}

.icon {
  color: var(--font-color);
  cursor: pointer;
}
</style>
