<script setup>
import {computed, nextTick, onMounted, ref} from "vue";
import {getSearchHistory, setSearchHistory} from "utils/stroageController.js";
import {useRouter} from "vue-router";
import {message} from "@/base/message.js";
import BaseIcon from "@/base/BaseIcon.vue";
import {getSearchHot, getSearchSuggestions} from "@/api/public/search.js";
import HighlightText from "@/base/HighlightText.vue";
import {debounce} from "utils/debounce.js";
import {useMusicStore} from "@/store/music/music.js";

const searPanelShow = ref(false);
const searchKeyword = ref('');
const searchHot = ref([]);
const searchHistory = ref(getSearchHistory() || []);
const searchSuggestion = ref([]);
const suggestionOrder = ref([])

const router = useRouter()
const musicStore = useMusicStore()

onMounted(
    async () => {
      const [err, res] = await getSearchHot();
      if (err) {
        message.error('获取热搜失败');
        return;
      }
      searchHot.value = res.result.hots;
    }
)

const suggestionPanelShow = computed(() => {
  return suggestionOrder && suggestionOrder.value.length > 0
})


const search = (keyword) => {
      if (keyword) {
        searchHistory.value.unshift(keyword);
        searchHistory.value = [...new Set(searchHistory.value)];
        setSearchHistory(searchHistory.value)
        searchKeyword.value = '';
        router.push({name: 'searchSong', params: {keyword}})
      } else {
        message.error('请输入搜索关键字')
      }
    },
    formatSuggestionTitle = (title) => {
      switch (title) {
        case 'artists':
          return '歌手';
        case 'albums':
          return '专辑';
        case 'songs':
          return '单曲';
        case 'playlists':
          return '歌单';
      }
    }


const handleInputFocus = () => {
      searPanelShow.value = true;
    },
    handleInputBlur = () => {
      setTimeout(() => {
        searPanelShow.value = false;
      }, 200)
    },
    handleEnter = () => {
      search(searchKeyword.value);
    },
    handleSuggestionsClick = (id, type) => {
      switch (type) {
        case 'songs':
          musicStore.startPlay(id)
          break;
        case 'albums':
          router.push(`/album/${id}`)
          break;
        case 'artists':
          router.push(`/artist/${id}`)
          break;
        case 'playlists':
          router.push(`/playlist/${id}`)
          break;
      }
    },
    handleSearchKeywordChange = keyword => {

      const getSuggestion = debounce(async () => {
        const [err, res] = await getSearchSuggestions(keyword);
        if (err) {
          message.error('获取搜索建议失败');
          return;
        }
        const suggestionList = res.result;
        searchSuggestion.value = suggestionList
        suggestionOrder.value = suggestionList.order
      }, 1000)


      if (keyword) {
        getSuggestion()
      }

    }


</script>


<template>
  <div class="search">
    <el-input
        @focus="handleInputFocus"
        @blur="handleInputBlur"
        @keyup.enter="handleEnter"
        @input="handleSearchKeywordChange"
        placeholder="搜索歌名，歌单，艺术家"
        v-model="searchKeyword"
    />

    <div class="search-panel" v-show="searPanelShow">
      <div
          class="search-suggestion"
          v-if="searchKeyword"
      >
        <!--// 搜索建议列表-->
        <!--// order: ["songs", "albums", "artists", "playlists"]，分别对应歌曲，专辑，歌手，歌单-->
        <!--// order若无值，则不显示-->
        <div
            class="suggest-item"
            v-for="order in suggestionOrder"
            :key="order"
            v-if="suggestionPanelShow"
        >
          <div>
            <div class="title">
              <!--            <BaseIcon/>-->
              {{ formatSuggestionTitle(order) }}
            </div>

            <!--// 使用order作为key，获取对应的搜索建议列表-->
            <ul class="list">
              <li
                  class="item"
                  v-for="item in searchSuggestion[order]"
                  :key="item.id"
                  @click="handleSuggestionsClick(item.id,order)"
              >
                <HighlightText
                    :text="item.name"
                    :highlight="searchKeyword"
                />
              </li>
            </ul>
          </div>
        </div>
        <div
            class="empty"
            v-else
        >暂无搜索建议
        </div>
      </div>

      <!--// 热搜以及搜索历史列表-->
      <div
          class="search-hots"
          v-else
      >
        <div class="block">
          <p class="title">热门搜索</p>
          <div class="tags">
            <span
                v-for="hot in searchHot"
                :key="hot.first"
                @click="search(hot.first)"
                class="button"

            >
              {{ hot.first }}
            </span>
          </div>
        </div>
        <div class="block">
          <p class="title">搜索历史</p>
          <div
              class="tags"
              v-if="searchHistory.length"
          >
            <span
                v-for="history in searchHistory"
                class="button"
            >
              {{ history }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.search {
  position: relative;
  width: 150px;
  opacity: 1 !important;

  .search-panel {
    position: fixed;
    top: $header-height;
    bottom: $mini-player-height;
    right: 0;
    width: 350px;
    background: var(--search-bgcolor);
    z-index: $search-panel-z-index;
    font-size: $font-size-sm;
    overflow-y: auto;
    @include box-shadow;

    .block {
      padding: 16px 24px;

      .title {
        color: var(--font-color-grey);
        margin-bottom: 16px;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;

        .button {

          display: inline-block;
          padding: 5px 16px;
          margin-bottom: 12px;
          margin-right: 6px;
          font-size: $font-size-sm;
          border: 1px solid var(--button-border-color);
          border-radius: 2px;
          text-align: center;
          cursor: pointer;

          &:hover {
            background: var(--button-hover-bgcolor);
          }

        }


      }

      .empty {
        @include flex-center();
        color: var(--font-color-grey);
        font-size: $font-size;
        height: 100px;
      }
    }

    .suggest-item {
      margin-bottom: 16px;


      .title {
        margin: 16px 8px 8px;
        color: var(--font-color-grey-shallow);
      }

      .list {
        .item {
          padding: 12px 24px;
          cursor: pointer;
          @include text-ellipsis();

          &:hover {
            background: var(--light-bgcolor);
          }
        }
      }
    }
  }
}
</style>
