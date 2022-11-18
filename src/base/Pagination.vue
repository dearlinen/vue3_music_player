<script setup>

const {total, pageSize} = defineProps({
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required:true
  },
})

const emit = defineEmits(['change'])

const handlePageChange = (page) => {
  emit('change', page)
}
</script>


<template>
  <div class="example-pagination-block">
    <el-pagination
        :total="total"
        :page-size="pageSize"
        @current-change="handlePageChange"
        @prev-click="handlePageChange"
        @next-click="handlePageChange"
        layout="->,prev, pager, next"
        hide-on-single-page
    />
  </div>
</template>