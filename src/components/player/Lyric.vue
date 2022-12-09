<script setup>
import {computed, onUpdated, ref, watch, watchEffect} from 'vue'
import {useMusicStore} from "@/store/music/music.js";
import {getSongLyric} from "@/api/public/song.js";
import {message} from "@/base/message.js";
import {storeToRefs} from "pinia";
import {throttleByDate} from "utils/debounce.js";
import {searchLyricOrder} from "utils/publicTools.js";

const musicStore = useMusicStore()
const {currentSong, currentTime} = storeToRefs(musicStore)
const lyric = ref([])
const hasLyric = ref(false)
const lyricMessage = ref('歌词加载中')
const highlightLine = ref('0')

const lyricMod = ref({})
const timeLines = computed(() => {
  return Object.keys(lyric.value).map(e => +e)
})

let scrollWatcher = null

function mergeLyric(lyric) {
  let lyricObj = {}

  if (lyric?.lrc) {
    const rawLyricArr = lyric.lrc.lyric.split('\n')
    if (/纯音乐，请欣赏/.test(lyric.lrc.lyric)) {
      lyricMessage.value = '纯音乐，请欣赏'
      return
    }
    formatLyric(rawLyricArr, 'lrc')
  }

  if (lyric?.tlyric) {
    const transLyricArr = lyric.tlyric.lyric.split('\n')
    formatLyric(transLyricArr, 'tlrc')
  }
  if (lyric?.romalrc) {
    const romaLyricArr = lyric.romalrc.lyric.split('\n')
    formatLyric(romaLyricArr, 'rlrc')
  }

  function formatLyric(lyricArr, key) {
    const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})]/
    lyricArr.forEach(item => {
      const time = item.match(regex)
      if (time) {
        const min = +time[1] * 60 * 1000
        const sec = +time[2] * 1000
        const ms = +time[3]
        const timeTotal = min + sec + ms
        const content = item.replace(regex, '').trim()
        if (lyricObj[timeTotal]) {
          lyricObj[timeTotal][key] = content
        } else {
          lyricObj[timeTotal] = {[key]: content}
        }
      }
    })

    return lyricObj
  }

  return lyricObj
}

async function initLyric() {
  let localLyric = ''

  //获取本地歌词
  if (musicStore.isPlaying) {
    localLyric = musicStore.currentSong?.lyric
    hasLyric.value = true
  } else {
    lyricMessage.value = '暂无播放音乐'
    hasLyric.value = false
    return
  }

  if (localLyric) {
    lyric.value = localLyric
  } else {
    await getLyric(currentSong.value.id)
  }
}

async function getLyric(songID) {
  const [err, res] = await getSongLyric(musicStore.currentSong.id)
  if (err) {
    message.error('获取歌词失败')
    hasLyric.value = false
    lyricMessage.value = '获取歌词失败'
  } else {
    musicStore.setLyric(res)
    lyric.value = mergeLyric(res)
    if (!lyric.value) {
      lyricMessage.value = '暂无歌词'
    } else {
      hasLyric.value = true
    }
  }
}

function scrollToLyric(newTime, oldTime) {

  let date = new Date().getTime()
  // 设置watcher以滚动歌词
  // scrollWatcher = watch(currentTime, (newTime, oldTime) => {
  const offset = Math.abs(new Date().getTime() - date)
  const time = Math.floor(newTime * 1000)
  console.log('offset', offset)
  if (offset >= 0) {
    const index = searchLyricOrder(timeLines.value, time)
    scroll(index)
    date = new Date().getTime()
  } else {
    scroll(time)
    date = new Date().getTime()
  }


  // })

  function scroll(time) {
    if (hasLyric.value) {
      const lyricDom = document.querySelector(`[data-time="${time}"]`)
      if (lyricDom) {
        highlightLine.value = String(time)
        console.log(highlightLine.value)
        lyricDom.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }

    }

  }

}

watch(currentTime, (newTime, oldTime) => {
  console.log(newTime, oldTime)
  scrollToLyric(newTime, oldTime)
})

onUpdated(() => {
  //页面状态改变，清除之前的watcher
  // if (scrollWatcher) {
  //   scrollWatcher()
  // }
  scrollToLyric()
  initLyric()
})


initLyric()

</script>


<template>
  <div class="lyrics-page">


    <div class="lyric-background dynamic-background">
      <div>
        <p>lorem</p>
      </div>
    </div>

    <div class="left-side">
      <div>
        <div class="cover">
          <div class="cover-container">
            <el-image :src="currentSong.albumPic" loading="lazy"/>
            <!--            <div-->
            <!--                class="shadow"-->
            <!--                :style="{ backgroundImage: `url(${imageUrl})` }"-->
            <!--            ></div>-->
          </div>
        </div>
      </div>
    </div>

    <div class="lyric-wrap">
      <transition name="slide-fade">
        <div
            class="lyrics-container"
        >

          <div
              v-if="hasLyric"
              v-for="(val,key) in lyric"
              :key="key"
              class="lyric-item"
              :class="{highlight: highlightLine === key}"
              :data-time="key"
          >

            <div class="content">
              <span>
<!--            {{highlightLine}}-{{key}}-->
                {{ val.lrc }}
              </span>
              <span class="translation">
                {{ val.tlrc }}
              </span>
              <span class="translation">
                {{ val.rlrc }}
              </span>
            </div>
          </div>
          <div v-else>
            <span>{{ lyricMessage }}</span>
          </div>
        </div>
      </transition>


    </div>
  </div>


</template>

<style lang="scss" scoped>
.lyrics-page {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  background: var(--body-bgcolor);
  display: flex;
  clip: rect(auto, auto, auto, auto);
}

