<script setup>
import {useRouter} from "vue-router";
import BaseIcon from "@/base/BaseIcon.vue";

const router = useRouter()

const goBack = () => router.back()
const forward = () => router.forward()

</script>


<template>
  <div class="routes-history">
    <base-icon
        backdrop={true}
        type="back"
        @click="goBack"
    />
    <base-icon
        backdrop={true}
        type="forward"
        @click="forward"
    />
  </div>
</template>