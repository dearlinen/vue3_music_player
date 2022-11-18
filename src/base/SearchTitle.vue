<script setup>
const {keyword, total} = defineProps({
  keyword: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})


</script>


<template>

  <div class="search-header">
    <span class="keyword">{{ keyword }}</span>
    <span class="found">共有{{ total }}个结果</span>
  </div>
</template>

<style lang="scss" scoped>
.search-header {
  padding: 20px 32px;

  .keyword {
    display: inline-block;
    margin-right: 4px;
    font-size: $font-size-title-lg;
    font-weight: $font-weight-bold;
  }

  .found {
    font-size: $font-size-sm;
    color: var(--font-color-grey-shallow);
    letter-spacing: 2px;
  }
}
</style>
