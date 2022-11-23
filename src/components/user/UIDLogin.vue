<script setup>
import {computed, ref} from 'vue'
import BaseIcon from '@/base/BaseIcon.vue'
import {getUserDetail} from "@/api/user/info.js";
import {message} from "@/base/message.js";
import {getSearch} from "@/api/public/search.js";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user/userStore.js";


const router = useRouter()
const userStore = useUserStore()

const nickname = ref('')
const searchList = ref([])

const handleSearch = async () => {
  // const [err, res] = await getUserDetail(nickname.value)
  const [err, res] = await getSearch(nickname.value, 30, 1, 1002)
  if (err) {
    message.error('获取用户名列表失败')
  }
  if (res.code === 200) {
    const {result: {userprofiles}} = res
    searchList.value = userprofiles
  } else {
    message.error('用户列表返回错误')
  }

}

const handleUserClick = user => {
  userStore.setUIDLogin(user.userId)
  router.push({name:'user',params:{username:user.nickname}})
}

const isListShow = computed(
    () => {
      return searchList.value.length >= 1
    }
)
</script>

<template>
  <div class="login">
    <div>
      <div class="title">
        搜索用户名登录
      </div>
      <div class="section">
        <div class="search-box">
          <div class="container">
            <el-input
                v-model="nickname"
                placeholder="请输入网易云音乐昵称"
                prefix-icon="search"
                @keyup.enter="handleSearch"
            >
              <template #prepend>
                <BaseIcon type="arrow-forward"/>
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="user-list" v-if="isListShow">
        <div
            class="user"
            v-for="user in searchList"
            :key="user.id"
            @click="handleUserClick(user)"
        >
          <el-avatar class="head" :src="user.avatarUrl"/>
          <div class="nickname">
            {{ user.nickname }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  color: var(--color-text);
}

.title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 48px;
}

.section {
  margin-top: 18px;

  .name {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    opacity: 0.78;
  }
}

.search-box {
  .container {
    display: flex;
    align-items: center;
    height: 48px;
    border-radius: 11px;
    width: 326px;
    background: var(--color-primary-bg);
  }


}

.user-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  margin-bottom: 24px;
}

.user {
  margin-right: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  padding: 12px 12px 12px 16px;
  border-radius: 8px;
  width: 256px;
  transition: 0.2s;
  user-select: none;
  cursor: pointer;


  .head {
    border-radius: 50%;
    height: 44px;
    width: 44px;
  }

  .nickname {
    font-size: 18px;
    margin-left: 12px;
  }

  &:hover {
    background: var(--color-secondary-bg);
  }
}

</style>