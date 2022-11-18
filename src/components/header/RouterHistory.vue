<script setup>
import {useRouter} from "vue-router";
import BaseIcon from "@/base/BaseIcon.vue";

const router = useRouter()

const goBack = () => router.back()
const forward = () => router.forward()

</script>


<template>
  <div class="routes-history">
    <BaseIcon
        type="arrow-back"
    />
    <BaseIcon
        type="arrow-forward"
    />
  </div>
</template>

<style lang="scss" scoped>
.routes-history {
  display: flex;


  .icon {
    margin-right: 16px;
  }
}
</style>