<script setup>

const {name, img, artist} = defineProps({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
})
</script>


<template>
  <div class="song-card">
    <div class="img-wrap">
      <el-image lazy :src="img"/>
    </div>
    <div class="song-content">
      <p class="song-name">{{ name }}</p>
      <p class="singer">{{ artist }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.song-card {
  display: flex;
  padding: 8px;
  font-size: $font-size-sm;
  cursor: pointer;

  div {
    flex-shrink: 0;
  }

  &:hover {
    background: var(--light-bgcolor);
  }

  .order-wrap {
    @include flex-center();
    width: 30px;
    margin-right: 8px;
  }

  .img-wrap {
    position: relative;
    width: 120px;
    height: 120px;
    margin-right: 8px;

    img {
      width: 100%;
      height: 100%;
    }

    .play-icon {
      @include abs-center;
    }
  }

  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    overflow: hidden;

    .song-name {
      @include text-ellipsis;
      color: var(--font-color-white);
    }

    .singer {
      @include text-ellipsis;
    }
  }
}
</style>
