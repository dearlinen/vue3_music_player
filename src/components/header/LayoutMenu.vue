<script setup>


import {useUserStore} from "@/store/user/userStore.js";
import {storeToRefs} from "pinia";
import BaseIcon from "@/base/BaseIcon.vue";

const userStore = useUserStore()

const {isLogin} = storeToRefs(userStore)
const defaultMenu = {
  name: '发现音乐',
  icon: 'music',
  path: '/discovery',
  children: [
    {
      name: '推荐',
      path: '/discovery/recommend',
      icon: 'recommend'
    },
    {
      name: '排行榜',
      path: '/discovery/toplist',
      icon: 'toplist'
    },
    {
      name: '歌单',
      path: '/discovery/playlist',
      icon: 'playlist'
    },
    {
      name: '主播电台',
      path: '/discovery/djradio',
      icon: 'djradio'
    },
    {
      name: '歌手',
      path: '/discovery/artist',
      icon: 'artist'
    },
    {
      name: '新碟上架',
      path: '/discovery/album',
      icon: 'album'
    }
  ]
}
</script>


<template>
  <div class="menu">
    <!--    <user />-->
    <div class="menu-wrap">
      <div
          class="menu-block"

      >
        <ul class="menu-list">
          <router-link
              :key="index"
              :to="item.path"
              active-class="menu-item-active"
              v-for="(item, index) in defaultMenu.children"
          >
            <li class="menu-item">
<!--              <BaseIcon :size="16" :type="item.icon" class="iconfont" />-->
              <span class="menu-title">{{ item.name }}</span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bgcolor);
  //border-right: 3px var(--menu-bgcolor) solid;

  .menu-wrap {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    .menu-block {
      margin-bottom: 16px;

      .menu-block-title {
        font-size: $font-size-sm;
        color: var(--font-color-grey2);
        padding-left: 16px;
        margin-bottom: 8px;
      }

      .menu-list {
        .menu-item {
          @include text-ellipsis;
          padding: 12px 18px;
          cursor: pointer;

          &:hover {
            background: var(--menu-item-hover-bg);
          }

          &-active {
            color: $theme-color;
            background: var(--menu-item-active-bg);

            i {
              color: $theme-color;
            }
          }

          .iconfont {
            font-size: $font-size-medium-sm;
          }

          .menu-title {
            font-size: $font-size-medium-sm;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
