<script setup>
import Search from "@/components/header/Search.vue";
import Theme from "@/components/header/Theme.vue";
import RouterHistory from "@/components/header/RouterHistory.vue";
import {useRouter} from "vue-router";
import BaseIcon from "@/base/BaseIcon.vue";

import {ref} from 'vue'
import {exitFullscreen, isFullscreen, setWindowFullScreen} from "utils/styleTools.js";

const router = useRouter()
const isPlayerShow = ref(false)

const onClickLogo = () => {
  router.push({name: 'Home'})
}

const onClickDown = () => {
  console.log('onClickDown')
}
const handleExitFullscreen = () => {
  if (isFullscreen()) {
    exitFullscreen();
  }
}

const handleFullscreen = () => {
  if (isFullscreen()) {
    exitFullscreen()
  } else {
    setWindowFullScreen()
  }
}


</script>


<template>
  <div class="header">
    <div class="left">

      <div class="buttons">
        <div
            @click="onClickLogo"
            class="mac-button red"
        >
          <BaseIcon
              :size="9"
              type="play"/>
        </div>
        <div
            @click="handleExitFullscreen"
            class="mac-button yellow"
        >
          <BaseIcon
              :size="9"
              type="play"/>
        </div>
        <div
            @click="handleFullscreen"
            class="mac-button green"
        >
          <BaseIcon
              :size="9"
              type="play"/>
        </div>
      </div>

      <div
          @click="onClickDown"
          class="shrink-player"
          v-if="isPlayerShow"
      >
        <BaseIcon
            :size="9"
            type="arrow-right"/>
      </div>


<!--      <RouterHistory/>-->
    </div>
    <div class="right">
      <div class="search-wrap">
        <Search/>
      </div>
      <theme/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/element-overwrite.scss";

.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;

  @include el-input-theme(
          var(--header-input-color),
          var(--header-input-bgcolor),
          var(--header-input-placeholder-color)
  );

  :deep(.iconfont) {
    color: var(--header-font-color);
  }

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    .font-weight {
      white-space: nowrap;
    }

    .buttons {
      display: flex;

      &:hover {
        .mac-button > i {
          opacity: 1;
        }
      }

      .mac-button {
        @include round(12px);
        @include flex-center;
        margin-right: 8px;
        cursor: pointer;

        &.red {
          background: #ed655a;
        }

        &.green {
          background: #72be47;
        }

        &.yellow {
          background: #e0c04c;
        }

        i {
          opacity: 0;
          transition: opacity 0.3s;
          color: $black;
          font-weight: $font-weight-bold;
          transform-origin: center center;
        }
      }
    }

    .shrink-player {
      position: relative;
      top: -6px;
      margin-left: 16px;
    }

    .history {
      margin-left: 65px;
    }

    .actions {
      margin-left: 70px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>
