<script setup>
import {ref, watch} from "vue";
import {getVolume} from "utils/stroageController.js";

import {useMusicStore} from '@/store/music/music.js'
import BaseIcon from '@/base/BaseIcon.vue'
import VolumeSlider from "@/components/audioControll/VolumeSlider.vue";
import TimeSlider from "@/components/audioControll/TimeSlider.vue";
import {storeToRefs} from "pinia";

const musicStore = useMusicStore()

const audioEl = ref(null);
const volume = ref(getVolume() || 1)
const songReady = ref(false)
const audioSrc = ref('')
const hasCurrentSong = ref(false)
const playerSHow = ref(false)

const playing = ref(false)

const togglePlayerShow = () => {
  playerSHow.value = !playerSHow.value
}


const {currentSong, playlist,currentTime} = storeToRefs(musicStore)

watch(
    () => [currentSong.value,currentTime.value],
    ([song],[time]) => {
      // console.log('watch currentSong', newVal, oldVal)
      // if (newVal['url']) {
      //   console.log('url', newVal.url)
      //   audioEl.value.src = newVal.url
      //   audioEl.value.play()
      //   playing.value = true
      // }
      // audioEl.value.currentTime = time
      // console.info(time)
    }
)


// audio element event
const handleEnded = () => {
      // musicStore.setPlayingState(false)
      // musicStore.setPlayMode(playModeMap.sequence)
      // musicStore.setPlayList([])
      // musicStore.setCurrentIndex(-1)
      // musicStore.setCurrentSong({})
    },
    handleTimeUpdate = (e) => {
      currentTime.value = e.target.currentTime
    },
    handleCanPlay = () => {
      songReady.value = true
    }

// time slider event

const handleVolumeChange = (newVolume) => {
  audioEl.value.volume = newVolume
}

const handleTimeChange = (newTime) => {
  audioEl.value.currentTime = newTime
}


// control button event
const handlePlay = () => {
  audioEl.value.play()
}

const handlePlaylistClick = () => {
  console.log('playlist')
}
</script>


<template>

  <div class="audio-player">

    <div class="song">
      <!--   专辑图片-->
      <!--          <template>-->
      <!--            <div @click="togglePlayerShow" class="img-wrap">-->
      <!--              <div class="mask"></div>-->
      <!--              <el-image lazy :src="musicStore.currentSong.picUrl"/>-->
      <!--              <div class="player-control">-->
      <!--                &lt;!&ndash;          <Icon :size="24" :type="playControlIcon" color="white"/>&ndash;&gt;-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <div class="content">-->
      <!--              <div class="top">-->
      <!--                <p class="name">{{ currentSong.name }}</p>-->
      <!--                <p class="split">-</p>-->
      <!--                <p class="artists">{{ currentSong.artistsText }}</p>-->
      <!--              </div>-->
      <!--              <div class="time">-->
      <!--                <span class="played-time">{{-->
      <!--                    $utils.formatTime(currentTime)-->
      <!--                  }}</span>-->
      <!--                <span class="split">/</span>-->
      <!--                <span class="total-time">{{-->
      <!--                    $utils.formatTime(currentSong.duration / 1000)-->
      <!--                  }}</span>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </template>-->
      <!--     专辑图片结束-->

    </div>
    <!--     控制台-->
    <div class="control">
      <BaseIcon type="arrow-back" :size="24" class="icon"/>
      <div @click="handlePlay" class="play-icon" slot="reference">
        <BaseIcon type="play" :size="24" />
      </div>
      <BaseIcon type="arrow-forward" :size="24" class="icon"/>
    </div>
    <!--     控制台结束-->

    <!--    模式切换和歌单-->
    <div class="mode">
      <!-- 模式 -->
            <el-popover placement="top" trigger="hover" width="160">
              <p>{{ playModeText }}</p>

            </el-popover>      <BaseIcon :size="20" @btnClick="handlePlaylistClick" type="playlist" class="mode-item"/>
              <BaseIcon type="play" :size="20" class="mode-item"/>

      <!-- 播放列表 -->
      <BaseIcon :size="20" @btnClick="handlePlaylistClick" type="playlist" class="mode-item"/>
      <!-- 音量 -->
      <div class="volume-item">
        <VolumeSlider @volume-change="handleVolumeChange"/>
      </div>
      <!-- github -->
      <BaseIcon :size="20" type="github" class="mode-item" @btnClick="goGithub"/>
    </div>
    <!--    模式和歌单结束-->
    <!--     进度条-->
    <div class="progress-bar-wrap">
      <TimeSlider @time-input="handleTimeInput" @time-change="handleTimeChange"/>
    </div>
    <!--     进度条结束-->
    <audio
        @canplay="handleCanPlay"
        @ended="handleEnded"
        @timeupdate="handleTimeUpdate"
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
