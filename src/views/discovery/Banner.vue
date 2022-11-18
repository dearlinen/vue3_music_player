<script setup>
import {onMounted, ref} from "vue";
import {getBanner} from "@/api/public/push.js";
import {message} from "@/base/message.js";

const bannerList = ref([])


onMounted(
    async () => {
      const [err, res] = await getBanner();
      if (err) {
        return message.error('获取banner失败')
      }
      bannerList.value = res.banners;
    }
)

const handleBannerClick = (item) => {
  const {targetId, targetType, url} = item;

  switch (targetType) {
    case 3000:
      window.open(url)
      break;
    case 1000:
      // 打开歌单
      break;
    case 1004:
      // 打开MV
      break;
    case 10:
      // 打开专辑
      break;
  }
}

</script>


<template>
  <el-carousel :interval="4000" type="card" class="banner-carousel">
    <el-carousel-item v-for="(banner,index) in bannerList" :key="index">
      <el-image
          class="banner-img"
          :src="banner.imageUrl"
          @click="handleBannerClick(banner)"
      />
    </el-carousel-item>
  </el-carousel>
</template>


<style lang="scss" scoped>


.banner-carousel {

  :deep(.el-carousel__container) {
    height: 200px;
  }

  .banner-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
  }

}
</style>
