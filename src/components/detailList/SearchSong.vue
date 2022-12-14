<script setup>
import {onBeforeUpdate, ref, watch} from "vue";
import {getSearch} from "@/api/public/search.js";

import {message} from "@/base/message.js";
import Pagination from '@/base/Pagination.vue'
import SearchTitle from "@/base/SearchTitle.vue";

import {useRouter} from "vue-router";
import {useMusicStore} from "@/store/music/music.js";
import {formatDuration, formatIndex, formatSongData} from "utils/publicTools";

const router = useRouter()
const musicStore = useMusicStore()

const tableData = ref([])
const total = ref(0)
const pageSize = ref(30)
const currentPage = ref(1)

const keyword = ref(router.currentRoute.value.params.keyword)
const getData = async (page) => {
  // 获取数据
  const [err, res] = await getSearch(keyword.value, pageSize.value, page || 1, 1)
  if (err) {
    // 获取数据失败，退出执行
    message.error('获取搜索结果失败',err);
    return;
  }
  if (typeof res.result === 'string'){
    message.error('获取搜索结果失败,请求频繁');
    return;
  }
  // 获取数据成功，更新数据

  const {songs, songCount} = res.result
  tableData.value = songs.map((item, index) => {
    // 格式化歌曲数据
    return formatSongData(item,index,pageSize.value,currentPage.value)
  })
  // 更新总条数
  total.value = songCount
}

getData()

//防止在此页面搜索时，搜索结果不更新
watch(() => router.currentRoute.value.params.keyword, (newVal) => {
  keyword.value = newVal
  getData()
})

const handlePageChange = (page) => {
      currentPage.value = page
      getData(page)
    },
    handleSongClick = (row) => {
      musicStore.startPlay(row)
    },
    handleAlbumClick = (row) => {
      router.push(`/album/${row.albumID}`)
    },
    handleArtistClick = (row) => {
      router.push(`/artist/${row.id}`)
    }

</script>


<template>
  <SearchTitle :keyword="router.currentRoute.value.params.keyword" :total="total"/>
  <el-table :data="tableData" :stripe="true">
    <el-table-column prop="count" width="50"/>
    <el-table-column prop="name" label="歌曲">
      <template #default="{row}">
        <el-link type="default" @click="handleSongClick(row)">
          <span :title="row.name">{{ row.name }}</span>
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="歌手" width="150" @click="handleArtistClick">
      <template #default="{row}">
        <el-link type="default">
          <span :title="row.artist">
            {{ row.artist }}</span>
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="专辑">
      <template #default="{row}">
        <el-link type="default" @click="handleAlbumClick">
          <span :title="row.album">{{ row.album }}</span>
        </el-link>
      </template>
    </el-table-column>
    <el-table-column prop="duration" label="时长"/>
  </el-table>
  <Pagination :total="total" :page-size="pageSize" @change="handlePageChange"/>
</template>

<style lang="scss">
.song-table {
  .title-th {
    color: var(--font-color-grey2);
    font-weight: normal;
  }

  .title-td {
    color: var(--font-color-white);
  }

  .padding-space {
    padding-left: 24px;
  }

  .song-active {
    color: $theme-color;

    .high-light-text {
      color: $theme-color;
    }
  }

  .index-wrap {
    text-align: center;
    color: var(--font-color-grey-shallow);
  }

  .img-wrap {
    position: relative;
    @include img-wrap(60px);

    img {
      border-radius: 4px;
    }

    .play-icon {
      @include abs-center;
    }
  }

  .high-light-text {
    color: $blue;
  }

  .song-table-name-cell {
    @include text-ellipsis;
    display: flex;
    align-items: center;
    flex: 0 0 24px;

    .song-table-name {
      overflow: hidden;
      @include text-ellipsis;
    }

    .mv-icon {
      width: 24px;
      margin-left: 4px;
    }
  }
}
</style>
