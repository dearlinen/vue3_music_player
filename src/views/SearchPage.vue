<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

const {params} = router.currentRoute.value

const {keyword} = params


const tbs = [
  {
    title: "歌曲",
    key: "song",
    to: "song"
  },
  {
    title: "歌单",
    key: "playlist",
    to: "playlist"
  },
  {
    title: "MV",
    key: "mv",
    to: "mv"
  }
]

</script>


<template>
  <div class="search-detail">
    <div class="tabs-wrap">
      <router-link
          v-for="tb in tbs"
          :key="tb.key"
          :to="tb.to">
        {{ tb.title }}
      </router-link>
      <div class="search-body">
        <router-view />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.search-detail {
  .tabs-wrap {
    padding: 0 28px;
    border-bottom: 1px solid var(--border);

    :deep(.search-tab-item) {
      font-size: $font-size;
    }
  }
}
</style>
