<script setup>

import {toRem} from "utils/styleTools.js";
import {ref} from "vue";

const {backdrop, type, color, size} = defineProps(
    {
      size: {
        type: Number,
        default: 16
      },
      type: {
        type: String,
        required: true,
      },
      backdrop: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: ''
      },
    }
)

const classes = ref({})
const styles = ref({})

const emit = defineEmits(['btnClick'])


const getIconClass = () => {
  if (backdrop) {
    return 'backdrop'
  }
  let cls = `icon-${type}`
  cls += ' iconfont icon-component '
  if (color) {
    cls += `icon-color-${color}`
  }
  return cls
}


const getIconStyle = () => {

  if (backdrop) {
    const backDropSize = toRem(size * 1.56)
    return {
      width: toRem(backDropSize),
      height: toRem(backDropSize),
    }
  }

  const chromeMinSize = 12;
  // 支持小于12px
  const retStyle = {fontSize: toRem(size)};
  if (size < chromeMinSize) {
    const ratio = size / chromeMinSize;
    retStyle.transform = `scale(${ratio})`;
  }
  return retStyle;
}

classes.value = getIconClass()
styles.value = getIconStyle()

</script>

<template>
  <div
      :class='classes'
      :style='styles'
      @click="emit('btnClick')"
  />
</template>


<style lang="scss" scoped>
.backdrop {
  display: inline-block;
  @include flex-center;
  border-radius: 50%;

  &:hover {
    background: var(--round-hover-bgcolor);
  }
}

.icon-component {
  cursor: pointer;
}

.icon-color {
  // 通过prop传入这几个字段
  // 可以使用默认的几个颜色
  &-theme {
    color: $theme-color;
  }

  &-white {
    color: $white;
  }

  &-shallow {
    color: var(--font-color-shallow-grey);
  }
}
</style>
