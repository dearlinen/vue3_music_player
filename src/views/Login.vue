<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
import BaseIcon from "@/base/BaseIcon.vue";

const router = useRouter()
const active = ref(null)

</script>

<template>
  <div class="login-select">
    <div
        class="card"
        @mouseover="active='account'"
        @mouseleave="active=null"
        @click="router.push({name:'account'})"
    >
      <div class="container" :class="{active:active==='account'}">
        <div class="title-info">
          <div class="title">登陆账号</div>
          <div class="info">可访问全部账号数据</div>
        </div>
        <BaseIcon class="arrow" type="arrow-forward" :size="24"/>
      </div>
    </div>
    <div
        class="card"
        @mouseover="active='uid'"
        @mouseleave="active=null"
        @click="router.push('uid')"
    >
      <div class="container" :class="{active:active==='uid'}">
        <div class="title-info">
          <div class="title">搜索UID登录</div>
          <div class="info">可访问账号公开数据库</div>
          <div class="info">替代账号登陆失败</div>
        </div>
        <BaseIcon class="arrow" type="arrow-forward" :size="24"/>

      </div>
    </div>

    <router-view/>
  </div>
</template>


<style lang="scss" scoped>

.login-select {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - #{$header-height} - #{$mini-player-height});

  .card {
    cursor: pointer;
    margin-top: 14px;
    margin-bottom: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--font-color-white);
    color: #212121;
    border-radius: 8px;
    height: 128px;
    width: 300px;
    transition: all 0.3s;
    padding-left: 22px;
    box-sizing: border-box;
  }

  .active {
    .title-info {
      transform: translateX(-8px);
    }

    .arrow {
      opacity: 1;
      visibility: visible;
      transform: translateX(8px);
    }
  }

  .container {
    display: flex;
    // justify-content: space-around;
    align-items: center;
    color: #335eea;
  }

  .title-info {
    transition: all 0.3s;
  }

  .title {
    font-size: 24px;
    font-weight: 600;
  }

  .info {
    margin-top: 2px;
    font-size: 14px;
    color: rgba(51, 94, 234, 0.78);
  }

  .arrow {
    opacity: 0;
    height: 24px;
    width: 24px;
    margin-left: 16px;
    transition: all 0.3s;
  }
}

</style>