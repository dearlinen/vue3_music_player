<script setup>


import Banner from "@/views/discovery/Banner.vue";
import TopSong from "@/views/discovery/TopSong.vue";
import TopPlaylist from "@/views/discovery/TopPlaylist.vue";
</script>


<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner/>
      <TopSong/>
      <TopPlaylist/>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>