.lyrics-background {
  --contrast-lyrics-background: 75%;
  --brightness-lyrics-background: 150%;
}

[data-theme='dark'] .lyrics-background {
  --contrast-lyrics-background: 125%;
  --brightness-lyrics-background: 50%;
}

.lyrics-background {
  filter: blur(50px) contrast(var(--contrast-lyrics-background)) brightness(var(--brightness-lyrics-background));
  position: absolute;
  height: 100vh;
  width: 100vw;

  .top-right,
  .bottom-left {
    z-index: 0;
    width: 140vw;
    height: 140vw;
    opacity: 0.6;
    position: absolute;
    background-size: cover;
  }

  .top-right {
    right: 0;
    top: 0;
    mix-blend-mode: luminosity;
  }

  .bottom-left {
    left: 0;
    bottom: 0;
    animation-direction: reverse;
    animation-delay: 10s;
  }
}

.dynamic-background > div {
  animation: rotate 150s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.gradient-background {
  position: absolute;
  height: 100vh;
  width: 100vw;
}

.left-side {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 32px;
  margin-top: 24px;
  align-items: center;
  transition: all 0.5s;

  z-index: 1;

  .date {
    max-width: 54vh;
    margin: 24px 0;
    color: var(--color-text);
    text-align: center;
    font-size: 4rem;
    font-weight: 600;
    opacity: 0.88;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .controls {
    max-width: 54vh;
    margin-top: 24px;
    color: var(--color-text);

    .title {
      margin-top: 8px;
      font-size: 1.4rem;
      font-weight: 600;
      opacity: 0.88;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .subtitle {
      margin-top: 4px;
      font-size: 1rem;
      opacity: 0.58;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .top-part {
      display: flex;
      justify-content: space-between;

      .top-right {
        display: flex;
        justify-content: space-between;

        .volume-control {
          margin: 0 10px;
          display: flex;
          align-items: center;

          .volume-bar {
            width: 84px;
          }
        }

        .buttons {
          display: flex;
          align-items: center;

          button {
            margin: 0 0 0 4px;
          }

          .svg-icon {
            height: 18px;
            width: 18px;
          }
        }
      }
    }

    .progress-bar {
      margin-top: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .slider {
        width: 100%;
        //flex-grow: grow;
        padding: 0 10px;
      }

      span {
        font-size: 15px;
        opacity: 0.58;
        min-width: 28px;
      }
    }

    .media-controls {
      display: flex;
      justify-content: center;
      margin-top: 18px;
      align-items: center;

      button {
        margin: 0;
      }

      .svg-icon {
        opacity: 0.38;
        height: 14px;
        width: 14px;
      }

      .active .svg-icon {
        opacity: 0.88;
      }

      .middle {
        padding: 0 16px;
        display: flex;
        align-items: center;

        button {
          margin: 0 8px;
        }

        button#play .svg-icon {
          height: 28px;
          width: 28px;
          padding: 2px;
        }

        .svg-icon {
          opacity: 0.88;
          height: 22px;
          width: 22px;
        }
      }
    }
  }
}

.cover {
  position: relative;

  .cover-container {
    position: relative;
  }

  img {
    border-radius: 0.75em;
    width: 54vh;
    height: 54vh;
    user-select: none;
    object-fit: cover;
  }

  .shadow {
    position: absolute;
    top: 12px;
    height: 54vh;
    width: 54vh;
    filter: blur(16px) opacity(0.6);
    transform: scale(0.92, 0.96);
    z-index: -1;
    background-size: cover;
    border-radius: 0.75em;
  }
}

.lyric-wrap {
  flex: 1;
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
  margin-right: 24px;
  z-index: 0;

  .lyrics-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 78px;
    max-width: 460px;
    overflow-y: auto;
    transition: 0.5s;
    scrollbar-width: none; // firefox

    .lyric-item {
      margin: 2px 0;
      padding: 12px 18px;
      transition: 0.5s;
      border-radius: 12px;

      &:hover {
        background: var(--color-secondary-bg-for-transparent);
      }

      .content {
        transform-origin: center left;
        transform: scale(0.95);
        transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);

        span {
          opacity: 0.28;
          cursor: default;
          font-size: 1em;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        span.translation {
          opacity: 0.2;
          font-size: 0.925em;
        }
      }
    }

    .line#line-1:hover {
      background: unset;
    }

    .translation {
      margin-top: 0.1em;
    }

    .highlight div.content {
      transform: scale(1);

      span {
        opacity: 0.98;
        display: inline-block;
      }

      span.translation {
        opacity: 0.65;
      }
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .lyrics-container .line:first-child {
    margin-top: 50vh;
  }

  .lyrics-container .line:last-child {
    margin-bottom: calc(50vh - 128px);
  }
}

.close-button {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 300;
  border-radius: 0.75rem;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.28;
  transition: 0.2s;
  -webkit-app-region: no-drag;

  .svg-icon {
    color: var(--color-text);
    padding-top: 5px;
    height: 22px;
    width: 22px;
  }

  &:hover {
    background: var(--color-secondary-bg-for-transparent);
    opacity: 0.88;
  }
}

.lyrics-page.no-lyric {
  .left-side {
    transition: all 0.5s;
    transform: translateX(27vh);
    margin-right: 0;
  }
}

@media (max-aspect-ratio: 10/9) {
  .left-side {
    display: none;
  }
  .right-side .lyrics-container {
    max-width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .right-side .lyrics-container {
    max-width: 600px;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s;
}

.slide-up-enter, .slide-up-leave-to /* .fade-leave-active below version 2.1.8 */
{
  transform: translateY(100%);
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.2, 0.2, 0, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(27vh);
  opacity: 0;
}
</style>
