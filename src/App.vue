<script setup>

import Layout from "@/views/layout/Layout.vue";
import {anonymousReg} from "@/api/user/login.js";
import {extractResponse} from "utils/requestTools.js";
import {setCookies} from "utils/cookieController.js";

async function initAnonymousCookie() {
  const cookies = extractResponse(await anonymousReg(), '获取临时身份错误')
  console.log('app cookie', cookies)
  if (cookies) {
    setCookies(cookies.cookie)
  }
}

initAnonymousCookie()

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