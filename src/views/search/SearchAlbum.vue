
<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

const {params} = router.currentRoute.value

</script>

<template>
  {{params}}
</template>