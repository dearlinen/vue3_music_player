<script setup>

import Layout from "@/views/Layout.vue";
import {anonymousReg} from "@/api/user/login.js";
import {extractResponse} from "utils/requestTools.js";
import {getCookie, setCookies} from "utils/cookieController.js";
import {hasCookieCache} from "utils/stroageController.js";
import {useUserStore} from "@/store/user/userStore.js";

const userStore = useUserStore()

async function initCookieCache() {
  const local = hasCookieCache();
  if (local){
    return;
  }else {
    const cookies = extractResponse(await anonymousReg(), '获取临时身份错误')
    console.log('app cookie', cookies)
    if (cookies) {
      setCookies(cookies.cookie)
    }
  }

}

initCookieCache()

</script>


<template>
  <div id="container">
    <Layout></Layout>
  </div>
</template>

<style lang="scss">
body {
  height: 100%;
  background-color: var(--body-bgcolor) !important;
  font-size: $font-size;
}
</style>