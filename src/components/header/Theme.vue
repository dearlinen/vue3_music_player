<script setup>
import {ref} from "vue";

import lightTheme from "@/style/theme/lightTheme.js";
import darkTheme from "@/style/theme/darkTheme.js";
import redTheme from "@/style/theme/redTheme.js";
import {getTheme, setTheme} from "utils/stroageController.js";

const showPop = ref(false);
const theme = ref(getTheme());

const themes = {
  light: lightTheme,
  dark: darkTheme,
  red: redTheme
}

const handleThemeClick = () => {
      showPop.value = true;
    },
    handleThemeChange = (key) => {

      const theme = themes[key];
      setTheme(key)
      Object.keys(theme).forEach(key => {
        const value = theme[key]
        document.documentElement.style.setProperty(key, value)
      })
    }

handleThemeChange(getTheme())
</script>


<template>

  <el-popover
      placement="bottom"

      :width="200"
      trigger="click"
  >

    <div class="themes">
      <div
          v-for="(name,key) in themes"
          :key="name"
          @click="handleThemeChange(key)"
          class="theme-item"
      >
        <!--        <div-->
        <!--            :style="themeValue.style"-->
        <!--            class="theme-icon"-->
        <!--        ></div>-->
        <p>{{ key }}</p>
      </div>
    </div>
    <template #reference>
      <el-button>change theme</el-button>
    </template>
  </el-popover>
</template>


<style lang="scss" scoped>
.themes {
  @include flex-center();

  .theme-item {
    @include flex-center();
    flex-direction: column;
    margin: 0 8px;
    cursor: pointer;

    .theme-icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
  }
}
</style>
