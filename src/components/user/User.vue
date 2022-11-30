<script setup>

import {useUserStore} from "@/store/user/userStore.js";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {computed} from "vue";

const userStore = useUserStore()
const router = useRouter()
const {params} = router.currentRoute.value

userStore.setPlaylist(params.uid)
userStore.setUserProfile(params.uid)
const {playlist,userProfile} = storeToRefs(userStore)


const hasPlaylist = computed(
    () => {
      return playlist.value.length > 0
    }
)
</script>

<template>
  <div>
    <el-avatar
        :src="userProfile.profile.avatarUrl"
        :size="128"
    />
  </div>

  <template v-if="hasPlaylist">
    <div v-for="playlist in playlist">
      <p>{{ playlist.name }}</p>
    </div>
  </template>

  <template v-else>
    <p class="empty">暂无公开歌单</p>
  </template>

</template>

<style lang="scss" scoped>
.empty {
  @include flex-center();
  color: var(--font-color-grey);
  font-size: $font-size;
  height: 100px;
}
</style>