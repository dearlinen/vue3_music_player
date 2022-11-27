<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()

const {params} = router.currentRoute.value

const activeTab = ref('song')

const handleClick = e=>{
  console.log(e.props.name)
  router.push({name:e.props.name,params})
}

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
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane
              v-for="tb in tbs"
              :key="tb.key"
              :label="tb.title"
              :name="tb.key"
              name="first"></el-tab-pane>
        </el-tabs>

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
