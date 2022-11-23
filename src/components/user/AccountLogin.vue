<script setup>
import {ref} from 'vue'
import {useUserStore} from "@/store/user/userStore.js";
import {useRouter} from "vue-router";
import {getToken, getUID} from "utils/cookieController.js";

const userStore = useUserStore()
const router = useRouter()

const token = getToken()
const UID = getUID()

if (token) {
  userStore.setLogType('account')
  router.push('/discovery')

} else if (UID) {
  userStore.setLogType('UID')
  router.push('/discovery')
}


</script>

<template>
  <p>account</p>
  <p>account</p>
  <p>account</p>
  <p>account</p>
</template>