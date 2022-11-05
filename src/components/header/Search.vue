<script setup>
import {computed, onMounted, ref} from "vue";
import {getSearchHistory, setSearchHistory} from "utils/stroageController.js";
import {useRouter} from "vue-router";
import {message} from "@/base/message.js";
import BaseIcon from "@/base/BaseIcon.vue";
import {getSearchHot, getSearchSuggestions} from "@/api/public/search.js";
import HighlightText from "@/base/HighlightText.vue";
import {debounce} from "utils/debounce.js";

const searPanelShow = ref(false);
const searchKeyword = ref('');
const searchHot = ref([]);
const searchHistory = ref(getSearchHistory() || []);
const searchSuggestion = ref([]);
const suggestionOrder = ref([])

const router = useRouter()


const fetchHot = async () => {
  const [err, res] = await getSearchHot();
  if (err) {
    message.error('获取热搜失败');
    return;
  }
  searchHot.value = res.hots;
}

onMounted(
    () => {
      if (searchHot.value.length === 0) {
        fetchHot();
      }
    }
)

const search = (keyword) => {
  if (keyword) {
    searchHistory.value.unshift(keyword);
    searchHistory.value = [...new Set(searchHistory.value)];
    setSearchHistory(searchHistory.value)
    searchKeyword.value = '';
    router.push('/search/' + keyword)
  } else {
    message.error('请输入搜索关键字')
  }
}


const handleInputFocus = () => {
      searPanelShow.value = true;
    },
    handleInputBlur = () => {
      searPanelShow.value = false;
    },
    handleEnter = () => {
      search();
    },
    handleSuggestionsClick = (id,type) => {
      console.log([id, type])
      switch (type) {
        case 'songs':
          router.push(`/song/${id}`)
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
    handleSearchKeywordChange = e => {
      const getSuggestion = debounce(async () => {
        const [err, res] = await getSearchSuggestions(e);
        if (err) {
          message.error('获取搜索建议失败');
          return;
        }
        const suggestionList = res;
        searchSuggestion.value =suggestionList
        suggestionOrder.value = suggestionList.order
      }, 500)

      getSuggestion()


    }

</script>


<template>
  <div class="search">
    <el-input
        @focus="handleInputFocus"
        @keyup.enter="handleEnter"
        @input="handleSearchKeywordChange"
        placeholder="搜索歌名，歌单，艺术家"
        prefix-icon="el-icon-search"
        v-model="searchKeyword"
    />

    <div class="search-panel" v-show="searPanelShow">
      <div
          class="search-suggestion"
          v-if="searchKeyword"
      >
        <div
            class="suggest-item"
            v-for="order in suggestionOrder"
            :key="order"
            v-if="suggestionOrder.length"
        >
          <div>
            <div class="title">
              <!--            <BaseIcon/>-->
              {{ order }}
            </div>
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
        >暂无搜索历史
        </div>
      </div>

      <div
          class="search-hots"
          v-else
      >
        <div class="block">
          <p class="title">热门搜搜</p>
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
          <div class="tags"
               v-if="searchHistory.length"
          >
            <span
                v-for="history in searchHistory.value"
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
          margin-bottom: 12px;
          margin-right: 6px;
          font-size: $font-size-sm;
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
            background: red;
          }
        }
      }
    }
  }
}
</style>
