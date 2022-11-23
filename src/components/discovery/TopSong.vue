<script setup>
import {ref} from "vue";
import {message} from "@/base/message.js";
import {getTopSong} from "@/api/public/song.js";
import SongCard from "@/components/discovery/SongCard.vue";

const topSongs = ref([])


const getTopSongList = async () => {
  const [err, res] = await getTopSong()
  if (err) {
    message.error('获取排行榜失败')
    return
  }
  topSongs.value = res.data.map(item => {
    return {
      id: item.id,
      name: item.name,
      artist: item.artists.map(item=>item.name).join('/'),
      album: item.album.name,
      albumID: item.album.id,
      duration: item.duration,
      mv: item.mvid,
      picUrl: item.album.picUrl
    }
  })

  topSongs.value = topSongs.value.slice(0,20)
}

const handleSongClick = (song) => {
  console.log(song)
}

getTopSongList()
</script>


<template>

  <div class="new-songs">
    <h1>最新音乐</h1>
    <div class="top-song-wrap">
      <SongCard
          @click="handleSongClick(item)"
          v-for="item in topSongs"
          :key="item.id"
          class="song-card"
          :name="item.name"
          :img="item.picUrl"
          :artist="item.artist"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped>

.top-song-wrap{
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  //grid-template-rows: 33.33% 33.33% 33.33%;
}

h1 {
  font-size: $font-size-title-lg;
}
</style>