<script setup>
import LayoutHeader from "@/views/layout/LayoutHeader.vue";
import AudioPlayer from "@/components/player/AudioPlayer.vue";


</script>


<template>
  <div class="layout">
    <LayoutHeader/>
    <div class="layout-body">
      <div class="layout-menu" v-show="false">

      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
    <AudioPlayer/>
  </div>
</template>


<style lang="scss" scoped>
.layout {
  height: 100%;

  .layout-body {
    display: flex;
    height: calc(100% - #{$header-height});

    .layout-menu {
      // 这个100%已经减去了头部height
      height: calc(100% - #{$mini-player-height});
    }

    .content {
      flex: 1;
      overflow-y: auto;
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;

      .router-view-center {
        max-width: $center-content-max-width;
        margin: auto;
      }
    }
  }
}
</style>
