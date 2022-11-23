<script setup>


import Banner from "@/components/discovery/Banner.vue";
import TopSong from "@/components/discovery/TopSong.vue";
import TopPlaylist from "@/components/discovery/TopPlaylist.vue";
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