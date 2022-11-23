<script setup>

import {useUserStore} from "@/store/user/userStore.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore()

const {userPlaylist} = storeToRefs(userStore)
</script>

<template>
  <h1>用户鸽蛋</h1>
  <div v-for="playlist in userPlaylist">
    <p>{{playlist.name}}</p>
  </div>

</template>