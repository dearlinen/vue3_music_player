<script setup>

import {ref} from "vue";
import {getTopPlaylist} from "@/api/public/playlist.js";
import {message} from "@/base/message.js";
import PlaylistCard from "@/components/discovery/PlaylistCard.vue";

const playlist = ref([])

const getPlaylist = async () => {
  const [err, res] = await getTopPlaylist()
  if (err) {
    message.error('获取排行榜失败')
    return
  }
  playlist.value = res.playlists.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.coverImgUrl,
      playCount: item.playCount,
      trackCount: item.trackCount,
      creator: item.creator.nickname,
      creatorID: item.creator.userId,
      createTime: item.createTime,
      desc: item.description,
      tags:item.tags.join('/')
    }
  })
}

getPlaylist()
</script>


<template>
  <div class="recommend">
    <h1>推荐歌单</h1>
    <div class="list-wrap">

      <PlaylistCard
          v-for="item in playlist"
          :key="item.id"
          :name="item.name"
          :picUrl="item.picUrl"
          :playCount="item.playCount"
          :trackCount="item.trackCount"
          :creator="item.creator"
          :title="item.desc"
      />
    </div>
  </div>

</template>


<style lang="scss" scoped>
.recommend {
  h1 {
    font-size: $font-size-title-lg;
    margin-bottom: 8px;
  }
}

.list-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;
}
</style>